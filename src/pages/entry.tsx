import React from "react";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";

const EntryPage = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"FAQ"}></Mheader>
        <Mnavbar theme={"light"}></Mnavbar>
        WIEAT Entry
    </>
  );
};

export default EntryPage;