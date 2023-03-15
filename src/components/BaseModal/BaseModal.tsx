import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface BaseModalProps {
  title: string;
  isOpen: boolean;
  closeText: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const BaseModal: React.FC<BaseModalProps> = ({
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
