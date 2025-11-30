@echo off
echo Initializing Git repository...
git init
echo.
echo Adding all files...
git add .
echo.
echo Committing files...
git commit -m "Initial commit: Portfolio website"
echo.
echo Setting branch to main...
git branch -M main
echo.
echo Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/Seoyoung-Cheon/portfolio.git
echo.
echo Pushing to GitHub...
git push -u origin main
echo.
echo Done! Check https://github.com/Seoyoung-Cheon/portfolio
pause

