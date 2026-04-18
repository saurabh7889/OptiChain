"""
Database models for OptiChain using SQLAlchemy.
"""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class RouteEdge(db.Model):
    """
    Model representing an edge in the logistics network graph.
    """
    __tablename__ = 'route_edges'
    
    id = db.Column(db.Integer, primary_key=True)
    start_node = db.Column(db.String(100), nullable=False)
    end_node = db.Column(db.String(100), nullable=False)
    weight = db.Column(db.Float, nullable=False)

    def to_tuple(self):
        """Convert edge row to a format expected by NetworkX."""
        return (self.start_node, self.end_node, self.weight)
