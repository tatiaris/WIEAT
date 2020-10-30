import React from "react";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";

const AnalyzePage = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"FAQ"}></Mheader>
        <Mnavbar theme={"dark"}></Mnavbar>
    </>
  );
};

export default AnalyzePage;