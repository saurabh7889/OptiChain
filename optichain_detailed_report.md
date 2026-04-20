# OptiChain Project Report

## Executive Summary
**OptiChain** is a dynamic, modern Supply Chain and Logistics Optimization Platform designed to streamline operations such as inventory tracking, fleet management, order fulfillment, and route optimization. Built with a robust full-stack architecture, it combines a sleek, highly responsive frontend with a powerful Python-based backend that leverages graph algorithms to solve complex logistics challenges.

---

## 🛠️ Technology Stack
### Frontend
*   **Framework**: React 18, utilizing TypeScript and Vite for ultra-fast builds.
*   **Styling**: Tailwind CSS (v4) paired with Radix UI components for a robust, accessible, and premium design system (shadcn/ui style).
*   **Animations**: `framer-motion` to provide fluid micro-animations and a dynamic user experience.
*   **Mapping & Data Vis**: `react-leaflet` for geographical shipment mapping and `recharts` for comprehensive data analytics.
*   **State & Interactions**: Features React Drag-and-Drop (`react-dnd`) and seamless hook-based state management.

### Backend
*   **Framework**: Python with Flask, structured around a factory pattern and Blueprints.
*   **Database**: MySQL database using `Flask-SQLAlchemy` ORM to handle relational data entities.
*   **Optimization Engine**: Utilizes `NetworkX` to perform graph-based routing optimizations (e.g., shortest path calculations using Dijkstra's algorithm for logistics).

---

## 🚀 Core Features & Usage Details

### 1. 📊 Interactive Dashboard (`/`)
*   **Description**: The centralized hub offering a high-level overview of the entire supply chain.
*   **Usage**: Users log in and immediately see critical Key Performance Indicators (KPIs) such as active shipments, fleet health, and recent alerts. It acts as the mission control for dispatchers and warehouse managers.

### 2. 🚚 Shipments & Route Optimization (`/shipments`)
*   **Description**: A comprehensive tracking system for active deliveries integrated with smart routing capabilities.
*   **Usage**: 
    *   Users can view a list of all current shipments, filtering them by status (Pending, In Transit, Delivered).
    *   **New Shipment Creation**: Users can trigger the "New Shipment Modal" to manually add a delivery request.
    *   **Route Optimization**: Behind the scenes, the backend utilizes `NetworkX` on predefined `RouteEdge` data to calculate the most efficient path from origin to destination, minimizing fuel and time costs.

### 3. 🏢 Inventory & Warehouse Management (`/inventory`)
*   **Description**: Real-time tracking of stock levels across multiple warehouse locations.
*   **Usage**:
    *   **Adding Stock**: Users interact with the "New Inventory Modal" to record new goods received.
    *   **Warehouse Management**: The system allows for adding new warehouses ("New Warehouse Modal") and features a context menu (right-click) to delete or manage warehouse records efficiently.

### 4. 📦 Order Processing (`/orders`)
*   **Description**: Manages customer orders and their impact on inventory.
*   **Usage**: Displays a table of incoming orders. Staff can track priority levels, view associated shipments, and monitor fulfillment status from "Pending" through "Delivered".

### 5. 🚛 Fleet Management (`/vehicles`)
*   **Description**: Tracks the health, location, and status of logistics vehicles.
*   **Usage**: Dispatchers use this screen to monitor which trucks are idle, active, or in maintenance. It tracks intricate details like fuel levels, mileage, current drivers, and next scheduled maintenance dates to prevent unexpected breakdowns.

### 6. 📈 Analytics & Reporting (`/analytics`)
*   **Description**: Deep-dive data visualization for operational efficiency.
*   **Usage**: Decision-makers use Recharts-powered graphs to analyze historical data, delivery times, and cost savings to strategize future supply chain improvements.

### 7. 🔔 Real-time Notifications (`/notifications`)
*   **Description**: System-wide alerting mechanism.
*   **Usage**: Users receive instant feedback on critical events (e.g., a delayed shipment, low inventory, or a vehicle needing maintenance). Notifications can be marked as read and are categorized by severity (info, warning, critical).

### 8. 🤖 Vizard AI Chatbot (Global Widget)
*   **Description**: A floating, AI-powered assistant accessible from anywhere within the application.
*   **Usage**: Users can interact with Vizard AI to ask questions about system usage, retrieve quick stats, or get automated help with supply chain anomalies without leaving their current workflow.

### 9. ⚙️ Dynamic Settings (`/settings`)
*   **Description**: User and system preference configuration.
*   **Usage**: Features a tabbed interface allowing users to toggle themes (Dark/Light mode), manage profile details, and adjust application-wide parameters.

---

## 📂 Database Schema Overview
The backend `database.py` defines several key models:
1.  **RouteEdge**: Defines the nodes and weights for the logistics graph (used by NetworkX).
2.  **Vehicle**: Stores fleet data (`vehicle_id`, `driver`, `status`, `health`, `fuel_level`).
3.  **Order**: Stores customer purchases (`order_id`, `status`, `inventory_impact`, `priority`).
4.  **Shipment**: Tracks actual transport (`shipment_id`, `origin`, `destination`, `weight`, `eta`).
5.  **Notification**: Records system alerts (`title`, `type`, `read` status).

## 💡 Conclusion
OptiChain provides a production-ready, feature-rich environment that balances an aesthetically pleasing UI with heavy-lifting algorithms on the backend. Its architecture is built to scale, making it highly suitable for modern logistics and supply chain optimization needs.
