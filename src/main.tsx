import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 1. 引入你写在 utils 文件夹里的动画脚本
import { initDynamicFavicon } from './utils/dynamicFavicon';

// 2. 执行动画函数
initDynamicFavicon();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
