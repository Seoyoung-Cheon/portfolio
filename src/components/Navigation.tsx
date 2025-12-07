import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            Portfolio
          </button>
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm hover:text-primary transition-colors"
            >
              소개
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-sm hover:text-primary transition-colors"
            >
              기술
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm hover:text-primary transition-colors"
            >
              프로젝트
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm hover:text-primary transition-colors"
            >
              연락처
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}





