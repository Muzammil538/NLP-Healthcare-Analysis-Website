def generate_suggestions(prediction, text, entities):

    text_lower = text.lower()

    precautions = []
    treatments = []
    risk_level = "Moderate"

    # ---------------------------
    # Cardiovascular Logic
    # ---------------------------
    if "cardio" in prediction.lower() or "pulmonary" in prediction.lower():

        if "chest pain" in text_lower:
            precautions.append("Avoid physical exertion until evaluated.")
            treatments.append("Immediate ECG and cardiac enzyme testing recommended.")
            risk_level = "High"

        if "troponin" in text_lower:
            treatments.append("Monitor cardiac biomarkers closely.")
            risk_level = "High"

        if "blood pressure" in text_lower:
            precautions.append("Monitor blood pressure regularly.")
            treatments.append("Consider antihypertensive therapy.")

        if not precautions:
            precautions.append("Maintain low-sodium diet.")
            treatments.append("Schedule cardiology consultation.")

    # ---------------------------
    # Neurology Logic
    # ---------------------------
    elif "neuro" in prediction.lower():

        if "stroke" in text_lower:
            risk_level = "High"
            treatments.append("Urgent CT or MRI scan required.")
            precautions.append("Monitor neurological status continuously.")

        if "seizure" in text_lower:
            treatments.append("EEG recommended.")
            precautions.append("Avoid triggers like stress and sleep deprivation.")

        if not treatments:
            treatments.append("Consult neurologist for detailed assessment.")

    # ---------------------------
    # Endocrinology Logic
    # ---------------------------
    elif "endocrinology" in prediction.lower():

        if "glucose" in text_lower or "diabetes" in text_lower:
            precautions.append("Monitor blood sugar levels daily.")
            treatments.append("Consider insulin or oral hypoglycemic agents.")

        if "thyroid" in text_lower:
            treatments.append("Thyroid function test recommended.")

        if not precautions:
            precautions.append("Maintain balanced diet and exercise regularly.")

    # ---------------------------
    # Generic Fallback
    # ---------------------------
    else:
        precautions.append("Consult relevant specialist.")
        treatments.append("Further diagnostic evaluation required.")

    return {
        "risk_level": risk_level,
        "precautions": list(set(precautions)),
        "treatment_recommendations": list(set(treatments))
    }