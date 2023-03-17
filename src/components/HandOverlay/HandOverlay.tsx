import { Backdrop, Box, Fab } from "@mui/material";
import { FC, useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

interface HandOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}
const HandOverlay: FC<HandOverlayProps> = ({ isOpen, onClose }) => {
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
          className="max-w-sm h-auto"
          src="https://www.researchgate.net/profile/Sergio-Benini/publication/259921409/figure/fig1/AS:614251592949760@1523460400036/ASL-finger-spelling-alphabet-reproduced-from-3.png"
          alt="asl-signs"
        />
      </Box>
    </Backdrop>
  );
};

export const HandOverlayHelp = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Fab size="large" variant="extended" onClick={() => setOpen(true)}>
        <QuestionMarkIcon />
      </Fab>
      <HandOverlay isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};
