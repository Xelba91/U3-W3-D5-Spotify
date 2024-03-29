import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HouseDoorFill, BookFill } from "react-bootstrap-icons";
import { fetchSongs } from "../redux//reducers/SongsSlice";
import { Col, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function SideBar({ setSearchQuery }) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      dispatch(fetchSongs(searchTerm));

      setSearchQuery(searchTerm);

      setSearchTerm("");
    }
  };

  return (
    <Col md={2}>
      <Navbar collapseOnSelect expand="md" variant="dark" className="fixed-left" id="sidebar">
        <Navbar.Brand href="/">
          <img src="/assets/img/logo/logo.png" alt="Spotify Logo" width="131" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="align-items-baseline">
          <Nav className="flex-column mx-2">
            <NavLink to="/" className="nav-link">
              <HouseDoorFill className="" style={{ fontSize: "24px" }} /> Home
            </NavLink>
            <NavLink to="/library" className="nav-link">
              <BookFill style={{ fontSize: "24px" }} /> Your Library
            </NavLink>
            <Form className="mt-4 d-flex" onSubmit={handleSearch}>
              <div className="flex-grow-1">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2 d-inline np-rounded-right"
                  id="searchField"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" variant="outline-secondary btn-sm no-rounded-left" className="input-group-append">
                GO
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
        <div className="nav-btn">
          <Button variant="outline-primary" className="signup-btn">
            Sign Up
          </Button>
          <Button variant="outline-secondary" className="login-btn">
            Login
          </Button>
          <Nav.Link href="#" className="nav-link">
            Cookie Policy
          </Nav.Link>
          <Nav.Link href="#" className="nav-link">
            Privacy
          </Nav.Link>
        </div>
      </Navbar>
    </Col>
  );
}

export default SideBar;
