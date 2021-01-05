import React from "react";
import { MnavbarProps } from "../interfaces";
import PropTypes from "prop-types";
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from "react-bootstrap";

/**
 * Mnavbar component
 */
export const Mnavbar: React.FC<MnavbarProps> = (props) => {
  let pageType = {
    About: "",
    Tutorial: "",
    FAQ: "",
    Contact: "",
    Entry: "",
    Update: "",
    Visualize: "",
    Analyze: ""
  }

  if (props.page in pageType) pageType[props.page] = "nav-current-page";

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg={props.theme} variant={props.theme} sticky="top">
        <Navbar.Brand href="/">WIEAT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about" className={pageType['About']}>About</Nav.Link>
            <Nav.Link href="/tutorial" className={pageType['Tutorial']}>Tutorial</Nav.Link>
            <Nav.Link href="/faq" className={pageType['FAQ']}>FAQ</Nav.Link>
            <Nav.Link href="/contact" className={pageType['Contact']}>Contact</Nav.Link>
          </Nav>
          <NavDropdown.Divider />
          <Nav>
            <Nav.Link href="/entry" className={pageType['Entry']}>Entry</Nav.Link>
            <Nav.Link href="/update" className={pageType['Update']}>Update</Nav.Link>
            <Nav.Link href="/visualize" className={pageType['Visualize']}>Visualize</Nav.Link>
            <Nav.Link href="/analyze" className={pageType['Analyze']}>Analyze</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

Mnavbar.propTypes = {
  theme: PropTypes.any.isRequired,
  page: PropTypes.string.isRequired
};
