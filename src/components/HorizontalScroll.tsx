import { useEffect, useRef, useState } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHeroPassed, setIsHeroPassed] = useState(false);

  useEffect(() => {
    // Hero 섹션이 지나갔는지 확인
    const checkHeroPassed = () => {
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        // Hero가 완전히 화면 밖으로 나갔는지 확인
        setIsHeroPassed(heroRect.bottom <= 0);
      }
    };

    window.addEventListener("scroll", checkHeroPassed);
    checkHeroPassed(); // 초기 확인

    return () => {
      window.removeEventListener("scroll", checkHeroPassed);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Hero 섹션이 아직 지나가지 않았으면 수직 스크롤 허용
      if (!isHeroPassed) {
        return;
      }

      // 컨테이너 내부에서만 수평 스크롤 처리
      const containerRect = container.getBoundingClientRect();
      const isInContainer = 
        e.clientX >= containerRect.left && 
        e.clientX <= containerRect.right &&
        e.clientY >= containerRect.top && 
        e.clientY <= containerRect.bottom;

      if (!isInContainer) {
        return;
      }

      // About 섹션부터는 수평 스크롤로 변환
      e.preventDefault();
      e.stopPropagation();
      
      if (!isScrolling) {
        isScrolling = true;
        container.style.scrollBehavior = "smooth";
      }

      const delta = e.deltaY || e.deltaX;
      container.scrollLeft += delta;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        container.style.scrollBehavior = "auto";
      }, 150);
    };

    // 컨테이너에만 이벤트 리스너 추가
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [isHeroPassed]);

  return (
    <div ref={containerRef} className="horizontal-scroll-container">
      {children}
    </div>
  );
}

