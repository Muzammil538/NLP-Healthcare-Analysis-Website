from flask import Flask, request, jsonify
import joblib
import spacy
from nlp_utils import preprocess_text

app = Flask(__name__)

# Load model & vectorizer
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

nlp = spacy.load("en_core_web_sm")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data["text"]

    # Preprocess
    cleaned = preprocess_text(text)

    # Vectorize
    vector = vectorizer.transform([cleaned])

    # Predict
    prediction = model.predict(vector)[0]
    confidence = max(model.predict_proba(vector)[0])

    # NER
    doc = nlp(text)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]

    return jsonify({
        "prediction": prediction,
        "confidence": float(confidence),
        "entities": entities
    })

if __name__ == "__main__":
    app.run(debug=True)