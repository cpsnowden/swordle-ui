import { Box } from "@mui/material";
import { forwardRef } from "react";
import Webcam from "react-webcam";
// import { videoConstraints } from "services/params";

export const WebcamContainer = forwardRef<Webcam>((_, ref) => {
  const width = 200;
  return (
    <Box
      justifyContent="center"
      display="flex"
      // Hack get this from theme
      bgcolor="#ffffe117"
    >
      <Webcam
        audio={false}
        style={{
          borderRadius: `5px 5px 5px 5px`,
        }}
        videoConstraints={{
          width: width,
          facingMode: "user",
        }}
        width={width}
        height={(width * 9) / 16}
        ref={ref}
      />
    </Box>
  );
});
