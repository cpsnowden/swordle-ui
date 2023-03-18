import { Container } from "@mui/material";
import HandReferenceOverlay from "components/HandReferenceOverlay";
import PreferencesForm from "components/UserPreferences";
import AppMenu from "components/AppMenu";
import Header from "layout/Header";
import { FC } from "react";
import { useBoolean } from "usehooks-ts";

export interface BaseLayoutProps {
  rightHeaderPanel?: React.ReactNode;
  children: React.ReactNode;
}

export const BaseLayout: FC<BaseLayoutProps> = ({
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
      <AppMenu
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
      <PreferencesForm isOpen={isPreferencesOpen} onClose={closePreferences} />
    </>
  );
};
