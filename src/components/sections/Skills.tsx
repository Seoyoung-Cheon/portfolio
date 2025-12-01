import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code, 
  Palette, 
   
  Server, 
  
  FileCode,
  Layers,
  Zap,
  GitBranch,
  Github,
  Rocket,

  Network,
  CheckSquare,
  Send,
  FileSpreadsheet
} from "lucide-react";

const skills = [
  { 
    category: "Frontend", 
    items: [
      { name: "HTML5", icon: FileCode },
      { name: "CSS", icon: Layers },
      { name: "JavaScript", icon: Code },
      { name: "React", icon: Zap }
    ]
  },
  { 
    category: "UI/UX", 
    items: [
      { name: "Tailwind CSS", icon: Palette },
      { name: "Shadcn UI", icon: Layers }
    ]
  },
  { 
    category: "Build/Deploy", 
    items: [
      { name: "Vite", icon: Zap },
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: Github },
      { name: "Vercel", icon: Rocket }
    ]
  },
  { 
    category: "Backend", 
    items: [
      { name: "Node.js", icon: Server },
      { name: "Axios", icon: Network }
    ]
  },
  { 
    category: "QA Tools", 
    items: [
      { name: "Jira", icon: CheckSquare },
      { name: "Postman", icon: Send },
      { name: "Excel 기반 TC관리", icon: FileSpreadsheet }
    ]
  },
];

export default function Skills() {
  return (
    <section id="skills" className="pt-32 pb-20 min-h-screen" style={{ minHeight: '100vh' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">기술 스택</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skill) => (
            <Card key={skill.category} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{skill.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {skill.items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <IconComponent className="w-5 h-5 text-white/80 flex-shrink-0" />
                        <span className="text-white/90 text-sm font-medium">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

