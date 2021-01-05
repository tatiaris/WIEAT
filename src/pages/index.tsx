import React, { useEffect } from "react";
import { Mheader } from "../components/Mheader";
import { Mnavbar } from "../components/Mnavbar/";
import { MFooter } from "../components/MFooter";
import { Row, Col, Image, Button } from "react-bootstrap";
import Prism from 'prismjs';
import "prismjs/themes/prism-okaidia.css"

const Home = (): React.ReactNode => {
  useEffect(() => {
    if (document) Prism.highlightAll()
  }, [])
  return (
    <>
        <Mheader title={"Home"}/>
        <Mnavbar theme={"dark"} page="Home"/>
        <Row className="hp-banner justify-content-md-center">
          <Col style={{ display: "flex", alignItems: "center" }}>
            <span>
              <h1 style={{ fontSize: "4em" }}>WIEAT</h1>
              <h3>Web-based Interactive Episode Analysis Tool</h3>
            </span>
          </Col>
          <Col>
            <Image width="600" height="400" style={{ objectFit: "cover", borderRadius: "10px", minWidth: "25vw", maxWidth: "100%" }} src="/img/interaction-img-1.jpg" alt="interaction-img-1"/>
          </Col>
        </Row>
        <Row className="hp-entry-section justify-content-md-center">
          <Col sm="6">
            <pre style={{ margin: "0", borderRadius: "10px" }}>
              <code id="code-container" className="language-js">
                {`fetch('https://wieat.vercel.app/api/interactions', {
  method: 'post',
  body: JSON.stringify({
    start_time: "21:04:24",
    end_time: "21:05:11",
    duration: 47,
    initiator: "USR",
    receiver: "DEV",
    technology: "IT",
    conversation: "\\"How do you add an interaction?\\" \\"You can send a post request like this to add an interaction!\\"",
    sub_episode: "Adding interactions",
    episode: "WIEAT Tour"
  })
})`}
              </code>
            </pre>
          </Col>
          <Col sm="6">
            <h1 style={{ fontSize: "3em" }}>Data Entry</h1>
            <h3>Add interactions to the database in multiple ways</h3>
            <ul style={{ fontSize: "1.5em" }}>
              <li>Use a POST request (JS example on the left)</li>
              <li>Manually add an interaction through our <a href="/entry">data entry</a> page</li>
              <li>Correct any typos from an episode using the <a href="/update">update</a> functionality</li>
              <li>Instantly visualize and analyze your data</li>
            </ul>
            <Button style={{ fontSize: "1.5em" }} href="/entry" variant="outline-success">Add data &rarr;</Button>
          </Col>
        </Row>
        <Row className="hp-visualize-section justify-content-md-center">
          <Col sm="6">
            <h1 style={{ fontSize: "3em" }}>Episode Visualization</h1>
            <h3>Visualize interactions in an intuitive format</h3>
            <ul style={{ fontSize: "1.5em" }}>
              <li>Provide the episode name or a raw data file to visualize the episode automatically</li>
              <li>Better identify roles by customizing their colors</li>
              <li>Export the generated poster into a PDF document with a single click</li>
            </ul>
            <Button style={{ fontSize: "1.5em" }} href="/visualize" variant="outline-success">Visualize data &rarr;</Button>
          </Col>
          <Col sm="6">
            <Image width="600" height="400" style={{ objectFit: "cover", borderRadius: "10px", minWidth: "25vw", maxWidth: "100%" }} src="/img/visualize-img-1.png" alt="visualize-img-1"/>
          </Col>
        </Row>
        <Row className="hp-entry-section justify-content-md-center">
          <Col sm="6">
            <Image width="600" height="400" style={{ objectFit: "cover", borderRadius: "10px", minWidth: "25vw", maxWidth: "100%" }} src="/img/analyze-img-1.png" alt="analyze-img-1"/>
          </Col>
          <Col sm="6">
            <h1 style={{ fontSize: "3em" }}>Episode Analysis</h1>
            <h3>Analyze the interactions from an episode</h3>
            <ul style={{ fontSize: "1.5em" }}>
              <li>Provide the episode name to generate its analytics dashboard automatically</li>
              <li>Get analytics such as Interaction Frequency, SIIL, Diversity Index, I-I Ratio, and more</li>
              <li>Download analytic charts as images for external use</li>
            </ul>
            <Button style={{ fontSize: "1.5em" }} href="/analyze" variant="outline-success">Analyze data &rarr;</Button>
          </Col>
        </Row>
        <MFooter/>
    </>
  );
};

export default Home;
