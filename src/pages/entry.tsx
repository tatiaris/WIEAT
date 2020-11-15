import React, { useState, useEffect } from "react";
import { Mheader } from "../components/Mheader/";
import { Mnavbar } from "../components/Mnavbar/";
import { Form, Button, Col, Toast } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { InputErrMsg } from "../components/InputErrMsg";

const EntryPage = (): React.ReactNode => {
  const defaultInitiatorValue = '--- select initiator ---';
  const defaultReceiverValue = '--- select receiver ---';
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [initiatorValue, setInitiatorValue] = useState(defaultInitiatorValue);
  const [receiverValue, setReceiverValue] = useState(defaultReceiverValue);
  const [showNotif, setShowNotif] = useState(true);
  const toggleShowNotif = () => setShowNotif(!showNotif);
  const [toastBody, setToastBody] = useState('no body')

  const addInteraction = async (interactionData) => {
    const res = await fetch('/api/interactions', {
      method: 'post',
      body: JSON.stringify(interactionData)
    }).then (
      response => response.json()
    ).catch((e) => {});

    if (res.message == "success") {
      console.log('interaction added', res.data)
      setToastBody(`${res.data.initiator} => ${res.data.receiver} (${res.data.technology})`)
      setShowNotif(true)
    } else {
      console.log('interaction could not be added')
    }
  }

  const isValidTime = (timeStr) => {
    let regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
    return regex.test(timeStr)
  }

  const { handleSubmit, register, errors } = useForm();

  const onInteractionFormSubmit = (data) => {
    data.duration = parseInt(data.duration);
    addInteraction(data);
  }

  const getSeconds = (t) => {
    console.log(t)
    return t[2] + t[1]*60 + t[0]*3600
  }

  useEffect(() => {
    if (isValidTime(startTime) && isValidTime(endTime)) {
      const stp = (startTime.split(':')).map(x=>+x)
      const etp = endTime.split(':').map(x=>+x)
      let startSecs = getSeconds(stp)
      let endSecs = getSeconds(etp)
      if (startSecs > endSecs) {
        endSecs += 86400;
      }
      setDuration(endSecs - startSecs)
    }
  }, [startTime, endTime]);

  return (
    <>
      <Mheader title={"FAQ"}></Mheader>
      <Mnavbar theme={"dark"}></Mnavbar>
      <Toast show={showNotif} onClose={toggleShowNotif} style={{
        position: 'absolute',
        bottom: 25,
        right: 25,
        background: '#7fe897'
      }} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Interaction Added</strong>
        </Toast.Header>
        <Toast.Body>
          {toastBody}
        </Toast.Body>
      </Toast>
      <Col style={{marginTop: "1em"}}>
        <h3>Interaction Entry:</h3>
        <Form onSubmit={handleSubmit(onInteractionFormSubmit)}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Start Time 24Hr (HH:MM:SS)</Form.Label>
              <Form.Control name="start_time" onChange={e => setStartTime(e.target.value)} placeholder="ex: 21:04:23" ref={register({
                required: "Required",
                pattern: {
                  value: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
                  message: "invalid start time"
                },
                validate: value => value !== endTime
              })}/>
              <InputErrMsg message={errors.start_time && errors.start_time.message}></InputErrMsg>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>End Time 24Hr (HH:MM:SS)</Form.Label>
              <Form.Control name="end_time" onChange={e => setEndTime(e.target.value)} placeholder="ex: 21:04:27" ref={register({
                required: "Required",
                pattern: {
                  value: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
                  message: "invalid end time"
                },
                validate: value => value !== startTime || "cannot be the same as start time"
              })}/>
              <InputErrMsg message={errors.end_time && errors.end_time.message}></InputErrMsg>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Duration (sec)</Form.Label>
              <Form.Control name="duration" ref={register} plaintext placeholder="ex: 4" readOnly value={duration} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Initiator</Form.Label>
              <Form.Control name="initiator" defaultValue={initiatorValue} onChange={e => setInitiatorValue(e.target.value)} as="select" ref={register({
                required: "Required",
                validate: value => (value !== receiverValue && value !== defaultInitiatorValue) || "please choose a valid initiator"
              })}>
                <option>{defaultInitiatorValue}</option>
                <option>Field Observer (FOB)</option>
                <option>I&I2</option>
                <option>I&IL</option>
                <option>Inst2</option>
                <option>SITL</option>
              </Form.Control>
              <InputErrMsg message={errors.initiator && errors.initiator.message}></InputErrMsg>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Receiver</Form.Label>
              <Form.Control name="receiver" defaultValue={receiverValue} onChange={e => setReceiverValue(e.target.value)} as="select" ref={register({
                required: "Required",
                validate: value => (value !== initiatorValue && value !== defaultReceiverValue) || "please choose a valid receiver"
              })}>
              <option>{defaultReceiverValue}</option>
                <option>Field Observer (FOB)</option>
                <option>I&I2</option>
                <option>I&IL</option>
                <option>Inst2</option>
                <option>SITL</option>
              </Form.Control>
              <InputErrMsg message={errors.receiver && errors.receiver.message}></InputErrMsg>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Technology</Form.Label>
              <Form.Control name="technology" ref={register({ required: "Required" })} as="select">
                <option>CO</option>
                <option>FF</option>
                <option>PF</option>
                <option>TP</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Conversation</Form.Label>
            <Form.Control name="conversation" type="text" placeholder='ex: "hi, how are you?" "Great! How about you?"'  ref={register({
              required: "Required",
              pattern: {
                value: /^("[^"]+")( "[^"]+")*$/g,
                message: "invalid conversation format (check for spaces)"
              }
            })}/>
            <InputErrMsg message={errors.conversation && errors.conversation.message}></InputErrMsg>
          </Form.Group>
          <Form.Group>
            <Form.Label>Sub-episode</Form.Label>
            <Form.Control name="sub_episode" ref={register({ required: "Required" })} type="text" placeholder='ex: Start of Meeting' />
            <InputErrMsg message={errors.sub_episode && errors.sub_episode.message}></InputErrMsg>
          </Form.Group>
          <Form.Group>
            <Form.Label>Episode (optional)</Form.Label>
            <Form.Control name="episode" ref={register} type="text" placeholder='ex: Final Product Meeting' />
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
