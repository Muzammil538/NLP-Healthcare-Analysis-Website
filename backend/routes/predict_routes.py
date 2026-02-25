from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Query
from nlp_utils import preprocess_text
from suggestions import generate_suggestions
import joblib
import numpy as np
import spacy

predict_bp = Blueprint("predict", __name__)

model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
nlp = spacy.load("en_core_web_sm")

@predict_bp.route("/predict", methods=["POST"])
@jwt_required()
def predict():
    user_id = get_jwt_identity()
    text = request.json.get("text")

    cleaned = preprocess_text(text)
    vector = vectorizer.transform([cleaned])

    prediction = model.predict(vector)[0]
    probs = model.predict_proba(vector)[0]

    confidence = float(max(probs) * 100)

    # Save to DB
    query = Query(
        user_id=user_id,
        input_text=text,
        prediction=prediction,
        confidence=confidence
    )
    db.session.add(query)
    db.session.commit()

    # Entities
    doc = nlp(text)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]

    # Suggestions
    

    suggestions = generate_suggestions(
        prediction=prediction,
        text=text,
        entities=entities
    )

    return jsonify({
        "prediction": prediction,
        "confidence": round(confidence, 2),
        "entities": entities,
        "suggestions": suggestions
    })