import { Container, Stack } from "@mui/material";
import { PageLayout } from "components/page-layout";
import { GameCard } from "features/games/common";
import { games } from "features/games";

export const AboutPage = () => (
  <PageLayout>
    <Container maxWidth="sm">
      <Stack spacing={2}>
        {games.map((game, index) => (
          <GameCard
            key={index}
            name={game.name}
            tagLine={game.tagLine}
            path={game.path}
          />
        ))}
      </Stack>
    </Container>
  </PageLayout>
);
