import React from "react";
import { Col, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Col xs={10} className="mx-auto">
      <Nav className="justify-content-around">
        <Nav.Item>
          <Nav.Link className="nav-link text-secondary mainLinks" href="/trending">
            TRENDING
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-link text-secondary mainLinks" href="/podcasts">
            PODCAST
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-link text-secondary mainLinks" href="/moodsAndGenres">
            MOODS AND GENRES
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-link text-secondary mainLinks" href="/newReleases">
            NEW RELEASES
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-link text-secondary mainLinks" href="/discover">
            DISCOVER
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  );
};

export default NavBar;
