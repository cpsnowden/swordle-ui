import { Stack, Typography } from "@mui/material";

export interface CountdownFeedbackProps {
  remainingTime: number;
}

export const CountdownFeedback: React.FC<CountdownFeedbackProps> = ({
  remainingTime,
}) => (
  <Stack spacing={1} alignItems="center">
    <Typography
      variant="h6"
      align="center"
      sx={{
        fontFamily: "monospace",
      }}
    >
      Taking photo in
    </Typography>
    <Typography
      variant="h3"
      align="center"
      sx={{
        fontFamily: "monospace",
      }}
    >
      {remainingTime}
    </Typography>
  </Stack>
);
