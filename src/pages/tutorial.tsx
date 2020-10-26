import React from "react";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";

const Tutorial = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"Tutorial"}></Mheader>
        <Mnavbar theme={"dark"}></Mnavbar>
        How to use WIEAT
    </>
  );
};

export default Tutorial;