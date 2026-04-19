"""
Notifications API Blueprint for OptiChain.
CRUD operations for notification management backed by SQLAlchemy/SQL.
"""
from flask import Blueprint, request, jsonify
from models.database import db, Notification
import logging

logger = logging.getLogger(__name__)
notifications_bp = Blueprint('notifications_bp', __name__)


@notifications_bp.route('/api/notifications', methods=['GET'])
def get_notifications():
    """List all notifications."""
    notifications = Notification.query.order_by(Notification.created_at.desc()).all()
    return jsonify([n.to_dict() for n in notifications]), 200


@notifications_bp.route('/api/notifications', methods=['POST'])
def create_notification():
    """Create a new notification."""
    data = request.get_json(silent=True)
    if not data or not data.get('title'):
        return jsonify({"error": "title is required"}), 400

    notification = Notification(
        title=data['title'],
        message=data.get('message', ''),
        type=data.get('type', 'info'),
        icon_type=data.get('icon_type', 'info'),
        read=False,
        time=data.get('time', 'Just now'),
    )
    db.session.add(notification)
    db.session.commit()
    logger.info(f"Notification '{data['title']}' created.")
    return jsonify(notification.to_dict()), 201


@notifications_bp.route('/api/notifications/<int:notification_id>', methods=['DELETE'])
def delete_notification(notification_id):
    """Delete a notification."""
    notification = Notification.query.get(notification_id)
    if not notification:
        return jsonify({"error": "Notification not found"}), 404
    db.session.delete(notification)
    db.session.commit()
    return jsonify({"message": "Notification deleted"}), 200


@notifications_bp.route('/api/notifications/<int:notification_id>/read', methods=['PUT'])
def mark_as_read(notification_id):
    """Mark a notification as read."""
    notification = Notification.query.get(notification_id)
    if not notification:
        return jsonify({"error": "Notification not found"}), 404
    notification.read = True
    db.session.commit()
    return jsonify(notification.to_dict()), 200


@notifications_bp.route('/api/notifications/clear', methods=['DELETE'])
def clear_all_notifications():
    """Clear all notifications."""
    count = Notification.query.delete()
    db.session.commit()
    logger.info(f"Cleared {count} notifications.")
    return jsonify({"message": f"Cleared {count} notifications"}), 200
