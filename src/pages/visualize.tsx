import React, { useState } from "react";
import { Mheader } from "../components/Mheader/";
import { Mnavbar } from "../components/Mnavbar/";
import { InputContainer } from "../components/InputContainer"
import { PosterContainer } from "../components/PosterContainer"

const VisualizePage = (): React.ReactNode => {

  const [inpContent, setContent] = useState({});

  const visualize_data = (data) => {
    console.log('visualizing: ', data);
    setContent(data)
  };

  return (
    <>
      <Mheader title={"FAQ"}></Mheader>
      <Mnavbar theme={"dark"}></Mnavbar>
      <InputContainer visualizeFunc={visualize_data}></InputContainer>
      <PosterContainer content={inpContent}></PosterContainer>
    </>
  );
};

export default VisualizePage;
