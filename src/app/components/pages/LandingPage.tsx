import Navbar from "../landing/Navbar";
import Hero from "../landing/Hero";
import ProblemFunnel from "../landing/ProblemFunnel";
import WarehouseImpact from "../landing/WarehouseImpact";
import CapacityCrisis from "../landing/CapacityCrisis";
import DwellTimeClock from "../landing/DwellTimeClock";
import IntelligenceLayer from "../landing/IntelligenceLayer";
import InnovationLoop from "../landing/InnovationLoop";
import ArchitectureDiagram from "../landing/ArchitectureDiagram";
import RouteOptimizer from "../landing/RouteOptimizer";
import ROIAnalytics from "../landing/ROIAnalytics";
import FutureRoadmap from "../landing/FutureRoadmap";
import Footer from "../landing/Footer";

export function LandingPage() {
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
