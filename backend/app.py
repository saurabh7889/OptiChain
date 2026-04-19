"""
Main Application Factory for the OptiChain Backend.
"""
import logging
from flask import Flask
from flask_cors import CORS
from config import Config
from models.database import db, RouteEdge
from routes.optimize import optimize_bp
from routes.dashboard import dashboard_bp

# Set up structured application logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(name)s | %(levelname)s | %(message)s'
)

def create_app():
    """
    Factory pattern function to create and configure the Flask app instances.
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable Cross-Origin Resource Sharing
    CORS(app)

    # Initialize Database Connection
    db.init_app(app)
    
    with app.app_context():
        # Create MySQL tables if they operate in bounded contexts
        db.create_all()
        
        # Seed initial graph data if database is empty
        try:
            if RouteEdge.query.count() == 0:
                edges = [
                    RouteEdge(start_node="Warehouse", end_node="A", weight=4),
                    RouteEdge(start_node="A", end_node="C", weight=5),
                    RouteEdge(start_node="C", end_node="Destination", weight=3),
                    RouteEdge(start_node="Warehouse", end_node="B", weight=6),
                    RouteEdge(start_node="B", end_node="C", weight=5),
                    RouteEdge(start_node="B", end_node="Destination", weight=10),
                ]
                db.session.bulk_save_objects(edges)
                db.session.commit()
                logging.info("MySQL database seeded with initial graph structures.")
        except Exception as e:
            logging.error(f"Failed to initialize or seed MySQL DB: {e}")

    # Register application blueprints
    app.register_blueprint(optimize_bp)
    app.register_blueprint(dashboard_bp)

    @app.route('/health', methods=['GET'])
    def health_check():
        """
        Health check endpoint for determining live status in 
        production deployment environments (like Render/Railway).
        """
        return {"status": "healthy", "service": "optichain"}, 200

    return app

# WSGI entry point
app_instance = create_app()

if __name__ == '__main__':
    import os
    # Support for Render/Vercel/Heroku PORT environment variable
    port = int(os.environ.get('PORT', 5000))
    app_instance.run(
        host='0.0.0.0', 
        port=port, 
        debug=app_instance.config.get('DEBUG', False)
    )
