import ImageCard from "@/components/ImageCard";

export default function About() {
  return (
    <section id="about" className="py-20 min-h-screen" style={{ minHeight: '100vh' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-white" style={{ fontFamily: 'ThinRounded', letterSpacing: '0.05em' }}>About Me</h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* 텍스트 영역 */}
            <div>
              <div className="about-card">
                <div className="about-card-content">
                  <h3 className="about-card-title">안녕하세요!</h3>
                  <p className="about-card-subtitle">개발자로서의 여정</p>
                  <div className="about-card-description">
                    <p>
                      저는 약 3년간 QA로 일하며 수많은 오류를 발견하고, 사용자 행동을 관찰하며 제품의 디테일을 고민해왔습니다.
                    </p>
                    <p>
                     그 경험은 지금의 저를 만드는 탄탄한 기반이 되었습니다.
그저 기능을 만드는 데서 멈추지 않고,
                      사용자가 어떻게 느끼고 사용할지를 끝까지 상상하며 개발합니다.
                    </p>
                    <p>
                      또한 새로운 기술과 디자인 트렌드를 탐색하고 적용하는 과정을 좋아하며,
                      더 나은 경험을 위해 끊임없이 실험하고 성장하고 있습니다.
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
            
            {/* ImageCard 영역 */}
            <div className="flex justify-center items-center">
              <div className="relative inline-block">
                <ImageCard
                  imageUrl="/myface.jpg"
                  characterImageUrl="/myface2.png"
                  name="천서영"
                  title="프론트엔드 개발자"
                />
                {/* 포스트잇 스타일 정보 박스 - 데스크톱 기준 우측 상단에 배치 (모바일 미지원) */}
                {/* Tailwind 음수 right 유틸을 사용해 더 멀리 우측으로 이동 */}
                <div className="block absolute top-6 -right-32 lg:-right-40">
                  <div className="relative bg-amber-100 text-slate-800 px-4 py-3 rounded-md shadow-lg border border-amber-200 text-sm md:text-base -rotate-1" style={{ fontFamily: 'ThinRounded' }}>
                    <p className="font-semibold mb-1 whitespace-nowrap">
                      생년월일: <span className="font-normal">1998.11.11</span>
                    </p>
                    <p className="font-semibold mb-1 whitespace-nowrap">
                      거주지: <span className="font-normal">서울시 구로구</span>
                    </p>
                    <p className="font-semibold whitespace-nowrap">
                      학력: <span className="font-normal">대림대학교 의공융합과</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

