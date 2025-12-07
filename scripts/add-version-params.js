import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const indexPath = join(distPath, 'index.html');

try {
  let html = readFileSync(indexPath, 'utf-8');
  
  // CSS 파일에 버전 파라미터 추가
  html = html.replace(
    /href="([^"]*\.css)"/g,
    (match, url) => {
      if (!url.includes('?')) {
        return match.replace(url, `${url}?v=2`);
      }
      return match;
    }
  );
  
  // JS 파일에 버전 파라미터 추가
  html = html.replace(
    /src="([^"]*\.js)"/g,
    (match, url) => {
      if (!url.includes('?')) {
        return match.replace(url, `${url}?v=2`);
      }
      return match;
    }
  );
  
  // 모듈 타입 스크립트에도 적용
  html = html.replace(
    /src="([^"]*\.js)" type="module"/g,
    (match, url) => {
      if (!url.includes('?')) {
        return match.replace(url, `${url}?v=2`);
      }
      return match;
    }
  );
  
  writeFileSync(indexPath, html, 'utf-8');
  console.log('✅ Version parameters added to assets');
} catch (error) {
  console.error('❌ Error adding version parameters:', error.message);
  process.exit(1);
}
