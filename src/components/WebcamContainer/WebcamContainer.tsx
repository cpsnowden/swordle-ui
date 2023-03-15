// import { Box } from "@mui/material";
import { forwardRef } from "react";
import Webcam from "react-webcam";
import AutoSizer from "react-virtualized-auto-sizer";
import { useDebounce } from "usehooks-ts";
// import { videoConstraints } from "services/params";

const ResizableWebcamContainer = forwardRef<Webcam, { width: number }>(
  ({ width }, ref) => {
    const debounceWidth = useDebounce<number>(width, 1000);
    return (
      <Webcam
        audio={false}
        style={{
          borderRadius: `5px 5px 5px 5px`,
        }}
        videoConstraints={{
          width: debounceWidth,
          facingMode: "user",
        }}
        width={debounceWidth}
        height={(debounceWidth * 9) / 16}
        ref={ref}
      />
    );
  }
);

export const WebcamContainer = forwardRef<Webcam>((_, ref) => {
  return (
    <AutoSizer disableHeight={true}>
      {({ width }) => <ResizableWebcamContainer ref={ref} width={width} />}
    </AutoSizer>
  );
});
