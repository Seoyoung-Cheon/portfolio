# 배포 서버 적용 안 되는 문제 해결 가이드

## 🔍 문제 진단

파비콘은 적용되었지만 그 이후 변경사항이 적용되지 않는 경우:

### 가능한 원인:

1. **빌드 파일이 제대로 업로드되지 않음**
2. **캐시 문제**
3. **Public 폴더 파일 누락**
4. **빌드 산출물 불완전**

## ✅ 해결 방법

### 1. 로컬에서 빌드 확인

```bash
npm run build
```

빌드 후 `dist/` 폴더 확인:

-   `dist/index.html` 존재 확인
-   `dist/assets/` 폴더에 JS/CSS 파일 확인
-   `dist/myface2.png` 파일 존재 확인
-   `dist/favicon1.ico` 파일 존재 확인

### 2. 배포 서버에 업로드할 파일

**반드시 포함해야 할 파일들:**

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── favicon1.ico
├── myface.jpg
├── myface2.png          ← 중요!
├── main_bg.jpg
└── (기타 public 폴더의 이미지들)
```

### 3. 주요 변경사항 확인

#### ✅ 폰트 변경 (ThinRounded)

-   **위치**: `index.html` 9-16번째 줄
-   **방식**: CDN 링크 사용
-   **확인**: 브라우저 개발자 도구 → Network 탭에서 폰트 파일 다운로드 확인
-   **문제**: CDN이 차단되면 폰트가 로드되지 않음

#### ✅ 불꽃 효과 (Fireworks)

-   **컴포넌트**: `src/components/Fireworks.tsx`
-   **포함 위치**: JavaScript 번들에 포함됨
-   **확인**: 브라우저 콘솔에서 에러 확인
-   **문제**: Canvas API가 작동하지 않으면 효과가 안 보임

#### ✅ 이미지 카드 (ImageCard)

-   **컴포넌트**: `src/components/ImageCard.tsx`
-   **스타일**: `src/components/ImageCard.css`
-   **포함 위치**: JavaScript/CSS 번들에 포함됨
-   **확인**: About 섹션에서 카드가 보이는지 확인

#### ✅ 이미지 파일 (myface2.png)

-   **위치**: `public/myface2.png`
-   **사용**: `src/components/sections/About.tsx` 40번째 줄
-   **경로**: `/myface2.png` (절대 경로)
-   **문제**: 파일이 `dist/` 폴더에 복사되지 않으면 404 에러 발생

### 4. 배포 서버 설정 확인

#### GitHub Pages 사용 시:

1. `dist/` 폴더 내용을 루트에 배포
2. 또는 `gh-pages` 브랜치에 `dist/` 내용 배포

#### 다른 호스팅 사용 시:

1. 빌드 산출물(`dist/` 폴더 전체) 업로드
2. 루트 경로가 `index.html`을 가리키는지 확인

### 5. 캐시 문제 해결

배포 후에도 변경사항이 보이지 않으면:

1. **브라우저 캐시 클리어**

    - Ctrl+Shift+R (강제 새로고침)
    - 또는 개발자 도구 → Network 탭 → "Disable cache" 체크

2. **배포 서버 캐시 클리어**

    - CDN 캐시 무효화 (사용하는 경우)
    - 서버 캐시 재설정

3. **파일 버전 확인**
    - `dist/assets/` 폴더의 파일명에 해시가 포함되어 있는지 확인
    - 해시가 변경되었으면 새로 빌드된 것

### 6. 디버깅 체크리스트

배포 서버에서 확인:

-   [ ] 브라우저 개발자 도구 → Console 탭에서 에러 확인
-   [ ] Network 탭에서 다음 파일들이 로드되는지 확인:

    -   [ ] `/myface2.png` (200 OK)
    -   [ ] `/favicon1.ico` (200 OK)
    -   [ ] `/assets/index-[hash].js` (200 OK)
    -   [ ] `/assets/index-[hash].css` (200 OK)
    -   [ ] 폰트 CDN 링크 (200 OK)

-   [ ] Elements 탭에서 다음 확인:
    -   [ ] `<canvas>` 요소가 2개 있는지 (Fireworks)
    -   [ ] `ImageCard` 컴포넌트가 렌더링되는지
    -   [ ] 폰트가 `ThinRounded`로 적용되었는지

### 7. 빠른 해결 방법

1. **완전히 새로 빌드:**

    ```bash
    npm run build
    ```

2. **dist 폴더 전체 삭제 후 재빌드:**

    ```bash
    rm -rf dist
    npm run build
    ```

3. **배포 서버에 dist 폴더 전체 업로드**

4. **브라우저 캐시 완전히 클리어**

## 🚨 특별 주의사항

### myface2.png 파일 누락 문제

가장 흔한 문제는 `myface2.png` 파일이 배포 서버에 없을 때입니다.

**확인 방법:**

-   브라우저 개발자 도구 → Network 탭
-   `/myface2.png` 요청이 404 에러인지 확인

**해결 방법:**

-   `public/myface2.png` 파일이 존재하는지 확인
-   빌드 후 `dist/myface2.png` 파일이 생성되었는지 확인
-   배포 서버에 `myface2.png` 파일 업로드

### Fireworks 컴포넌트가 작동하지 않는 경우

-   Canvas API가 지원되는 브라우저인지 확인
-   콘솔에서 JavaScript 에러 확인
-   `z-index: 0` 설정이 올바른지 확인

### 폰트가 적용되지 않는 경우

-   CDN 링크가 차단되지 않았는지 확인
-   네트워크 탭에서 폰트 파일 다운로드 확인
-   폰트가 로드되기 전에 텍스트가 표시되는 경우 `font-display: swap` 설정 확인
