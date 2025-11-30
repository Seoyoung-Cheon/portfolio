import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">연락처</h2>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>함께 일하고 싶으신가요?</CardTitle>
              <CardDescription>
                프로젝트나 협업에 관심이 있으시다면 언제든지 연락주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="mailto:your.email@example.com">
                    <Mail className="w-4 h-4 mr-2" />
                    이메일
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

