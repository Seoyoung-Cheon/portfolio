@echo off
chcp 65001 >nul
echo ========================================
echo GitHub에 포트폴리오 푸시 중...
echo ========================================
echo.

echo [1/6] Git 저장소 초기화...
git init
if %errorlevel% neq 0 (
    echo 이미 초기화되어 있습니다.
)
echo.

echo [2/6] 파일 추가 중...
git add .
echo 파일 추가 완료
echo.

echo [3/6] 커밋 중...
git commit -m "Initial commit: Portfolio website"
if %errorlevel% neq 0 (
    echo 변경사항이 없거나 이미 커밋되었습니다.
)
echo.

echo [4/6] 브랜치를 main으로 설정...
git branch -M main
echo.

echo [5/6] 원격 저장소 연결...
git remote remove origin 2>nul
git remote add origin https://github.com/Seoyoung-Cheon/portfolio.git
echo 원격 저장소 연결 완료
echo.

echo [6/6] GitHub에 푸시 중...
echo (인증이 필요할 수 있습니다)
git push -u origin main
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo 성공! GitHub에 푸시되었습니다!
    echo https://github.com/Seoyoung-Cheon/portfolio
    echo ========================================
) else (
    echo ========================================
    echo 푸시 실패. 인증이 필요할 수 있습니다.
    echo GitHub 사용자명과 Personal Access Token을 입력하세요.
    echo ========================================
)

pause





