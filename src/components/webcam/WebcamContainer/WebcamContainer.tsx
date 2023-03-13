import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useCallback } from "react"
import Webcam from "react-webcam"

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export interface WebcamContainerProps {
}

export const WebcamContainer: React.FC<WebcamContainerProps> = ({ }) => {
  const [img, setImg] = useState<string | null>(null);
  const videoRef = useRef<Webcam | null>(null)

  const captureFrame = useCallback(() => {
    if (videoRef.current) {
      const imageSrc = videoRef.current.getScreenshot();
      setImg(imageSrc);
    }
  }, [videoRef]);

  return (
    <div className="video-container">
      {
        img === null ? (
          // TODO check sizing and responsi
          <Webcam audio={false} videoConstraints={videoConstraints} ref={videoRef} />
        ) : (
          <img src={img} />
        )
      }
      <Button variant="contained" onClick={captureFrame} size="large">Capture</Button>
    </div>
  )
}
