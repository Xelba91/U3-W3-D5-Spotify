import React, { useState } from "react";
import MusicSection from "./MusicSection";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";
import MusicPlayer from "./MusicPlayer";
import NavBar from "./NavBar";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchResults(true);
  };

  return (
    <Container>
      <Row>
        <SideBar setSearchQuery={handleSearch} />
        <Col xs={10} className="mainPage">
          <Container>
            <Row>
              <NavBar />
              {showSearchResults && <MusicSection genre={searchQuery} />}
              <MusicSection genre="Michele Zarrillo" />
              <MusicSection genre="Laura Pausini" />
              <MusicSection genre="Riccardo Fogli" />
              <MusicSection genre="Lunapop" />
              <div style={{ marginTop: "100px" }}></div>
              <MusicPlayer />
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
