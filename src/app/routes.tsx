import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout";
import { Dashboard } from "./components/pages/Dashboard";
import { Shipments } from "./components/pages/Shipments";
import { Inventory } from "./components/pages/Inventory";
import { Orders } from "./components/pages/Orders";
import { Vehicles } from "./components/pages/Vehicles";
import { Analytics } from "./components/pages/Analytics";
import { Notifications } from "./components/pages/Notifications";
import { Settings } from "./components/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "shipments", Component: Shipments },
      { path: "inventory", Component: Inventory },
      { path: "orders", Component: Orders },
      { path: "vehicles", Component: Vehicles },
      { path: "analytics", Component: Analytics },
      { path: "notifications", Component: Notifications },
      { path: "settings", Component: Settings },
    ],
  },
]);
