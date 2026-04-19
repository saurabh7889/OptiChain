"""
Orders API Blueprint for OptiChain.
Full CRUD operations for order management backed by SQLAlchemy/SQL.
"""
from flask import Blueprint, request, jsonify
from models.database import db, Order
import logging
import random

logger = logging.getLogger(__name__)
orders_bp = Blueprint('orders_bp', __name__)


@orders_bp.route('/api/orders', methods=['GET'])
def get_orders():
    """List all orders with optional status filter."""
    status_filter = request.args.get('status')
    query = Order.query.order_by(Order.created_at.desc())
    if status_filter:
        query = query.filter_by(status=status_filter)
    orders = query.all()
    return jsonify([o.to_dict() for o in orders]), 200


@orders_bp.route('/api/orders', methods=['POST'])
def create_order():
    """Create a new order."""
    data = request.get_json(silent=True)
    if not data or not data.get('customer'):
        return jsonify({"error": "customer is required"}), 400

    order_id = f"ORD-{random.randint(1000, 9999)}"
    order = Order(
        order_id=order_id,
        customer=data['customer'],
        items=data.get('items', 1),
        value=data.get('value', '$0'),
        status=data.get('status', 'Pending'),
        date=data.get('date'),
        shipment_id=data.get('shipment_id'),
        inventory_impact=data.get('inventory_impact', 'Low'),
        priority=data.get('priority', 'medium'),
    )
    db.session.add(order)
    db.session.commit()
    logger.info(f"Order {order_id} created successfully.")
    return jsonify(order.to_dict()), 201


@orders_bp.route('/api/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    """Delete an order by ID."""
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    db.session.delete(order)
    db.session.commit()
    logger.info(f"Order {order.order_id} deleted.")
    return jsonify({"message": "Order deleted"}), 200


@orders_bp.route('/api/orders/stats', methods=['GET'])
def get_order_stats():
    """Return order statistics."""
    total = Order.query.count()
    pending = Order.query.filter_by(status='Pending').count()
    processing = Order.query.filter_by(status='Processing').count()
    shipped = Order.query.filter_by(status='Shipped').count()
    delivered = Order.query.filter_by(status='Delivered').count()
    return jsonify({
        "total": total,
        "pending": pending,
        "processing": processing,
        "shipped": shipped,
        "delivered": delivered,
    }), 200
