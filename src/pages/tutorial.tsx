import React from "react";
import { MFooter } from "../components/MFooter";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";

const Tutorial = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"Tutorial"}/>
        <Mnavbar theme={"dark"} page="Tutorial"/>
        <MFooter/>
    </>
  );
};

export default Tutorial;