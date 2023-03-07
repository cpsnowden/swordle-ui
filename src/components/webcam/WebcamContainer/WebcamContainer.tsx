import React from "react";
import { useCallback, useEffect } from "react"
import Webcam from "react-webcam"

const videoConstraints = {
  facingMode: "user"
};

export interface WebcamContainerProps {
  fps: number;
  enableCapture: boolean;
  onFrameCapture: (frame: string) => void;
}

export const WebcamContainer: React.FC<WebcamContainerProps> = ({
    onFrameCapture,
    enableCapture,
    fps
  }) => {
  const videoRef = React.useRef<null | Webcam>(null)

  const captureFrame = useCallback(() => {
    if (videoRef.current) {
      const imageSrc = videoRef.current.getScreenshot();
      if (imageSrc) {
        onFrameCapture(imageSrc);
      }
    }
  }, [videoRef, onFrameCapture]);

  useEffect(() => {
    if (enableCapture) {
      const timer = setInterval(() => {
            captureFrame()
        }, 1000 / fps);
      return () => clearInterval(timer);
    }
  }, [enableCapture, fps, captureFrame])

  return (
    <div className="video-container">
        <Webcam videoConstraints={videoConstraints} ref={(el) => {
          videoRef.current = el;
        }}/>
    </div>
  )
}
