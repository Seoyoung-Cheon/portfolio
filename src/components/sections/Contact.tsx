import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 min-h-screen flex items-center justify-center" style={{ minHeight: '100vh' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="contact-card">
            <div className="contact-card-content">
              <h2 className="contact-title">감사합니다</h2>
              <p className="contact-description">
                제가 구현하는 화면이 사용자의 첫 인상이 되는 만큼,
더 나은 경험을 설계하고 구현하는 프론트엔드 개발자로 성장하겠습니다.
              </p>
              <div className="contact-email">
                <Mail className="contact-email-icon" />
                <span className="contact-email-text">
                  gu05087@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

