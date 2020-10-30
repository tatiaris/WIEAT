import React from "react";
import { PosterProps } from "../interfaces";
import PropTypes from "prop-types";
import { StyledPosterContainer } from "./style";
import { Episode } from "../VizComponents/Episode";

/**
 * Poster component
 */
export const PosterContainer: React.FC<PosterProps> = (props) => {
  let episodes = (<></>);

  if (props.content.observations == undefined) {
    console.log("no observations");
  } else {
    episodes = props.content.observations.map((observation, i) => (
      <Episode colorUpdateFunc={props.colorUpdateFunc} colorDict={props.colorDict} key={"episode-" + i.toString()} content={observation}></Episode>
    ));
  }

  return <StyledPosterContainer>{episodes}</StyledPosterContainer>;
};

PosterContainer.propTypes = {
  content: PropTypes.any,
  colorDict: PropTypes.any
};