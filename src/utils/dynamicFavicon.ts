// src/utils/dynamicFavicon.ts

export function initDynamicFavicon() {
  if (typeof window === 'undefined') return;

  // 1. 获取或创建头部的 link 标签
  let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/png';

  // 2. 创建离屏 Canvas
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 3. 完美缩放的心电图轨迹坐标
  const points = [
    { x: 3.2,  y: 16 },
    { x: 8.96, y: 16 },
    { x: 12.16,y: 3.84 },
    { x: 19.84,y: 28.16 },
    { x: 23.04,y: 16 },
    { x: 28.8, y: 16 }
  ];

  let progress = 0;
  let lastFrameTime = 0;
  const fps = 30; // 限制帧率为 30fps，既丝滑又能极大地减轻浏览器刷新负担
  const frameInterval = 1000 / fps;

  function draw(currentTime: number) {
    requestAnimationFrame(draw);

    // 节流控制：如果两次渲染时间间隔太短，就跳过这一帧
    if (currentTime - lastFrameTime < frameInterval) {
      return;
    }
    lastFrameTime = currentTime;

    ctx!.clearRect(0, 0, 32, 32);

    // 设置画笔样式
    ctx!.strokeStyle = '#7c0404';
    ctx!.lineWidth = 2.5;
    ctx!.lineCap = 'round';
    ctx!.lineJoin = 'round';

    ctx!.beginPath();
    
    if (points.length > 0) {
      ctx!.moveTo(points[0].x, points[0].y);
      
      const totalSegments = points.length - 1;
      const currentTargetIndex = progress * totalSegments;
      
      for (let i = 1; i < points.length; i++) {
        if (i <= currentTargetIndex) {
          ctx!.lineTo(points[i].x, points[i].y);
        } else if (i - 1 < currentTargetIndex) {
          const segmentProgress = currentTargetIndex - (i - 1);
          const prev = points[i - 1];
          const curr = points[i];
          const currX = prev.x + (curr.x - prev.x) * segmentProgress;
          const currY = prev.y + (curr.y - prev.y) * segmentProgress;
          ctx!.lineTo(currX, currY);
          break;
        }
      }
    }
    ctx!.stroke();

    // 更新图标
    link!.href = canvas.toDataURL('image/png');

    // 【速度优化】：将步长从 0.008 提升到 0.035，心电图跳动速度明显变快
    progress += 0.035;
    if (progress > 1) {
      progress = 0; // 循环
    }
  }

  // 启动动画
  requestAnimationFrame(draw);
}
