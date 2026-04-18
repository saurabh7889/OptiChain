import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemFunnel from "./components/ProblemFunnel";
import WarehouseImpact from "./components/WarehouseImpact";
import CapacityCrisis from "./components/CapacityCrisis";
import DwellTimeClock from "./components/DwellTimeClock";
import IntelligenceLayer from "./components/IntelligenceLayer";
import InnovationLoop from "./components/InnovationLoop";
import ArchitectureDiagram from "./components/ArchitectureDiagram";
import RouteOptimizer from "./components/RouteOptimizer";
import ROIAnalytics from "./components/ROIAnalytics";
import FutureRoadmap from "./components/FutureRoadmap";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-bento-bg selection:bg-bento-accent selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <ProblemFunnel />
        <WarehouseImpact />
        <CapacityCrisis />
        <DwellTimeClock />
        <IntelligenceLayer />
        <InnovationLoop />
        <ArchitectureDiagram />
        <RouteOptimizer />
        <ROIAnalytics />
        <FutureRoadmap />
      </main>
      <Footer />
    </div>
  );
}
