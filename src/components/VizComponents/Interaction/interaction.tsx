import React from "react";
import {
  Conversation,
  Initiator,
  Receiver,
  StyledInteraction,
  Technology,
} from "./style";
import { InteractionProps } from "../../interfaces";
import PropTypes from "prop-types";

/**
 * Inputs Container component
 */
export const Interaction: React.FC<InteractionProps> = (props) => {
  let dynamicWidth = {};
  const convo_length = props.details.conversation.length;

  if (convo_length > 50 && convo_length < 300) {
    dynamicWidth = { minWidth: convo_length.toString() + "px" };
  }
  if (convo_length >= 300 || props.details.initiator.length >= 20) {
    dynamicWidth = { width: "250px" };
  }

  let initiatorStyle = { backgroundColor: "#fff" };
  let receiverStyle = { backgroundColor: "#fff" };
  if (props.details.initiator in props.colorDict.colors) {
    initiatorStyle = { backgroundColor: props.colorDict.colors[props.details.initiator] };
  }
  if (props.details.receiver in props.colorDict.colors) {
    receiverStyle = { backgroundColor: props.colorDict.colors[props.details.receiver] };
  }

  return (
    <StyledInteraction>
      <tbody>
        <tr>
          <Initiator style={initiatorStyle}>
            {props.details.initiator}
          </Initiator>
        </tr>
        <tr>
          <Technology>{props.details.technology}</Technology>
        </tr>
        <tr>
          <Receiver style={receiverStyle}>{props.details.receiver}</Receiver>
        </tr>
        <tr>
          <td>{props.details.duration}</td>
        </tr>
        <tr>
          <Conversation style={dynamicWidth}>
            {props.details.conversation}
          </Conversation>
        </tr>
      </tbody>
    </StyledInteraction>
  );
};

Interaction.propTypes = {
  details: PropTypes.any,
};
