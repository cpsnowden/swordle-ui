import { Container } from "@mui/material";
import AppFooter from "layouts/Footer";
import Header from "layouts/Header";
import { pages } from "pages";
import { useState } from "react";


export const App = () => {
  const [selectedPageIndex, setSelectedPage] = useState(2);
  // TODO use react-router
  const page = pages[selectedPageIndex]

  return (<>
    <Header />
      <Container className="mt-3 mb-3">
        {page.element}
      </Container>
    <AppFooter pages={pages} selectedPageIndex={selectedPageIndex} onSelectPage={setSelectedPage}/>
  </>)
};
