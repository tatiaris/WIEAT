import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

/**
 * Footer component
 */
export const MFooter: React.FC = () => {
  return (
    <>
      <footer style={{ color: "white", marginTop: "1em" }}>
        <Container fluid style={{ padding: "2em 1em", background: "#343a40" }}>
          <Row className="justify-content-md-center">
            <Col sm="2">
              <span style={{ fontSize: "2em", fontWeight: "bold" }}>WIEAT</span>
              <br/>
              <span>&copy; 2020-2021</span>
            </Col>
            <Col sm="6">
              <Table variant={"dark"} size="sm" borderless>
                <thead>
                  <tr style={{ fontSize: "1.2em" }}>
                    <th>Explore</th>
                    <th>Features</th>
                    <th>Contact Us</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><a href="/about">About</a></td>
                    <td><a href="/entry">Entry</a></td>
                    <td><a href="mailto:cson@tamu.edu">Changwon Son</a></td>
                  </tr>
                  <tr>
                    <td><a href="/tutorial">Tutorial</a></td>
                    <td><a href="/visualize">Visualize</a></td>
                    <td><a href="mailto:tatiaris@tamu.edu">Rishabh Tatia</a></td>
                  </tr>
                  <tr>
                    <td><a href="/faq">FAQ</a></td>
                    <td><a href="/analyze">Analyze</a></td>
                    <td><a href="https://acelab.tamu.edu/contact-us/">ACELAB</a></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};