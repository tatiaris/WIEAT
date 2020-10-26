import React from "react";
import {
  StyledInteractionPart,
  Bracket,
  BracketArrow,
  BracketLabel,
  PartLabel,
  InteractionsContainer
} from "./style";
import { InteractionPartProps } from "../../interfaces";
import PropTypes from "prop-types";
import { Interaction } from "../Interaction";

/**
 * Inputs Container component
 */
export const InteractionPart: React.FC<InteractionPartProps> = (props) => {
  console.log('interactions', props.interactions);

  let interactionElements = <></>;

  if (props.interactions == undefined) {
    console.log("no interactions");
  } else {
    interactionElements = props.interactions.interactions.map((interaction_details, i) => (
      <Interaction
        key={"interaction-" + i.toString()}
        details={interaction_details}
      ></Interaction>
    ));
  }

  return (
    <StyledInteractionPart>
      <InteractionsContainer>
      {interactionElements}
      </InteractionsContainer>
      <BracketLabel>
        <Bracket></Bracket>
        <BracketArrow></BracketArrow>
        <PartLabel>{props.interactions.label}</PartLabel>
      </BracketLabel>
    </StyledInteractionPart>
  );
};

InteractionPart.propTypes = {
  interactions: PropTypes.any,
};
