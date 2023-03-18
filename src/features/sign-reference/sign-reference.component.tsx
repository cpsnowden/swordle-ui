import { Backdrop, Box } from "@mui/material";
import { FC } from "react";

interface SignReferenceProps {
  isOpen: boolean;
  onClose: () => void;
}
export const SignReference: FC<SignReferenceProps> = ({ isOpen, onClose }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isOpen}
      onClick={onClose}
    >
      <Box
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          className="short:max-w-xs max-w-lg h-auto"
          src="https://www.researchgate.net/publication/328396430/figure/fig1/AS:683619848830976@1539999081795/The-26-letters-and-10-digits-of-American-Sign-Language-ASL.jpg"
          alt="asl-signs"
        />
      </Box>
    </Backdrop>
  );
};
