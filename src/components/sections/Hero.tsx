export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        margin: 0, 
        padding: 0, 
        width: "100vw"
      }}
    >
      <div className="note" style={{ zIndex: 10, position: "relative", width: "100%" }}>
        <div>안녕하세요</div>
        <div>신입 <span className="wavy-underline">프론트엔드 개발자</span> <span style={{ color: '#ff6633' }}>천서영</span>입니다</div>
      </div>
    </section>
  );
}
