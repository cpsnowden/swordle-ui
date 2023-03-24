import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

export interface BaseDialogProps {
  title: string;
  closeText: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BaseDialog: FC<BaseDialogProps> = ({
  title,
  isOpen,
  closeText,
  onClose,
  children,
}) => (
  <Dialog open={isOpen} fullWidth maxWidth="sm" onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={onClose}>{closeText}</Button>
    </DialogActions>
  </Dialog>
);
