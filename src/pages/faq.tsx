import React from "react";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";

const Faq = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"FAQ"}></Mheader>
        <Mnavbar theme={"light"}></Mnavbar>
        WIEAT FAQ
    </>
  );
};

export default Faq;