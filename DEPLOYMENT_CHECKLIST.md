# 배포 체크리스트

## ✅ 빌드 확인

-   [x] TypeScript 컴파일 성공
-   [x] Vite 빌드 성공 (Exit code: 0)

## 📦 주요 변경사항 확인

### 1. Favicon 변경

-   **파일**: `public/favicon1.ico`
-   **설정**: `index.html` 7번째 줄
-   **확인**: `/favicon1.ico` 경로가 올바른지 확인

### 2. 폰트 변경 (얇은둥근모)

-   **설정 위치**:
    -   `index.html` (9-16번째 줄) - @font-face 정의
    -   `tailwind.config.ts` (19-21번째 줄) - fontFamily 설정
    -   `src/index.css` - 모든 폰트 참조 변경
-   **확인**: CDN 링크가 작동하는지 확인
    -   URL: `https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/ThinDungGeunMo.woff2`

### 3. 불꽃 효과 (Fireworks)

-   **컴포넌트**: `src/components/Fireworks.tsx`
-   **엔진**: `src/lib/fireworks/fireworks.ts`
-   **유틸리티**: `src/lib/fireworks/utils.ts`
-   **App.tsx**: 10번째 줄 import, 15번째 줄 사용
-   **확인**: Canvas API가 작동하는지 확인

### 4. 이미지 카드 효과 (ImageCard)

-   **컴포넌트**: `src/components/ImageCard.tsx`
-   **스타일**: `src/components/ImageCard.css`
-   **사용**: `src/components/sections/About.tsx` 36-41번째 줄
-   **이미지 파일**:
    -   `public/myface.jpg` (커버 이미지)
    -   `public/myface2.png` (호버 시 나타나는 이미지)
-   **확인**: 이미지 파일 경로가 올바른지 확인

### 5. 배경 이미지

-   **파일**: `public/main_bg.jpg`
-   **설정**: `src/index.css` 73번째 줄 (body 배경)
-   **확인**: 배경 이미지가 모든 화면에 표시되는지 확인

## 🔍 배포 서버 확인 사항

### Public 폴더 파일 확인

다음 파일들이 배포 서버의 public 폴더에 포함되어야 합니다:

-   [ ] `favicon1.ico`
-   [ ] `myface.jpg`
-   [ ] `myface2.png`
-   [ ] `main_bg.jpg`
-   [ ] 기타 이미지 파일들

### 빌드 산출물 확인

-   [ ] `dist/index.html`에 favicon 경로가 올바른지
-   [ ] `dist/assets/` 폴더에 CSS/JS 파일들이 생성되었는지
-   [ ] `dist/` 폴더에 public 파일들이 복사되었는지

### 캐시 문제 해결

배포 후에도 변경사항이 보이지 않으면:

1. 브라우저 캐시 강제 새로고침 (Ctrl+Shift+R)
2. 배포 서버 캐시 클리어
3. CDN 캐시 무효화 (폰트의 경우)

## 🚨 일반적인 배포 문제

### 1. Public 폴더 파일 누락

-   Vite는 빌드 시 `public/` 폴더의 파일을 `dist/` 루트로 복사합니다
-   배포 서버 설정에서 `dist/` 폴더의 모든 파일이 포함되는지 확인

### 2. 경로 문제

-   모든 이미지 경로는 `/`로 시작해야 합니다 (예: `/myface2.png`)
-   상대 경로(`./myface2.png`)는 빌드 후 경로가 깨질 수 있습니다

### 3. 폰트 로딩 실패

-   CDN 링크가 작동하지 않으면 폰트가 로드되지 않습니다
-   네트워크 탭에서 폰트 파일 다운로드 여부 확인

### 4. Canvas API 문제

-   일부 환경에서 Canvas가 제대로 작동하지 않을 수 있습니다
-   콘솔에서 에러 확인

## 📝 배포 전 최종 확인

1. 로컬에서 `npm run build` 실행
2. `npm run preview`로 빌드 결과 미리보기
3. 모든 기능이 정상 작동하는지 확인
4. 배포 서버에 업로드
5. 배포 후 실제 사이트에서 확인
