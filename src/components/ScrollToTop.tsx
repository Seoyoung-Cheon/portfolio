import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero(메인) 섹션의 위치 확인
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Hero 섹션이 뷰포트를 완전히 벗어났는지 확인 (bottom이 0보다 작으면 벗어남)
        // Hero 섹션을 벗어나면 버튼 표시
        const isHeroPassed = rect.bottom < 0;
        setIsVisible(isHeroPassed);
      } else {
        // Hero 섹션이 없으면 항상 표시
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg"
      aria-label="맨 위로 가기"
    >
      <ArrowUp className="w-6 h-6 text-white" />
    </button>
  );
}

