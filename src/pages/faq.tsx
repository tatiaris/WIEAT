import React from "react";
import { MFooter } from "../components/MFooter";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";

const Faq = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"FAQ"}/>
        <Mnavbar theme={"dark"}/>
        <MFooter/>
    </>
  );
};

export default Faq;