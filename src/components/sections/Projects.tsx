import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

// 기술 스택 아이콘 매핑 (tech 이름 -> public 폴더 이미지 경로)
const techIconMap: Record<string, string> = {
  "React": "/React.png",
  "JavaScript": "/Javascript.png",
  "Tailwind CSS": "/Tailwind.png",
  "redux Toolkit": "/Redux.png",
  "Redux": "/Redux.png",
  "PostgreSQL": "/PostgreSQL.png",
  "Google Maps API": "/Google_Maps.png",
  "Node.js": "/Nodejs.png",
  "npm": "/Npm.png",
  "Three.js": "/Three.js.png",
  "Axios": "/axios.png",
  "Vite": "/vite.png",
};

const projects = [
  {
    title: "유산지기",
    description: "사용자의 위치 기반으로 주변 문화유산과 행사 정보를 제공하는 웹 서비스입니다.",
    tech: ["React", "JavaScript", "Tailwind CSS","redux Toolkit","PostgreSQL","Google Maps API"],
    github: "https://github.com/noseunghyeon/test_front",
    demo: "https://test-front-lovat.vercel.app/",
    image: "/heritage.png",
    isExpired: true,
    role: [
      "검색 UI·자동완성",
      "검색 결과 모달·지도 연동",
      "즐겨찾기 시스템",
      "마이페이지",
      "반응형 UI/UX",
      "Axios·API 연동"
    ],
  },
  {
    title: "Lawmang",
    description: "GPT, LangChain, 벡터 검색 기술을 활용하여 사용자가 자신의 사건을 정리하고, 쟁점을 이해하며, 스스로 판단할 수 있도록 돕는 AI 기반 법률 지원 서비스입니다.",
    tech: ["React", "Redux", "Tailwind CSS", "JavaScript", "Node.js", "npm"],
    github: "https://github.com/ChloeLee01/lawmang_front",
    demo: "https://lawmang-front.vercel.app/",
    image: "/Lawmang.png",
    isExpired: true,
    role: [
      "페이지별 UI",
      "법률 챗봇",
      "판례 검색·요약",
      "법률 서식 미리보기",
      "Redux 상태 관리",
      "메모·열람 목록",
      "반응형 UI/UX"
    ],
  },
  {
    title: "Marryday(1차)",
    description: "사용자의 전신 사진과 드레스 이미지를 업로드하면 AI가 자동으로 피팅하여 체형에 맞는 드레스를 시각화해주는 웹 플랫폼입니다.",
    image: "/Marryday1.png",
    role: ["프론트엔드 개발", "UI 구현"],
  },
  {
    title: "Marryday(고품화)",
    description: "사용자의 전신 사진과 드레스 이미지를 업로드하면 AI가 자동으로 피팅하여 체형에 맞는 드레스를 시각화해주는 웹 플랫폼입니다. 이전 1차의 프로젝트에서 체형분석 기능을 추가하고 디자인과 UI를 개선하였습니다.",
    tech: ["React", "Tailwind CSS", "Three.js", "Axios", "JavaScript", "Vite"],
    github: "https://github.com/MerrydayPrject/final-repo-front",
    demo: "https://www.marryday.co.kr/",
    image: "/Marryday2.png",
    role: [
      "업로드·매칭 UI",
      "AI 합성 결과",
      "3D 드레스 뷰",
      "반응형 UI/UX",
      "메인 영상·마케팅"
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">프로젝트</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              {project.image && (
                <div className="w-full h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-white">{project.title}</CardTitle>
                  {project.isExpired && (
                    <span className="text-red-500 text-xs font-normal mt-2">
                      * AWS 기간이 만료되어 운영중이지 않습니다.
                    </span>
                  )}
                </div>
                {project.role && project.role.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2 mt-2 mb-2">
                      {project.role.map((r, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-md text-xs font-medium border border-orange-500/30"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <CardDescription className="text-white/70 mt-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {project.tech.map((tech) => {
                      const iconSrc = techIconMap[tech];
                      if (iconSrc) {
                        return (
                          <div
                            key={tech}
                            className="w-10 h-10 rounded-lg bg-white/40 border border-white/70 flex items-center justify-center hover:bg-white/60 transition-colors cursor-default"
                            title={tech}
                          >
                            <img
                              src={iconSrc}
                              alt={tech}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                        );
                      }

                      // 아이콘이 없는 기술은 기존 텍스트 뱃지로 표시
                      return (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 text-white rounded text-xs border border-white/20"
                          title={tech}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                )}
                <div className="flex gap-2 mt-auto">
                  {project.github && (
                    <Button variant="outline" size="sm" asChild className="border-white/20 bg-white/90 text-black hover:scale-105 transition-transform">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Github
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button variant="outline" size="sm" asChild className="border-white/20 bg-white/90 text-black hover:scale-105 transition-transform">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        사이트 방문하기
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

