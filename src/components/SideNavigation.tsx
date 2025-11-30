import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "메인" },
  { id: "about", label: "소개" },
  { id: "skills", label: "기술" },
  { id: "projects", label: "프로젝트" },
  { id: "contact", label: "연락처" },
];

export default function SideNavigation() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed left-0 top-1/2 -translate-y-1/2 z-50 px-4">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="relative group"
            aria-label={section.label}
          >
            <div
              className={cn(
                "w-1 h-12 bg-white/30 rounded-full transition-all duration-300",
                activeSection === section.id
                  ? "bg-white h-16"
                  : "hover:bg-white/50 hover:h-14"
              )}
            />
            <span
              className={cn(
                "absolute left-6 top-1/2 -translate-y-1/2 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                activeSection === section.id && "opacity-100"
              )}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

