"""
Dashboard API Blueprint for OptiChain.
Provides real-time logistics metrics and statuses.
"""
from flask import Blueprint, jsonify
import random
from datetime import datetime

dashboard_bp = Blueprint('dashboard_bp', __name__)

@dashboard_bp.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    """
    Returns the consolidated dashboard data including KPIs, vehicles, alerts, and activities.
    """
    # In a production scenario, these would be aggregated queries from the database.
    # For this integration, we provide the structured data the frontend expects.
    
    data = {
        "kpis": {
            "totalShipments": 1284,
            "delayedShipments": 12,
            "inventoryHealth": 94,
            "activeVehicles": 48,
            "trends": {
                "totalShipments": 12,
                "delayedShipments": -5,
                "inventoryHealth": 2,
                "activeVehicles": 8
            }
        },
        "vehicles": [
            {"id": "V1", "lat": 40.7128, "lng": -74.0060, "status": "on-time", "label": "Truck-402 (NY)"},
            {"id": "V2", "lat": 34.0522, "lng": -118.2437, "status": "in-transit", "label": "Truck-108 (LA)"},
            {"id": "V3", "lat": 41.8781, "lng": -87.6298, "status": "delayed", "label": "Truck-992 (CHI)"},
            {"id": "V4", "lat": 29.7604, "lng": -95.3698, "status": "on-time", "label": "Truck-551 (HOU)"}
        ],
        "alerts": [
            {
                "id": "A1", 
                "type": "critical", 
                "title": "Severe Weather Delay", 
                "message": "Route 12 (Chicago to Detroit) blocked due to heavy snowfall.",
                "timestamp": "10 mins ago"
            },
            {
                "id": "A2", 
                "type": "warning", 
                "title": "Inventory Low", 
                "message": "Critical SKU-902 below safety stock threshold in Dallas DC.",
                "timestamp": "42 mins ago"
            },
            {
                "id": "A3", 
                "type": "info", 
                "title": "Maintenance Required", 
                "message": "Vehicle V1 is scheduled for engine check in 48 hours.",
                "timestamp": "1 hour ago"
            }
        ],
        "activities": [
            {"id": "AC1", "action": "New Shipment Created", "item": "Order #88291 -> Boston", "time": "2 mins ago", "status": "success"},
            {"id": "AC2", "action": "Route Optimized", "item": "Region: North East (3 routes reduced)", "time": "15 mins ago", "status": "info"},
            {"id": "AC3", "action": "Vehicle Assigned", "item": "Truck-551 to Dispatch #122", "time": "25 mins ago", "status": "success"}
        ]
    }
    
    return jsonify(data), 200
