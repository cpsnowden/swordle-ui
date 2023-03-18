import { forwardRef } from "react";
import ReactWebcam from "react-webcam";
import AutoSizer from "react-virtualized-auto-sizer";
import { useDebounce } from "usehooks-ts";
import { Paper } from "@mui/material";
import { usePreferences } from "features/preferences";

const ResizableWebcam = forwardRef<
  ReactWebcam,
  { width: number; mirrored: boolean }
>(({ width, mirrored }, ref) => {
  const debounceWidth = useDebounce<number>(width, 1000);
  return (
    // Check why this is not showing up on mobile
    <Paper elevation={3} sx={{ color: "primary.dark" }}>
      <ReactWebcam
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
        // Check this aspect ratio on mobile devices
        height={(debounceWidth * 9) / 16}
        ref={ref}
        mirrored={mirrored}
      />
    </Paper>
  );
});

export const WebcamContainer = forwardRef<ReactWebcam>((_, ref) => {
  const { savedPreferences } = usePreferences();
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <ResizableWebcam
          ref={ref}
          width={width}
          mirrored={savedPreferences.mirrorWebcam}
        />
      )}
    </AutoSizer>
  );
});
