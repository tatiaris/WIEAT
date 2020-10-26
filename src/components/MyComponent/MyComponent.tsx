import React from "react";
import { useState, useEffect } from "react";
import * as UI from "./style";
import { MyComponentProps } from "../interfaces";
import PropTypes from "prop-types";

export const MyComponent: React.FC<MyComponentProps> = ({ info }) => {
  const [clicked, setClicked] = useState(0);

  const handleClick = () => {
    setClicked(clicked + 1);
  };

  useEffect(() => {
    console.log("btn clicked", clicked);
  }, [clicked]);


  return (
    <>
      <UI.MyComponentTitle>
        My Component is called {info.name}
      </UI.MyComponentTitle>
      <button onClick={handleClick}>{clicked}</button>
    </>
  );

};

MyComponent.propTypes = {
  info: PropTypes.any.isRequired,
};
