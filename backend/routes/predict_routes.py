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

# Add Entity Ruler to detect specific clinical terms
if not nlp.has_pipe("entity_ruler"):
    ruler = nlp.add_pipe("entity_ruler", before="ner")
    patterns = [
        {"label": "SYMPTOM", "pattern": [{"LOWER": "chest"}, {"LOWER": "pain"}]},
        {"label": "TEST", "pattern": [{"LOWER": "hba1c"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "diabetes"}]},
        {"label": "TEST", "pattern": [{"LOWER": "blood"}, {"LOWER": "pressure"}]},
    ]
    ruler.add_patterns(patterns)

@predict_bp.route("/predict", methods=["POST"])
@jwt_required()
def predict():
    user_id = get_jwt_identity()
    text = request.json.get("text")

    cleaned = preprocess_text(text)
    vector = vectorizer.transform([cleaned])

    # Get top 3 predictions
    probs = model.predict_proba(vector)[0]
    top_3_indices = np.argsort(probs)[-3:][::-1]
    
    top_3 = []
    for idx in top_3_indices:
        top_3.append({
            "prediction": model.classes_[idx],
            "confidence": float(probs[idx]) * 100
        })

    prediction = top_3[0]["prediction"]
    confidence = top_3[0]["confidence"]

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
        "top_3": [{"prediction": p["prediction"], "confidence": round(p["confidence"], 2)} for p in top_3],
        "entities": entities,
        "suggestions": suggestions
    })