import { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 스크롤 복원 비활성화
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }

    // 마우스 이동 이벤트
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.pageX,
        y: e.pageY - (window.scrollY || window.pageYOffset || 0),
      });
    };

    // 모든 섹션 요소에 hover 이벤트 추가
    const sections = document.querySelectorAll("section");
    
    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    sections.forEach((section) => {
      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      sections.forEach((section) => {
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className={`cursor ${isHovering ? "on" : ""}`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    />
  );
}

