"""
Optimize Route Blueprint for OptiChain.
"""
from flask import Blueprint, request, jsonify
from services.routing_service import RoutingService
from models.graph_model import graph_model_instance
from utils.helpers import create_error_response, validate_optimize_request
import logging

logger = logging.getLogger(__name__)

# Blueprint instantiation
optimize_bp = Blueprint('optimize_bp', __name__)

# Service initialization
routing_service = RoutingService(graph_model_instance)

@optimize_bp.route('/optimize', methods=['POST'])
def optimize_route():
    """
    Endpoint to compute the optimal delivery route.
    
    Accepts JSON body:
    {
        "start": "<Location>",
        "end": "<Location>"
    }
    
    Returns JSON response:
    {
        "path": ["nodeA", "nodeB", ...],
        "distance": <number>
    }
    """
    try:
        data = request.get_json(silent=True)
        start_node, end_node, error = validate_optimize_request(data)

        if error:
            logger.warning(f"Request validation failed: {error}")
            return create_error_response(error, 400)

        # Process and return the route optimization
        result = routing_service.calculate_optimal_route(start_node, end_node)
        return jsonify(result), 200

    except ValueError as ve:
        logger.warning(f"Optimization ValueError: {str(ve)}")
        return create_error_response(str(ve), 404)  
    except RuntimeError as re:
        logger.error(f"Optimization RuntimeError: {str(re)}")
        return create_error_response(str(re), 500)
    except Exception as e:
        logger.error(f"Unhandled Exception in optimize endpoint: {str(e)}")
        return create_error_response("Internal Server Error.", 500)
