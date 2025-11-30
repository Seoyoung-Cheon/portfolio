import ProfileCard from "@/components/ProfileCard";

export default function About() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 min-h-screen" style={{ minHeight: '100vh' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-white" style={{ fontFamily: 'Chiron GoRound TC', letterSpacing: '0.05em' }}>About Me</h2>
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
                      <br /><br /><p>또한 새로운 기술과 디자인 트렌드를 탐색하고 적용하는 과정을 좋아하며,
더 나은 경험을 위해 끊임없이 실험하고 성장하고 있습니다.</p>
                      </p>
                    
                  </div>
                </div>
              </div>
            </div>
            
            {/* ProfileCard 영역 */}
            <div className="flex justify-center items-center">
              <ProfileCard
                name="천서영"
                title="신입 프론트엔드 개발자"
                handle="seoyoung"
                status="Available"
                contactText="Contact Me"
                avatarUrl="/myface.jpg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={scrollToContact}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

