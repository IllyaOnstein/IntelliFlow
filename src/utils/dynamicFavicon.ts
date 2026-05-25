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
  link.type = 'image/png'; // 使用 Canvas 导出的 Base64 PNG 兼容性最好

  // 2. 创建离屏 Canvas
  const canvas = document.createElement('canvas');
  canvas.width = 32;  // Favicon 标准尺寸
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 3. 完美还原你 SVG 中的心电图轨迹坐标 (等比例缩放到 32x32)
  const points = [
    { x: 3.2,  y: 16 },
    { x: 8.96, y: 16 },
    { x: 12.16,y: 3.84 },
    { x: 19.84,y: 28.16 },
    { x: 23.04,y: 16 },
    { x: 28.8, y: 16 }
  ];

  let progress = 0; // 动画进度 (0 到 1)

  function draw() {
    ctx.clearRect(0, 0, 32, 32);

    // 设置画笔样式 (匹配你的原图深红色)
    ctx.strokeStyle = '#7c0404';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    
    // 根据当前进度，计算应该绘制到哪一段
    if (points.length > 0) {
      ctx.moveTo(points[0].x, points[0].y);
      
      // 模拟 stroke-dashoffset 的绘制效果
      const totalSegments = points.length - 1;
      const currentTargetIndex = progress * totalSegments;
      
      for (let i = 1; i < points.length; i++) {
        if (i <= currentTargetIndex) {
          // 已完整通过的点，直接连线
          ctx.lineTo(points[i].x, points[i].y);
        } else if (i - 1 < currentTargetIndex) {
          // 当前正在绘制的线段，按比例插值
          const segmentProgress = currentTargetIndex - (i - 1);
          const prev = points[i - 1];
          const curr = points[i];
          const currX = prev.x + (curr.x - prev.x) * segmentProgress;
          const currY = prev.y + (curr.y - prev.y) * segmentProgress;
          ctx.lineTo(currX, currY);
          break;
        }
      }
    }
    ctx.stroke();

    // 更新 Favicon 的 href 属性
    link!.href = canvas.toDataURL('image/png');

    // 调整动画速度 (0.008 大约对应 4秒一循环，可根据喜好调整)
    progress += 0.008;
    if (progress > 1) {
      progress = 0; // 循环播放
    }

    requestAnimationFrame(draw);
  }

  // 启动动画
  draw();
}
