import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "프로젝트 1",
    description: "프로젝트에 대한 설명을 여기에 작성하세요.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "프로젝트 2",
    description: "프로젝트에 대한 설명을 여기에 작성하세요.",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "프로젝트 3",
    description: "프로젝트에 대한 설명을 여기에 작성하세요.",
    tech: ["React", "Python", "Docker"],
    github: "https://github.com",
    demo: "https://example.com",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">프로젝트</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      코드
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      데모
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

