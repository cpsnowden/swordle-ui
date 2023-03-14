import { forwardRef } from "react";
import Webcam from "react-webcam";
import { videoConstraints } from "services/params";

export const WebcamContainer = forwardRef<Webcam>((_, ref) => (
  <Webcam audio={false} videoConstraints={videoConstraints} ref={ref} />
));
