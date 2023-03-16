import { forwardRef } from "react";
import Webcam from "react-webcam";
import AutoSizer from "react-virtualized-auto-sizer";
import { useDebounce } from "usehooks-ts";
import { Paper } from "@mui/material";
import { useReadPreferences } from "components/UserPreferences/UserPreferences";
// import { videoConstraints } from "services/params";

const ResizableWebcamContainer = forwardRef<Webcam, { width: number }>(
  ({ width }, ref) => {
    const debounceWidth = useDebounce<number>(width, 1000);
    const preferences = useReadPreferences();
    return (
      <Paper elevation={3} sx={{ color: "primary.dark" }}>
        <Webcam
          audio={false}
          style={{
            borderRadius: `5px 5px 5px 5px`,
          }}
          videoConstraints={{
            width: { ideal: debounceWidth },
            facingMode: "user",
            aspectRatio: 16 / 9,
          }}
          width={debounceWidth}
          height={(debounceWidth * 9) / 16}
          ref={ref}
          mirrored={preferences.mirrorWebcam}
        />
      </Paper>
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
