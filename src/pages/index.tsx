import React from "react";
import { Mheader } from "../components/Mheader";
import { Mnavbar } from "../components/Mnavbar/";

const Home = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"Home"}></Mheader>
        <Mnavbar theme={"light"}></Mnavbar>
        Home Page
    </>
  );
};

export default Home;
