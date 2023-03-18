import { Typography } from "@mui/material";

export interface PredictionProps {
  letter: string;
}

export const Prediction: React.FC<PredictionProps> = ({ letter }) => (
  <Typography
    variant="h2"
    align="center"
    sx={{
      fontFamily: "monospace",
      fontWeight: 400,
    }}
  >
    {letter}
  </Typography>
);
