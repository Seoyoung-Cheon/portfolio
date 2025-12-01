import { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface CareerItem {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
  companyIcon?: string; // 회사 아이콘 타입 (lg, kt, s1, hyundai)
}

// 회사 아이콘 컴포넌트
const CompanyIcon = ({ type }: { type?: string }) => {
  if (!type) return <Briefcase className="w-5 h-5 text-white/80" />;

  const iconStyle = "w-15 h-15 flex-shrink-0 object-contain p-2";
  const containerStyle = "w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg";
  
  switch (type) {
    case "lg":
      return (
        <div className={containerStyle}>
          <img 
            src="/LG.png" 
            alt="LG" 
            className={iconStyle}
          />
        </div>
      );
    case "kt":
      return (
        <div className={containerStyle}>
          <img 
            src="/KT.png" 
            alt="KT" 
            className={iconStyle}
          />
        </div>
      );
    case "s1":
      return (
        <div className={containerStyle}>
          <img 
            src="/S1.png" 
            alt="S1" 
            className={iconStyle}
          />
        </div>
      );
    case "hyundai":
      return (
        <div className={containerStyle}>
          <img 
            src="/HC.png" 
            alt="HC" 
            className={iconStyle}
          />
        </div>
      );
    default:
      return <Briefcase className="w-5 h-5 text-white/80" />;
  }
};

const careers: CareerItem[] = [
  {
    company: "LG MyCup/LG HoverGym 검증",
    position: "QA 엔지니어",
    period: "2024.04 - 2024.09",
    location: "서울",
    companyIcon: "lg",
    description: [
      "Excel·Postman 활용 API 테스트 및 기능 검증 수행"
    ]
  },
  {
    company: "에스원 POE 카메라 NVR 웹 검증",
    position: "QA 엔지니어",
    period: "2024.01 - 2024.03",
    location: "서울",
    companyIcon: "s1",
    description: [
      "Excel 기반 테스트 문서 관리 및 기능 검증"
    ]
  },
  {
    company: "KT 비대면 모바일/웹 검증",
    position: "QA 엔지니어",
    period: "2023.05 - 2023.12",
    location: "서울",
    companyIcon: "kt",
    description: [
      "구글시트 활용 테스트케이스 관리 및 결과 보고"
    ]
  },
  {
    company: "KT 탄소중립 플랫폼 앱 검증",
    position: "QA 엔지니어",
    period: "2023.03 - 2023.04",
    location: "서울",
    companyIcon: "kt",
    description: [
      "보조 업무, 간단 이슈 등록 및 TC 작성"
    ]
  },
  {
    company: "KT 멤버십 리뉴얼 앱 검증",
    position: "QA 엔지니어",
    period: "2022.12 - 2023.02",
    location: "서울",
    companyIcon: "kt",
    description: [
      "Slack, GitHub 기반 협업 및 테스트 진행"
    ]
  },
  {
    company: "현대카드 M포인트몰 앱 검증",
    position: "QA 엔지니어",
    period: "2022.09 - 2022.11",
    location: "서울",
    companyIcon: "hyundai",
    description: [
      "Jira 사용, 결제 모듈 검증 및 이슈 관리"
    ]
  },
  {
    company: "LG 모바일 검증",
    position: "QA 엔지니어",
    period: "2022.03 - 2022.08",
    location: "서울",
    companyIcon: "lg",
    description: [
      "TD 사용, 기능검증"
    ]
  }
];

export default function Career() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 섹션이 뷰포트에 들어왔는지 확인
      if (rect.top < windowHeight && rect.bottom > 0) {
        // ========== [조정 포인트 1] 스크롤 시작/끝 시점 ==========
        // 스크롤 진행도 계산 (0 ~ 1)
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = rect.height;
        
        // 🔧 조정: 애니메이션 시작 시점
        // 값이 클수록 더 일찍 시작 (예: 0.9, 1.0)
        // 값이 작을수록 더 늦게 시작 (예: 0.5, 0.3)
        // ⚠️ 현재: 카드가 3배 더 빨리 나타나도록 더 일찍 시작
        const scrollStart = sectionTop - windowHeight * 1.2;
        
        // 🔧 조정: 애니메이션 끝나는 시점
        // 값이 작을수록 더 일찍 끝남 (예: 0.1)
        // 값이 클수록 더 늦게 끝남 (예: 0.5)
        const scrollEnd = sectionTop + sectionHeight - windowHeight * 0.2;
        
        // 🔧 조정: 현재 스크롤 기준점 (scrollStart와 같은 값으로 맞춤)
        const currentScroll = window.scrollY + windowHeight * 1.2;
        
        const progress = Math.max(0, Math.min(1, (currentScroll - scrollStart) / (scrollEnd - scrollStart)));
        setScrollProgress(progress);

        // 스크롤 진행도만 업데이트 (각 항목의 표시는 itemProgress로 처리)
      }
    };

    // 스로틀링으로 성능 최적화
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    handleScroll(); // 초기 실행

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="career" 
      className="py-20 min-h-screen relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-white" style={{ fontFamily: 'Chiron GoRound TC' }}>
          회사 경력
        </h2>
        <p className="text-center text-white/70 mb-8" style={{ fontFamily: 'Chiron GoRound TC' }}>
          (주)엠스텍 (2022.03~2024.09)
        </p>
        
        {/* 협업 경험 문구 - 애니메이션 */}
        <div 
          className="text-center mb-16"
          style={{
            opacity: scrollProgress > 0.1 ? Math.min(1, (scrollProgress - 0.1) * 5) : 0,
            transform: `translateY(${scrollProgress > 0.1 ? 0 : 20}px)`,
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <p className="text-xl text-white/90 font-medium" style={{ fontFamily: 'Chiron GoRound TC' }}>
            개발·기획·운영 팀과 협업해온 실무 경험
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* 타임라인 라인 */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/20" />
          
          {/* 프로그레스 바 (좌측에서 우측으로) */}
          <div 
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-white/40 transition-all duration-300"
            style={{
              height: `${Math.min(100, scrollProgress * 100)}%`,
              background: scrollProgress > 0 
                ? `linear-gradient(to bottom, rgba(255, 102, 51, 0.8) 0%, rgba(255, 102, 51, 0.6) ${Math.min(100, scrollProgress * 100)}%, transparent ${Math.min(100, scrollProgress * 100)}%)`
                : 'transparent'
            }}
          />

          {/* 경력 항목들 */}
          <div className="space-y-12 relative">
            {careers.map((career, index) => {
              // ========== [조정 포인트 3] 각 항목의 애니메이션 범위 ==========
              // ⚠️ 주의: 이 값들은 위의 [조정 포인트 2]와 동일하게 맞춰야 함!
              
              // 🔧 조정: 항목 시작 시점 (위의 itemStart와 동일한 값)
              const itemStart = index * 0.01;
              
              // 🔧 조정: 항목 애니메이션 범위 (위의 itemEnd - itemStart와 동일한 값)
              const itemRange = 0.8;
              // 진행도가 범위를 벗어나도 부드럽게 처리
              let itemProgress = (scrollProgress - itemStart) / itemRange;
              // 시작 전에는 0, 끝난 후에는 1로 유지하여 카드가 사라지지 않도록
              if (itemProgress < 0) itemProgress = 0;
              if (itemProgress > 1) itemProgress = 1;
              itemProgress = Math.max(0, Math.min(1, itemProgress));
              
              return (
                <div
                  key={index}
                  className="relative pl-20"
                  style={{
                    opacity: itemProgress > 0 ? itemProgress : 0,
                    transform: `translateX(${itemProgress > 0 ? (1 - itemProgress) * 100 : -50}px)`,
                    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                    pointerEvents: itemProgress > 0 ? 'auto' : 'none',
                    visibility: itemProgress > 0 ? 'visible' : 'hidden'
                  }}
                >
                  {/* 타임라인 포인트 */}
                  <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                    <div 
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-white/60 to-white/80 transition-all duration-500"
                      style={{
                        transform: `scale(${itemProgress > 0.3 ? 1 : 0})`,
                        opacity: itemProgress > 0.3 ? 1 : 0
                      }}
                    />
                  </div>

                  {/* 경력 카드 */}
                  <div 
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
                    style={{
                      transform: `translateX(${(1 - itemProgress) * 100}px)`,
                      opacity: itemProgress
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CompanyIcon type={career.companyIcon} />
                          <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Chiron GoRound TC' }}>
                            {career.company}
                          </h3>
                        </div>
                        <p className="text-lg text-white/90 font-medium ml-7">{career.position}</p>
                      </div>
                      
                      <div className="flex flex-col gap-2 md:items-end">
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{career.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{career.location}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="ml-7 space-y-2">
                      {career.description.map((desc, descIndex) => (
                        <li 
                          key={descIndex}
                          className="text-white/80 text-sm flex items-start gap-2"
                          style={{
                            opacity: itemProgress > 0.5 ? 1 : 0,
                            transform: `translateX(${itemProgress > 0.5 ? 0 : -20}px)`,
                            transition: `opacity 0.4s ease-out ${descIndex * 0.1}s, transform 0.4s ease-out ${descIndex * 0.1}s`
                          }}
                        >
                          <span className="text-white/60 mt-1">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

