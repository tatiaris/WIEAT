import React, { useState } from "react";
import { Mheader } from "../components/Mheader/";
import { Mnavbar } from "../components/Mnavbar/";
import { InputContainer } from "../components/InputContainer";
import { PosterContainer } from "../components/PosterContainer";

interface colorDict {
  colors: any;
}

const VisualizePage = (): React.ReactNode => {
  const [inpContent, setContent] = useState({});

  const visualize_data = (data) => {
    console.log("visualizing: ", data);
    setContent(data);
    handleColorChange("Field Observer (FOB)", "#502000");
  };

  const generateColorDict = (data) => {
    return {
      colors: {
        "Field Observer (FOB)": "#a396a5",
        Inst2: "#90a2b8",
        "I&IL": "#ebd967",
        SITL: "#7fffd4",
        "I&I2": "#e3a376",
      },
    };
  };

  const [participantColors, setParticipantColors] = useState<colorDict | null>(
    generateColorDict({})
  );
  const [copyParticipantColors, setCopyParticipantColors] = useState<colorDict | null>(
    generateColorDict({})
  );

  const handleColorChange = (clabel, newColor) => {
    console.log("updating", clabel, "to", newColor);
    let newParticipantColors = {colors: {}};
    for (let p in participantColors.colors) {
      if (p == clabel) {
        newParticipantColors.colors[p] = newColor;
      } else {
        newParticipantColors.colors[p] = participantColors.colors[p];
      }
    }
    console.log("new colors", newParticipantColors);
    setParticipantColors(newParticipantColors);
  };

  return (
    <>
      <Mheader title={"FAQ"}></Mheader>
      <Mnavbar theme={"dark"}></Mnavbar>
      <InputContainer
        colorUpdateFunc={handleColorChange}
        colorDict={copyParticipantColors}
        visualizeFunc={visualize_data}
      ></InputContainer>
      <PosterContainer
        colorDict={participantColors}
        content={inpContent}
      ></PosterContainer>
    </>
  );
};

export default VisualizePage;
