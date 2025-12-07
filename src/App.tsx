import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Career from "@/components/sections/Career";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import SideNavigation from "@/components/SideNavigation";
import Cursor from "@/components/Cursor";
import ScrollToTop from "@/components/ScrollToTop";
import Fireworks from "@/components/Fireworks";

function App() {
  return (
    <main className="min-h-screen w-full" style={{ width: "100%", margin: 0, padding: 0, background: "transparent" }}>
      <Fireworks />
      <Cursor />
      <SideNavigation />
      <ScrollToTop />
      <Hero />
      <About />
      <Career />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}

export default App;

