import { Stack, Typography } from "@mui/material";

export interface NoHandProps {
  remainingTime: number;
}

export const NoHand: React.FC<NoHandProps> = ({ remainingTime }) => {
  return (
    <Stack spacing={0} alignItems="center">
      <div className="text-4xl">🤔</div>
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: "monospace",
        }}
      >
        No hand found...
        <br />
        Try again in {remainingTime}
      </Typography>
    </Stack>
  );
};
