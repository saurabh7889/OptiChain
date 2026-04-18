"""
Utility functions for the OptiChain application.
"""
from flask import jsonify

def create_error_response(message, status_code):
    """
    Create a standardized JSON error response.

    Args:
        message (str): A descriptive error message.
        status_code (int): The HTTP status code to return.

    Returns:
        tuple: A Flask JSON response and the associated status code.
    """
    return jsonify({"error": message}), status_code

def validate_optimize_request(data):
    """
    Validate the incoming request payload for route optimization.

    Args:
        data (dict): The incoming JSON payload.

    Returns:
        tuple: (start_node, end_node, error_message)
            If the request is valid, error_message is None.
            If invalid, start_node and end_node are None, and error_message contains the context.
    """
    if not data:
        return None, None, "Missing JSON request body."
    
    start = data.get("start")
    end = data.get("end")

    if not start or not end:
        return None, None, "Both 'start' and 'end' parameters are required."
    
    if not isinstance(start, str) or not isinstance(end, str):
        return None, None, "'start' and 'end' must be strings."

    # Normalize to Title Case so 'warehouse' matches 'Warehouse'
    start = start.strip().title()
    end = end.strip().title()

    return start, end, None
