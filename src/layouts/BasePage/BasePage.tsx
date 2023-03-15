import { Container } from "@mui/material";
import Header from "layouts/Header";
import { FC } from "react";

export interface BasePageProps {
  rightHeaderPanel?: React.ReactNode;
  children: React.ReactNode;
}

export const BasePage: FC<BasePageProps> = ({ rightHeaderPanel, children }) => (
  <>
    <Header rightPanel={rightHeaderPanel} />
    <Container className="mt-3 mb-3">{children}</Container>
  </>
);
