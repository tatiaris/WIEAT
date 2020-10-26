import React from "react";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";

const Contact = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"Contact"}></Mheader>
        <Mnavbar theme={"light"}></Mnavbar>
        Contact Us
    </>
  );
};

export default Contact;