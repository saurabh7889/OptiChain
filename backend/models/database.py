"""
Database models for OptiChain using SQLAlchemy.
Comprehensive models for vehicles, orders, shipments, notifications, and route edges.
"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class RouteEdge(db.Model):
    """Model representing an edge in the logistics network graph."""
    __tablename__ = 'route_edges'
    
    id = db.Column(db.Integer, primary_key=True)
    start_node = db.Column(db.String(100), nullable=False)
    end_node = db.Column(db.String(100), nullable=False)
    weight = db.Column(db.Float, nullable=False)

    def to_tuple(self):
        """Convert edge row to a format expected by NetworkX."""
        return (self.start_node, self.end_node, self.weight)

    def to_dict(self):
        return {"id": self.id, "start_node": self.start_node, "end_node": self.end_node, "weight": self.weight}


class Vehicle(db.Model):
    """Model for fleet vehicles."""
    __tablename__ = 'vehicles'

    id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.String(20), unique=True, nullable=False)
    model = db.Column(db.String(100), nullable=False)
    driver = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='Idle')  # Active, Idle, Maintenance
    current_shipment = db.Column(db.String(20), nullable=True)
    health = db.Column(db.Integer, default=100)
    mileage = db.Column(db.String(50), default='0 km')
    fuel_level = db.Column(db.Integer, default=100)
    location = db.Column(db.String(200), default='Main Depot')
    last_maintenance = db.Column(db.String(50), default='N/A')
    next_maintenance = db.Column(db.String(50), default='30 days')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "vehicle_id": self.vehicle_id,
            "model": self.model,
            "driver": self.driver,
            "status": self.status,
            "current_shipment": self.current_shipment,
            "health": self.health,
            "mileage": self.mileage,
            "fuel_level": self.fuel_level,
            "location": self.location,
            "last_maintenance": self.last_maintenance,
            "next_maintenance": self.next_maintenance,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Order(db.Model):
    """Model for customer orders."""
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(20), unique=True, nullable=False)
    customer = db.Column(db.String(200), nullable=False)
    items = db.Column(db.Integer, default=0)
    value = db.Column(db.String(20), default='$0')
    status = db.Column(db.String(20), default='Pending')  # Pending, Processing, Shipped, Delivered
    date = db.Column(db.String(20), nullable=True)
    shipment_id = db.Column(db.String(20), nullable=True)
    inventory_impact = db.Column(db.String(20), default='Low')
    priority = db.Column(db.String(10), default='medium')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "customer": self.customer,
            "items": self.items,
            "value": self.value,
            "status": self.status,
            "date": self.date,
            "shipment_id": self.shipment_id,
            "inventory_impact": self.inventory_impact,
            "priority": self.priority,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Notification(db.Model):
    """Model for system notifications."""
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=True)
    type = db.Column(db.String(20), default='info')  # critical, warning, success, info
    icon_type = db.Column(db.String(20), default='info')
    read = db.Column(db.Boolean, default=False)
    time = db.Column(db.String(50), default='Just now')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "message": self.message,
            "type": self.type,
            "icon_type": self.icon_type,
            "read": self.read,
            "time": self.time,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Shipment(db.Model):
    """Model for shipments."""
    __tablename__ = 'shipments'

    id = db.Column(db.Integer, primary_key=True)
    shipment_id = db.Column(db.String(20), unique=True, nullable=False)
    origin = db.Column(db.String(200), nullable=False)
    destination = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(20), default='Pending')
    weight = db.Column(db.String(50), nullable=True)
    carrier = db.Column(db.String(100), nullable=True)
    eta = db.Column(db.String(50), nullable=True)
    priority = db.Column(db.String(10), default='medium')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "shipment_id": self.shipment_id,
            "origin": self.origin,
            "destination": self.destination,
            "status": self.status,
            "weight": self.weight,
            "carrier": self.carrier,
            "eta": self.eta,
            "priority": self.priority,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
