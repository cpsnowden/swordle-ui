import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { BaseDialog } from "components/base-dialog";
import { FC, ReactNode } from "react";
import WebIcon from "@mui/icons-material/Web";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";

interface GitHubLinkProps {
  name: string;
  description: string;
  icon: ReactNode;
  url: string;
}

const GitHubLink: FC<GitHubLinkProps> = ({ name, description, icon, url }) => (
  <ListItem disablePadding>
    <ListItemButton href={url} target="_blank" rel="noopen noreferer">
      <ListItemAvatar>{icon}</ListItemAvatar>
      <ListItemText primary={name} secondary={description} />
    </ListItemButton>
  </ListItem>
);

export interface GitHubLinksProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubLinks: FC<GitHubLinksProps> = ({ isOpen, onClose }) => (
  <BaseDialog
    title="Github Projects"
    closeText="Close"
    isOpen={isOpen}
    onClose={onClose}
  >
    <List disablePadding>
      <GitHubLink
        name="swordle"
        description="Read about about the project, model development and api"
        icon={<ModelTrainingIcon />}
        url="https://github.com/cpsnowden/swordle"
      />
      <GitHubLink
        name="swordle-ui"
        description="View the code for this UI, built using React!"
        icon={<WebIcon />}
        url="https://github.com/cpsnowden/swordle-ui"
      />
    </List>
  </BaseDialog>
);
