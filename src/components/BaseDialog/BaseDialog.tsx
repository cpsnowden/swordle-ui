import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface BaseDialogProps {
  title: string;
  isOpen: boolean;
  closeText: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const BaseDialog: React.FC<BaseDialogProps> = ({
  title,
  isOpen,
  closeText,
  onClose,
  children,
}) => (
  <Dialog open={isOpen}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={onClose}>{closeText}</Button>
    </DialogActions>
  </Dialog>
);
