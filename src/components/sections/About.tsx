import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>안녕하세요!</CardTitle>
              <CardDescription>개발자로서의 여정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                저는 사용자 경험을 중시하는 개발자입니다. 깔끔한 코드와 직관적인
                인터페이스를 만들어 사용자에게 가치를 전달하는 것을 좋아합니다.
              </p>
              <p className="text-muted-foreground">
                최신 기술 스택을 학습하고 적용하는 것을 즐기며, 지속적인 성장을
                추구합니다. 팀과의 협업을 통해 더 나은 솔루션을 만들어가는 것을
                목표로 합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

