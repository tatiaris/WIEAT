import React from "react";
import { Mheader } from "../components/Mheader";
import { Mnavbar } from "../components/Mnavbar/";
import { MFooter } from "../components/MFooter";

const Home = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"Home"}/>
        <Mnavbar theme={"dark"}/>
        <MFooter/>
    </>
  );
};

export default Home;
