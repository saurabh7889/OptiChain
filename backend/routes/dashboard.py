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
    # Initialize with zero/empty data as requested
    
    data = {
        "kpis": {
            "totalShipments": 0,
            "delayedShipments": 0,
            "inventoryHealth": 0,
            "activeVehicles": 0,
            "trends": {
                "totalShipments": 0,
                "delayedShipments": 0,
                "inventoryHealth": 0,
                "activeVehicles": 0
            }
        },
        "vehicles": [],
        "alerts": [],
        "activities": []
    }
    
    return jsonify(data), 200
