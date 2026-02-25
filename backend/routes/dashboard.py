from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Query
from extensions import db
from sqlalchemy import func

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    user_id = get_jwt_identity()

    total_queries = Query.query.filter_by(user_id=user_id).count()

    avg_confidence = db.session.query(
        func.avg(Query.confidence)
    ).filter_by(user_id=user_id).scalar()

    category_counts = db.session.query(
        Query.prediction,
        func.count(Query.id)
    ).filter_by(user_id=user_id).group_by(Query.prediction).all()

    return jsonify({
        "total_queries": total_queries,
        "avg_confidence": avg_confidence or 0,
        "category_distribution": [
            {"prediction": c[0], "count": c[1]}
            for c in category_counts
        ]
    })