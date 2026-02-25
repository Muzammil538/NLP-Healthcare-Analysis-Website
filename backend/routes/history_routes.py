from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Query

history_bp = Blueprint("history", __name__)

@history_bp.route("/history", methods=["GET"])
@jwt_required()
def get_history():
    user_id = int(get_jwt_identity())

    queries = Query.query.filter_by(user_id=user_id).order_by(Query.created_at.desc()).all()

    return jsonify([
        {
            "id": q.id,
            "input_text": q.input_text,
            "prediction": q.prediction,
            "confidence": q.confidence,
            "created_at": q.created_at
        }
        for q in queries
    ])