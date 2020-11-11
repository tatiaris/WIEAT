import React, { useState } from "react";
import { Mheader } from "../components/Mheader/";
import { Mnavbar } from "../components/Mnavbar/";
import { Form, Button, Col } from "react-bootstrap";

const EntryPage = (): React.ReactNode => {
  const [startTime, setStartTime] = useState('11:04');
  const [duration, setDuration] = useState(4);
  const [initiator, setInitiator] = useState('Inst2');
  const [technology, setTechnology] = useState('TP');
  const [receiver, setReceiver] = useState('I&IL');
  const [conversation, setConversation] = useState('"hi, how are you?" "Great! How about you?"');
  const [topic, setTopic] = useState('Dissemination - copying documents to distribute');
  const [episode, setEpisode] = useState('undetermined');

  const addInteraction = async (interactionData) => {
    const res = await fetch('/api/interactions', {
      method: 'post',
      body: JSON.stringify(interactionData)
    })
  }

  const handleInteractionFormSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    addInteraction({
      start_time: startTime,
      duration: duration,
      initiator: initiator,
      technology: technology,
      receiver: receiver,
      conversation: conversation,
      topic: topic,
      episode: episode
    });
  }

  return (
    <>
      <Mheader title={"FAQ"}></Mheader>
      <Mnavbar theme={"dark"}></Mnavbar>
      <Col style={{marginTop: "1em"}}>
        <h3>Interaction Entry:</h3>
        <Form onSubmit={handleInteractionFormSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Start Time</Form.Label>
              <Form.Control onChange={e => setStartTime(e.target.value)} type="time" placeholder="ex: 11:04 AM" required defaultValue={startTime} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Duration (sec)</Form.Label>
              <Form.Control onChange={e => setDuration(parseInt(e.target.value))} type="number" placeholder="ex: 4" required defaultValue={duration} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Initiator</Form.Label>
              <Form.Control onChange={e => setInitiator(e.target.value)} type="text" placeholder="ex: Inst2" required defaultValue={initiator} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Technology</Form.Label>
              <Form.Control onChange={e => setTechnology(e.target.value)} type="text" placeholder="ex: TP" required defaultValue={technology} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Receiver</Form.Label>
              <Form.Control onChange={e => setReceiver(e.target.value)} type="text" placeholder="ex: I&IL" required  defaultValue={receiver} />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Conversation</Form.Label>
            <Form.Control onChange={e => setConversation(e.target.value)} type="text" placeholder='ex: "hi, how are you?" "Great! How about you?"' required defaultValue={conversation} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Topic</Form.Label>
            <Form.Control onChange={e => setTopic(e.target.value)} type="text" placeholder='ex: Dissemination - copying documents to distribute' required defaultValue={topic} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Episode</Form.Label>
            <Form.Control onChange={e => setEpisode(e.target.value)} type="text" placeholder='ex: Initial Field Report - 1st Observation' defaultValue={episode} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default EntryPage;
