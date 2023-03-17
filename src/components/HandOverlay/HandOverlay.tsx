import { Backdrop, Box } from "@mui/material";
import { FC } from "react";
interface HandOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}
export const HandOverlay: FC<HandOverlayProps> = ({ isOpen, onClose }) => {
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
          className="short:max-w-xs max-w-md h-auto"
          src="https://www.researchgate.net/profile/Sergio-Benini/publication/259921409/figure/fig1/AS:614251592949760@1523460400036/ASL-finger-spelling-alphabet-reproduced-from-3.png"
          alt="asl-signs"
        />
      </Box>
    </Backdrop>
  );
};
