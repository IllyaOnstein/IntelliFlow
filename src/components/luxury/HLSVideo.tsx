import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HLSVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function HLSVideo({ src, ...props }: HLSVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    
    if (Hls.isSupported()) {
      hls = new Hls({
        startLevel: -1,
        capLevelToPlayerSize: true,
      });
      
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari which has native HLS support
      video.src = src;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  return <video ref={videoRef} {...props} />;
}
