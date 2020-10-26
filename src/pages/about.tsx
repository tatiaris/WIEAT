import React from "react";
import { Mheader } from "../components/Mheader/";
import { Mnavbar } from "../components/Mnavbar/";

const About = (): React.ReactNode => {
  return (
    <>
      <Mheader title={"About"}></Mheader>
      <Mnavbar theme={"light"}></Mnavbar>
      <p>About WIEAT</p>
    </>
  );
};

export default About;
