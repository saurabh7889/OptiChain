"""
Graph Model for OptiChain Logistics System.
"""
import networkx as nx
import json
from models.database import RouteEdge

class GraphModel:
    """Class to build and manage the logistics graph."""

    def __init__(self):
        """Initialize the GraphModel."""
        pass

    def get_graph(self):
        """
        Build and return the current graph object from the MySQL database.

        Returns:
            networkx.Graph: The constructed route optimization graph.
        """
        graph = nx.Graph()
        try:
            # Query edges from MySQL directly via SQLAlchemy
            edges = RouteEdge.query.all()
            edge_tuples = [edge.to_tuple() for edge in edges]
            graph.add_weighted_edges_from(edge_tuples)
        except Exception as e:
            raise RuntimeError(f"Database query failed while building graph: {e}")
        return graph

# Singleton instance to be used across the application
graph_model_instance = GraphModel()
