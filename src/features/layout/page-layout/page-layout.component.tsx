import { Container } from "@mui/material";
import HandReferenceOverlay from "components/HandReferenceOverlay";
import { PreferencesDialog } from "features/preferences";
import NavMenu from "features/layout/nav-menu";
import { Header } from "features/layout/header";
import { FC } from "react";
import { useBoolean } from "usehooks-ts";

export interface PageLayoutProps {
  rightHeaderPanel?: React.ReactNode;
  children: React.ReactNode;
}

export const PageLayout: FC<PageLayoutProps> = ({
  rightHeaderPanel,
  children,
}) => {
  const {
    value: isMenuOpen,
    setTrue: openAppMenu,
    setFalse: closeAppMenu,
  } = useBoolean(false);
  const {
    value: isHandReferenceOpen,
    setTrue: openHandReference,
    setFalse: closeHandReference,
  } = useBoolean(false);
  const {
    value: isPreferencesOpen,
    setTrue: openPeferences,
    setFalse: closePreferences,
  } = useBoolean(false);
  return (
    <>
      <Header rightPanel={rightHeaderPanel} onAppMenuClick={openAppMenu} />
      <Container className="mt-3 mb-3">{children}</Container>
      <NavMenu
        isOpen={isMenuOpen}
        onClose={closeAppMenu}
        onHandReferenceClick={() => {
          closeAppMenu();
          openHandReference();
        }}
        onPreferenceClick={() => {
          closeAppMenu();
          openPeferences();
        }}
      />
      <HandReferenceOverlay
        isOpen={isHandReferenceOpen}
        onClose={closeHandReference}
      />
      <PreferencesDialog
        isOpen={isPreferencesOpen}
        onClose={closePreferences}
      />
    </>
  );
};
