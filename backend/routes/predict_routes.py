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

# Add Entity Ruler to detect specific clinical terms (case-insensitive)
if not nlp.has_pipe("entity_ruler"):
    ruler = nlp.add_pipe("entity_ruler", before="ner")
    patterns = [
        # Symptoms
        {"label": "SYMPTOM", "pattern": [{"LOWER": "chest"}, {"LOWER": "pain"}]},
        {"label": "SYMPTOM", "pattern": [{"LOWER": "shortness"}, {"LOWER": "of"}, {"LOWER": "breath"}]},
        {"label": "SYMPTOM", "pattern": [{"LOWER": "dyspnea"}]},
        {"label": "SYMPTOM", "pattern": [{"LOWER": "fever"}]},
        {"label": "SYMPTOM", "pattern": [{"LOWER": "cough"}]},
        {"label": "SYMPTOM", "pattern": [{"LOWER": "headache"}]},
        {"label": "SYMPTOM", "pattern": [{"LOWER": "dizziness"}]},
        {"label": "SYMPTOM", "pattern": [{"LOWER": "nausea"}]},
        {"label": "SYMPTOM", "pattern": [{"LOWER": "fatigue"}]},
        {"label": "SYMPTOM", "pattern": [{"LOWER": "palpitations"}]},
        {"label": "SYMPTOM", "pattern": [{"LOWER": "tremor"}]},
        
        # Tests & Measurements
        {"label": "TEST", "pattern": [{"LOWER": "hba1c"}]},
        {"label": "TEST", "pattern": [{"LOWER": "blood"}, {"LOWER": "pressure"}]},
        {"label": "TEST", "pattern": [{"LOWER": "ecg"}]},
        {"label": "TEST", "pattern": [{"LOWER": "ekg"}]},
        {"label": "TEST", "pattern": [{"LOWER": "mri"}]},
        {"label": "TEST", "pattern": [{"LOWER": "ct"}, {"LOWER": "scan"}]},
        {"label": "TEST", "pattern": [{"LOWER": "ultrasound"}]},
        {"label": "TEST", "pattern": [{"LOWER": "xray"}]},
        {"label": "TEST", "pattern": [{"LOWER": "x"}, {"LOWER": "ray"}]},
        {"label": "TEST", "pattern": [{"LOWER": "glucose"}]},
        {"label": "TEST", "pattern": [{"LOWER": "troponin"}]},
        {"label": "TEST", "pattern": [{"LOWER": "eeg"}]},
        {"label": "TEST", "pattern": [{"LOWER": "thyroid"}, {"LOWER": "function"}]},
        
        # Conditions
        {"label": "CONDITION", "pattern": [{"LOWER": "diabetes"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "stroke"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "seizure"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "hypertension"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "heart"}, {"LOWER": "attack"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "myocardial"}, {"LOWER": "infarction"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "pneumonia"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "asthma"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "copd"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "depression"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "anxiety"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "arthritis"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "cancer"}]},
        {"label": "CONDITION", "pattern": [{"LOWER": "arrhythmia"}]},
        
        # Medications
        {"label": "MEDICATION", "pattern": [{"LOWER": "aspirin"}]},
        {"label": "MEDICATION", "pattern": [{"LOWER": "metformin"}]},
        {"label": "MEDICATION", "pattern": [{"LOWER": "insulin"}]},
        {"label": "MEDICATION", "pattern": [{"LOWER": "lisinopril"}]},
        {"label": "MEDICATION", "pattern": [{"LOWER": "atorvastatin"}]},
        {"label": "MEDICATION", "pattern": [{"LOWER": "warfarin"}]},
        {"label": "MEDICATION", "pattern": [{"LOWER": "amoxicillin"}]},
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