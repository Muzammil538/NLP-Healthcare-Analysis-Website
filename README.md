# 🏥 Healthcare NLP Analyzer

AI-Powered Medical Text Classification & Entity Extraction System

---

## 📌 Project Overview

Healthcare institutions generate vast amounts of unstructured textual data such as:

* Clinical notes
* Discharge summaries
* Medical transcriptions
* Diagnostic reports
* Patient feedback

Manual analysis of such data is:

* Time-consuming
* Error-prone
* Difficult to scale
* Inefficient for real-time decision making

This project builds a **web-based NLP system** that automatically:

1. Classifies medical text into appropriate medical specialties
2. Extracts important entities from medical text
3. Displays prediction confidence
4. Provides top 3 likely categories

The system combines **Natural Language Processing (NLP)** and **Machine Learning (ML)** to assist healthcare professionals in analyzing textual data efficiently.

---

# 🎯 Objectives

* To process unstructured medical text data.
* To classify medical reports into medical specialties.
* To extract meaningful entities from medical text.
* To measure prediction confidence using probabilistic ML models.
* To build an interactive web interface for real-time predictions.
* To demonstrate practical application of NLP in healthcare.

---

# 🏗️ System Architecture

```
User (Browser)
        ↓
React Frontend (UI)
        ↓
Flask Backend API
        ↓
Text Preprocessing
        ↓
TF-IDF Vectorization
        ↓
Machine Learning Model
        ↓
Prediction + Confidence
        ↓
Entity Extraction (spaCy)
        ↓
JSON Response → UI Display
```

---

# 🛠️ Technology Stack

## 🔹 Frontend

* React.js
* Tailwind CSS
* Axios
* Modern UI Components

## 🔹 Backend

* Flask
* Flask-CORS
* Scikit-learn
* spaCy
* NLTK
* Joblib
* Pandas
* NumPy

## 🔹 Model

* TF-IDF Vectorizer
* Logistic Regression Classifier

---

# 📂 Dataset Used

Medical Transcriptions Dataset (MTSamples)

Key columns:

* `transcription` → Input text
* `medical_specialty` → Target label

To improve class balance and accuracy:

* Top 10 most frequent specialties were selected.

---

# ⚙️ How the Model Works

## Step 1: Text Preprocessing

* Convert to lowercase
* Remove punctuation
* Remove stopwords
* Apply lemmatization

This ensures clean and normalized text input.

---

## Step 2: Feature Extraction (TF-IDF)

TF-IDF converts text into numerical vectors based on:

* Term frequency
* Inverse document frequency

This helps the model understand important words relative to the dataset.

---

## Step 3: Classification

Logistic Regression is used because:

* Works well for text classification
* Provides probability estimates
* Efficient and interpretable

---

## Step 4: Confidence Calculation

The model uses:

```
predict_proba()
```

Confidence is calculated as:

```
max(probabilities) × 100
```

Example:

If probability = 0.3074
Confidence = 30.74%

Top 3 predictions are also displayed for better interpretability.

---

# 📊 Outcomes Achieved

✅ Successfully classified medical text into specialties
✅ Achieved working prediction confidence system
✅ Extracted named entities using spaCy
✅ Displayed top 3 predictions
✅ Built fully functional web interface
✅ Integrated backend and frontend
✅ Created production-ready environment

---

# 🧠 Example Output

Input:

```
Patient presents with chest pain and elevated troponin levels.
```

Output:

```
Prediction: Cardiovascular / Pulmonary
Confidence: 30.74%

Top Predictions:
1. Cardiovascular / Pulmonary – 30.74%
2. Neurology – 22.31%
3. Endocrinology – 18.12%

Entities:
ECG – ORG
Troponin – ORG
```

---

# 📈 How Confidence Depends on the Model

Confidence depends on:

### 1️⃣ Quality of Dataset

* More balanced dataset → better separation
* More samples per class → higher certainty

### 2️⃣ Feature Representation

* Better vectorization improves class separation
* N-grams improve contextual understanding

### 3️⃣ Model Type

* Logistic Regression gives probabilistic output
* SVM may give higher accuracy but no probabilities
* Deep learning models (BERT) provide stronger contextual understanding

### 4️⃣ Overlapping Vocabulary

Medical specialties often share similar terminology, which reduces separability between classes and lowers confidence.

---

# 🚀 How Confidence Can Be Improved

## ✅ 1. Increase TF-IDF Features

```python
TfidfVectorizer(max_features=15000, ngram_range=(1,2))
```

Captures:

* "chest pain"
* "blood pressure"
* "shortness of breath"

---

## ✅ 2. Tune Logistic Regression

```python
LogisticRegression(max_iter=3000, C=2)
```

Improves decision boundaries.

---

## ✅ 3. Balance Dataset

* Remove underrepresented classes
* Use class weighting
* Apply oversampling techniques

---

## ✅ 4. Use Advanced Models

* Linear SVM
* Random Forest
* Gradient Boosting
* BERT (Deep Learning)

Deep learning models improve contextual understanding and confidence.

---

## ✅ 5. Increase Training Data

More diverse medical samples improve model generalization.

---

# 🔬 Limitations

* TF-IDF does not understand semantic context.
* Overlapping medical terminology reduces confidence.
* spaCy general model is not domain-specific.
* No real-time hospital database integration.

---

# 🔮 Future Enhancements

* Integrate SciSpacy for better medical entity recognition
* Use BERT-based medical transformer models
* Add user authentication
* Add CSV bulk upload feature
* Add performance dashboard
* Deploy to cloud (Render / AWS / Azure)
* Implement explainable AI (feature importance visualization)

---

# 🧪 How to Run the Project

## Backend

```
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm-3.8.0
python app.py
```

## Frontend

```
cd frontend
npm install
npm run dev
```

---

# 🎓 Academic Relevance

This project demonstrates:

* Natural Language Processing in healthcare
* Text preprocessing techniques
* Feature engineering using TF-IDF
* Supervised machine learning
* Confidence estimation
* Web integration of ML models
* Real-world dataset handling

---

# 🏆 Conclusion

The Healthcare NLP Analyzer successfully demonstrates how NLP and Machine Learning can be applied to healthcare text data for automated classification and entity extraction.

The system provides:

* Accurate specialty prediction
* Confidence scoring
* Real-time analysis
* Interactive web interface

It bridges the gap between academic NLP concepts and real-world healthcare applications.
