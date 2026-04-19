"""
Vehicles API Blueprint for OptiChain.
Full CRUD operations for fleet management backed by SQLAlchemy/SQL.
"""
from flask import Blueprint, request, jsonify
from models.database import db, Vehicle
import logging
import random

logger = logging.getLogger(__name__)
vehicles_bp = Blueprint('vehicles_bp', __name__)


@vehicles_bp.route('/api/vehicles', methods=['GET'])
def get_vehicles():
    """List all vehicles with optional status filter."""
    status_filter = request.args.get('status')
    query = Vehicle.query.order_by(Vehicle.created_at.desc())
    if status_filter:
        query = query.filter_by(status=status_filter)
    vehicles = query.all()
    return jsonify([v.to_dict() for v in vehicles]), 200


@vehicles_bp.route('/api/vehicles', methods=['POST'])
def create_vehicle():
    """Create a new vehicle."""
    data = request.get_json(silent=True)
    if not data or not data.get('model') or not data.get('driver'):
        return jsonify({"error": "model and driver are required"}), 400

    vehicle_id = f"VH-{random.randint(100, 999)}"
    vehicle = Vehicle(
        vehicle_id=vehicle_id,
        model=data['model'],
        driver=data['driver'],
        status=data.get('status', 'Idle'),
        current_shipment=data.get('current_shipment'),
        health=data.get('health', 100),
        mileage=data.get('mileage', '0 km'),
        fuel_level=data.get('fuel_level', 100),
        location=data.get('location', 'Main Depot'),
        last_maintenance=data.get('last_maintenance', 'Today'),
        next_maintenance=data.get('next_maintenance', '30 days'),
    )
    db.session.add(vehicle)
    db.session.commit()
    logger.info(f"Vehicle {vehicle_id} created successfully.")
    return jsonify(vehicle.to_dict()), 201


@vehicles_bp.route('/api/vehicles/<int:vehicle_id>', methods=['DELETE'])
def delete_vehicle(vehicle_id):
    """Delete a vehicle by ID."""
    vehicle = Vehicle.query.get(vehicle_id)
    if not vehicle:
        return jsonify({"error": "Vehicle not found"}), 404
    db.session.delete(vehicle)
    db.session.commit()
    logger.info(f"Vehicle {vehicle.vehicle_id} deleted.")
    return jsonify({"message": "Vehicle deleted"}), 200


@vehicles_bp.route('/api/vehicles/stats', methods=['GET'])
def get_fleet_stats():
    """Return fleet statistics."""
    total = Vehicle.query.count()
    active = Vehicle.query.filter_by(status='Active').count()
    idle = Vehicle.query.filter_by(status='Idle').count()
    maintenance = Vehicle.query.filter_by(status='Maintenance').count()
    return jsonify({
        "total": total,
        "active": active,
        "idle": idle,
        "maintenance": maintenance,
    }), 200
