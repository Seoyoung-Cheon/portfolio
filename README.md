# 포트폴리오

shadcn/ui를 사용한 모던한 포트폴리오 웹사이트입니다.

## 기술 스택

- **Framework**: React 18 + Vite
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **아이콘**: Lucide React
- **폰트**: Chiron GoRound TC

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:5000](http://localhost:5000)을 열어 확인하세요.

### 3. 빌드

```bash
npm run build
```

### 4. 빌드 미리보기

```bash
npm run preview
```

## 프로젝트 구조

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui 컴포넌트
│   │   ├── sections/            # 페이지 섹션 컴포넌트
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Contact.tsx
│   │   └── SideNavigation.tsx   # 좌측 네비게이션 바
│   ├── lib/
│   │   └── utils.ts             # 유틸리티 함수
│   ├── App.tsx                  # 메인 앱 컴포넌트
│   ├── main.tsx                 # 진입점
│   └── index.css                # 전역 스타일
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── components.json              # shadcn/ui 설정
```

## 주요 기능

- 인터랙티브 히어로 섹션
- 물결 애니메이션 밑줄
- 좌측 세로 네비게이션 바
- 반응형 디자인
- 불꽃놀이 배경 애니메이션

## 커스터마이징

### 색상 테마 변경

`src/index.css` 파일의 CSS 변수를 수정하여 색상 테마를 변경할 수 있습니다.

### 프로젝트 정보 수정

`src/components/sections/Projects.tsx` 파일의 `projects` 배열을 수정하여 프로젝트 정보를 업데이트하세요.

### 기술 스택 수정

`src/components/sections/Skills.tsx` 파일의 `skills` 배열을 수정하여 기술 스택을 업데이트하세요.

### 연락처 정보 수정

`src/components/sections/Contact.tsx` 파일에서 이메일, GitHub, LinkedIn 링크를 수정하세요.

## 추가 shadcn/ui 컴포넌트 설치

새로운 shadcn/ui 컴포넌트를 추가하려면:

```bash
npx shadcn-ui@latest add [component-name]
```

예시:
```bash
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add avatar
```

## 라이선스

MIT
