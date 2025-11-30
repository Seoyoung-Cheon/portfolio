import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import SideNavigation from "@/components/SideNavigation";

function App() {
  return (
    <main className="min-h-screen w-full" style={{ width: "100%", margin: 0, padding: 0, background: "transparent" }}>
      <SideNavigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}

export default App;

