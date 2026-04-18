"""
Routing Service for calculating optimal logistics paths.
"""
import networkx as nx
import logging

# Configure logger
logger = logging.getLogger(__name__)

class RoutingService:
    """Service to handle route optimization algorithms."""

    def __init__(self, graph_model_instance):
        """
        Initialize the RoutingService.

        Args:
            graph_model_instance: The singleton instance containing the logistics graph.
        """
        self.graph_model = graph_model_instance

    def calculate_optimal_route(self, start_node, end_node):
        """
        Calculate the shortest path between a starting node and destination node
        using Dijkstra's algorithm.

        Args:
            start_node (str): The starting location point.
            end_node (str): The end location point.

        Returns:
            dict: The optimal path array and the calculated total distance.
        """
        graph = self.graph_model.get_graph()

        if start_node not in graph.nodes:
            raise ValueError(f"Start node '{start_node}' does not exist in the defined logistics network.")
        if end_node not in graph.nodes:
            raise ValueError(f"End node '{end_node}' does not exist in the defined logistics network.")

        try:
            # Dijkstra calculation for shortest path
            path = nx.shortest_path(graph, source=start_node, target=end_node, weight='weight')
            distance = nx.shortest_path_length(graph, source=start_node, target=end_node, weight='weight')
            
            logger.info(f"Route optimized successfully: {start_node} -> {end_node} | Path: {path} | Distance: {distance}")
            
            return {
                "path": path,
                "distance": distance
            }
        except nx.NetworkXNoPath:
            raise ValueError(f"No continuous route available between '{start_node}' and '{end_node}'.")
        except Exception as e:
            logger.error(f"Failed to calculate optimal route: {str(e)}")
            raise RuntimeError("An internal calculating error occurred.")
