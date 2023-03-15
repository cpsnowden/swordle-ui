import { forwardRef } from "react";
import Webcam from "react-webcam";
import { videoConstraints } from "services/params";

export const WebcamContainer = forwardRef<Webcam>((_, ref) => {
  const width = 200;
  return (
    <Webcam
      audio={false}
      style={{
        borderRadius: `30px 30px 30px 30px`,
      }}
      videoConstraints={videoConstraints}
      width={width}
      height={(width * 9) / 16}
      ref={ref}
    />
  );
});
