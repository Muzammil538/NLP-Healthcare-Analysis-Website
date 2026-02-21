from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import spacy
import numpy as np
from nlp_utils import preprocess_text

app = Flask(__name__)
CORS(app)

# Load trained model & vectorizer
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

@app.route("/")
def home():
    return jsonify({"message": "Healthcare NLP API is running"})


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        text = data.get("text", "")

        if not text.strip():
            return jsonify({"error": "Input text is empty"}), 400

        # Preprocess
        cleaned = preprocess_text(text)

        # Vectorize
        vector = vectorizer.transform([cleaned])

        # Prediction
        prediction = model.predict(vector)[0]

        # Top 3 probabilities
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(vector)[0]
            classes = model.classes_

            top_indices = np.argsort(probs)[::-1][:3]

            top_predictions = [
                {
                    "label": classes[i],
                    "confidence": round(float(probs[i]) * 100, 2)
                }
                for i in top_indices
            ]

            main_confidence = round(float(max(probs)) * 100, 2)
        else:
            top_predictions = [
                {"label": prediction, "confidence": 0}
            ]
            main_confidence = 0

        # Named Entity Recognition
        doc = nlp(text)
        entities = [
            {
                "text": ent.text,
                "label": ent.label_
            }
            for ent in doc.ents
        ]

        return jsonify({
            "prediction": prediction,
            "confidence": main_confidence,
            "top_predictions": top_predictions,
            "entities": entities
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)