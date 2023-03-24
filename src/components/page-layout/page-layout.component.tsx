import { Container } from "@mui/material";
import { SignReference } from "features/sign-reference";
import { PreferencesDialog } from "features/preferences";
import { NavMenu } from "components/nav-menu";
import { Header } from "components/header";
import { FC } from "react";
import { useBoolean } from "usehooks-ts";
import { AlertContainer } from "features/alerts";
import { GithubLinks } from "features/github-links";

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
    value: isSignReferenceOpen,
    setTrue: openHandReference,
    setFalse: closeSignReference,
  } = useBoolean(false);
  const {
    value: isPreferencesOpen,
    setTrue: openPeferences,
    setFalse: closePreferences,
  } = useBoolean(false);
  const {
    value: isGitHubLinksOpen,
    setTrue: openGitHubLinks,
    setFalse: closeGitHubLinks,
  } = useBoolean(false);
  return (
    <>
      <Header rightPanel={rightHeaderPanel} onAppMenuClick={openAppMenu} />
      <Container className="mt-3 mb-3">
        <AlertContainer />
        {children}
      </Container>
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
        onGitHubLinksClick={() => {
          closeAppMenu();
          openGitHubLinks();
        }}
      />
      <SignReference
        isOpen={isSignReferenceOpen}
        onClose={closeSignReference}
      />
      <PreferencesDialog
        isOpen={isPreferencesOpen}
        onClose={closePreferences}
      />
      <GithubLinks isOpen={isGitHubLinksOpen} onClose={closeGitHubLinks} />
    </>
  );
};
