import React, { useState, useEffect } from "react";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";
import { Form, Button, Col, Row, Modal, Container, Card, Toast } from "react-bootstrap";
import { MFooter } from "../components/MFooter";
import { useForm } from "react-hook-form";
import { InputErrMsg } from "../components/InputErrMsg";

const Update = (): React.ReactNode => {
  const defaultInitiatorValue = '--- select initiator ---';
  const defaultReceiverValue = '--- select receiver ---';
  const [insertedDataType, setInsertedDataType] = useState('')
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [initiatorValue, setInitiatorValue] = useState(defaultInitiatorValue);
  const [receiverValue, setReceiverValue] = useState(defaultReceiverValue);
  const [showNotif, setShowNotif] = useState(false);
  const toggleShowNotif = () => setShowNotif(!showNotif);
  const [toastBody, setToastBody] = useState((<></>));
  const [participants, setParticipants] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const technologiesOptions = technologies.map((t, i) => (
    <option key={`technology-option-${i}`}>{t}</option>
  ))
  const participantOptions = participants.map((p, i) => (
    <option key={`participant-option-${i}`}>{p}</option>
  ))
  const { handleSubmit, register, errors } = useForm();
  const loadParticipantNames = async () => {
    const res = await fetch(`/api/participants`)
    const json = await res.json()
    let participantNames = []
    for (let i = 0; i < json.length; i++) {
      participantNames.push(json[i].name)
    }
    setParticipants(participantNames)
  }
  const loadTechnologyNames = async () => {
    const res = await fetch(`/api/technologies`)
    const json = await res.json()
    let technologiesNames = []
    for (let i = 0; i < json.length; i++) {
      technologiesNames.push(json[i].name)
    }
    setTechnologies(technologiesNames)
  }
  const isValidTime = (timeStr) => {
    let regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
    return regex.test(timeStr)
  }
  const getSeconds = (t) => {
    return t[2] + t[1]*60 + t[0]*3600
  }



  const [episode, setEpisode] = useState('undetermined');
  const [interactions, setInteractions] = useState([]);
  const [selectedInteraction, setSelectedInteraction] = useState({
    "_id":"",
    "start_time":"",
    "end_time":"",
    "duration": 0,
    "initiator":"",
    "technology":"",
    "receiver":"",
    "conversation":"",
    "sub_episode":"",
    "episode":""
  });

  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const handleCloseInteractionModal = (e) => setShowInteractionModal(false);

  const handleUpdateInteraction = () => {

  }

  const displayInteractions = (data) => {
    setInteractions(data);
  };

  const loadEpisodeData = async (episodeTitle) => {
    const res = await fetch(`/api/interactions?episode=${episodeTitle}`)
    const json = await res.json()
    
    displayInteractions(json)
  }

  const handleEpisodeUpdate = (event) => {
    event.preventDefault();
    loadEpisodeData(episode)
  }

  const openEditModal = (e) => {
    setSelectedInteraction(interactions.filter((i) => i._id === e.target.name)[0]);
    setShowInteractionModal(true);
  }

  const updateInteraction = async (interactionData) => {
    console.log('updating', interactionData);
    const res = await fetch('/api/interactions', {
      method: 'post',
      body: JSON.stringify(interactionData)
    }).then (
      response => response.json()
    ).catch((e) => {console.log(e)});

    if (res.message == "success") {
      setToastBody((
        <>
          <span>{res.data.initiator} &lt;= {res.data.technology} ({res.data.duration}) =&gt; {res.data.receiver}</span>
          <br/>
          {res.data.conversation}
        </>
      ))
      setInsertedDataType(res.insertedDataType)
      setShowNotif(true)
    } else {
      console.log('interaction could not be added')
    }
  }

  const onInteractionUpdateFormSubmit = (data) => {
    data.duration = parseInt(data.duration);
    data._id = selectedInteraction._id;
    updateInteraction(data);
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

  useEffect(() => {
    setStartTime(selectedInteraction.start_time)
    setEndTime(selectedInteraction.end_time)
    setInitiatorValue(selectedInteraction.initiator)
    setReceiverValue(selectedInteraction.receiver)
  }, [selectedInteraction])

  useEffect(()=>{
    loadParticipantNames();
    loadTechnologyNames();
  }, [])

  return (
    <>
        <Mheader title={"Update"}/>
        <Mnavbar theme={"dark"}/>
        <Col style={{ marginTop: "1em" }}>
          <h3>Update Interaction</h3>
          <Form style={{ borderBottom: "1px solid black" }} onSubmit={handleEpisodeUpdate}>
            <Form.Group as={Row}>
              <Form.Label column sm="1">Episode Title:</Form.Label>
              <Col sm="4">
                <Form.Control onChange={e => setEpisode(e.target.value)} type="text" placeholder="ex: Initial Field Report - 1st Observation" required />
              </Col>
              <Col sm="1">
                <Button variant="primary" type="submit">Submit</Button>
              </Col>
            </Form.Group>
          </Form>
          <Container style={{ maxWidth: "none" }}>
            <Row className="justify-content-md-center" style={{ margin: "1em" }}>
            {interactions.map((i, k) => {
              let tempConversation = i.conversation;
              if (tempConversation.length > 100) tempConversation = tempConversation.substring(0, 100) + " [...]";
              return (
                <Card key={`interaction-${k}`} style={{ width: '18rem', margin: "1em" }}>
                  <Card.Body style={{ display: "flex", flexDirection: "column", flex: "1 1 0%" }}>
                    <Card.Title>{i.sub_episode}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{i.initiator} &lt;&lt; {i.technology} &gt;&gt; {i.receiver}</Card.Subtitle>
                    <Card.Text style={{ flex: "1 1 0%" }}>
                      <b>Start Time:</b> {i.start_time} <br/>
                      <b>Duration:</b> {i.duration} <br/>
                    </Card.Text>
                    <div style={{ flex: "1 1 0%", marginBottom: "1em" }}>{tempConversation}</div>
                    <Button name={i._id} onClick={e => openEditModal(e)} variant="danger">Edit</Button>
                  </Card.Body>
                </Card>
            )})}
            </Row>
          </Container>
        </Col>
        <Modal size="lg" show={showInteractionModal} onHide={handleCloseInteractionModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Interaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <Form onSubmit={handleSubmit(onInteractionUpdateFormSubmit)}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Start Time 24Hr (HH:MM:SS)</Form.Label>
              <Form.Control name="start_time" defaultValue={selectedInteraction.start_time} onChange={e => setStartTime(e.target.value)} placeholder="ex: 21:04:23" ref={register({
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
              <Form.Control name="end_time" defaultValue={selectedInteraction.end_time} onChange={e => setEndTime(e.target.value)} placeholder="ex: 21:04:27" ref={register({
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
              <Form.Control name="initiator"  defaultValue={selectedInteraction.initiator} onChange={e => setInitiatorValue(e.target.value)} as="select" ref={register({
                required: "Required",
                validate: value => (value !== receiverValue && value !== defaultInitiatorValue) || "please choose a valid initiator"
              })}>
                <option>{defaultInitiatorValue}</option>
                {participantOptions}
              </Form.Control>
              <InputErrMsg message={errors.initiator && errors.initiator.message}></InputErrMsg>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Receiver</Form.Label>
              <Form.Control name="receiver"  defaultValue={selectedInteraction.receiver} onChange={e => setReceiverValue(e.target.value)} as="select" ref={register({
                required: "Required",
                validate: value => (value !== initiatorValue && value !== defaultReceiverValue) || "please choose a valid receiver"
              })}>
                <option>{defaultReceiverValue}</option>
                {participantOptions}
              </Form.Control>
              <InputErrMsg message={errors.receiver && errors.receiver.message}></InputErrMsg>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Technology</Form.Label>
              <Form.Control name="technology"  defaultValue={selectedInteraction.technology} ref={register({
                required: "Required",
                validate: value => value !== '--- select technology ---' || "please choose a valid technology"
              })} as="select">
                <option>--- select technology ---</option>
                {technologiesOptions}
              </Form.Control>
              <InputErrMsg message={errors.technology && errors.technology.message}></InputErrMsg>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Conversation</Form.Label>
            <Form.Control name="conversation"  defaultValue={selectedInteraction.conversation} type="text" placeholder='ex: "hi, how are you?" "Great! How about you?"'  ref={register({
              required: "Required",
              pattern: {
                value: /^("[^"]+")( "[^"]+")*$/g,
                message: "invalid conversation format (check for spaces)"
              }
            })}/>
            <InputErrMsg message={errors.conversation && errors.conversation.message}></InputErrMsg>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Sub-episode</Form.Label>
              <Form.Control name="sub_episode"  defaultValue={selectedInteraction.sub_episode} ref={register({ required: "Required" })} type="text" placeholder='ex: Start of Meeting' />
              <InputErrMsg message={errors.sub_episode && errors.sub_episode.message}></InputErrMsg>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Episode (optional)</Form.Label>
              <Form.Control name="episode"  defaultValue={selectedInteraction.episode} ref={register} type="text" placeholder='ex: Final Product Meeting' />
            </Form.Group>
          </Form.Row>
          <Modal.Footer style={{ borderTop: "0px" }}>
            <Button variant="secondary" onClick={handleCloseInteractionModal}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
            Update
          </Button>
          </Modal.Footer>
        </Form>
          </Modal.Body>
        </Modal>
        <Toast show={showNotif} onClose={toggleShowNotif} style={{
          position: 'absolute',
          bottom: 25,
          right: 25,
          background: '#7fe897'
        }} delay={10000} autohide>
          <Toast.Header>
            <strong className="mr-auto">{insertedDataType} Updated</strong>
          </Toast.Header>
          <Toast.Body>
            {toastBody}
          </Toast.Body>
        </Toast>
      <MFooter/>
    </>
  );
};

export default Update;