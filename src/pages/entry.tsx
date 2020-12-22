import React, { useState, useEffect } from "react";
import { Mheader } from "../components/Mheader/";
import { Mnavbar } from "../components/Mnavbar/";
import { Form, Button, Col, Toast, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { InputErrMsg } from "../components/InputErrMsg";
import { MFooter } from "../components/MFooter";

const EntryPage = (): React.ReactNode => {
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
  const [roles, setRoles] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const technologiesOptions = technologies.map((t, i) => (
    <option key={`technology-option-${i}`}>{t}</option>
  ))
  const roleOptions = roles.map((p, i) => (
    <option key={`role-option-${i}`}>{p}</option>
  ))
  const { handleSubmit, register, errors } = useForm();
  const { handleSubmit: handleRoleSubmit, register: registerRole, errors: errorsRole } = useForm();
  const { handleSubmit: handleTechnologySubmit, register: registerTechnology, errors: errorsTechnology } = useForm();
  
  const loadRoleNames = async () => {
    const res = await fetch(`/api/roles`)
    const json = await res.json()
    let roleNames = []
    for (let i = 0; i < json.length; i++) {
      roleNames.push(json[i].name)
    }
    setRoles(roleNames)
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

  const addInteraction = async (interactionData) => {
    const res = await fetch('/api/interactions', {
      method: 'post',
      body: JSON.stringify(interactionData)
    }).then (
      response => response.json()
    ).catch((e) => {});

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

  const isValidTime = (timeStr) => {
    let regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
    return regex.test(timeStr)
  }

  const onInteractionFormSubmit = (data) => {
    data.duration = parseInt(data.duration);
    addInteraction(data);
  }

  const onRoleFormSubmit = async (roleData) => {
    const res = await fetch('/api/roles', {
      method: 'post',
      body: JSON.stringify(roleData)
    }).then (
      response => response.json()
    ).catch((e) => {});

    if (res.message == "success") {
      setToastBody((
        <>
          {res.data.full_name} ({res.data.name})
        </>
      ))
      setInsertedDataType(res.insertedDataType)
      setShowNotif(true)
    } else {
      console.log('role could not be added')
    }
  }

  const onTechnologyFormSubmit = async (technologyData) => {
    const res = await fetch('/api/technologies', {
      method: 'post',
      body: JSON.stringify(technologyData)
    }).then (
      response => response.json()
    ).catch((e) => {});

    if (res.message == "success") {
      setToastBody((
        <>
          {res.data.full_name} ({res.data.name})
        </>
      ))
      setInsertedDataType(res.insertedDataType)
      setShowNotif(true)
    } else {
      console.log('technology could not be added')
    }
  }

  const getSeconds = (t) => {
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

  useEffect(()=>{
    loadRoleNames();
    loadTechnologyNames();
  }, [])

  return (
    <>
      <Mheader title={"Entry"}/>
      <Mnavbar theme={"dark"}/>
      <Col style={{marginTop: "1em"}}>
        <h3>Interaction Entry</h3>
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
                {roleOptions}
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
                {roleOptions}
              </Form.Control>
              <InputErrMsg message={errors.receiver && errors.receiver.message}></InputErrMsg>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Technology</Form.Label>
              <Form.Control name="technology" ref={register({
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
            <Form.Control name="conversation" type="text" placeholder='ex: "hi, how are you?" "Great! How about you?"'  ref={register({
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
              <Form.Control name="sub_episode" ref={register({ required: "Required" })} type="text" placeholder='ex: Start of Meeting' />
              <InputErrMsg message={errors.sub_episode && errors.sub_episode.message}></InputErrMsg>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Episode (optional)</Form.Label>
              <Form.Control name="episode" ref={register} type="text" placeholder='ex: Final Product Meeting' />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Submit Interaction
          </Button>
        </Form>
      </Col>
      <Row style={{margin: "2em 0em 2em 0em"}}>
        <Col style={{marginTop: "1em"}}>
          <h3>Role Entry</h3>
          <Form onSubmit={handleRoleSubmit(onRoleFormSubmit)}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control name="full_name" ref={registerRole({ required: "Required" })} type="text" placeholder='ex: Field Observer' />
              <InputErrMsg message={errorsRole.full_name && errorsRole.full_name.message}></InputErrMsg>
            </Form.Group>
            <Form.Group>
              <Form.Label>Abbreviation</Form.Label>
              <Form.Control name="name" ref={registerRole({ required: "Required" })} type="text" placeholder='ex: FOB' />
              <InputErrMsg message={errorsRole.name && errorsRole.name.message}></InputErrMsg>
            </Form.Group>
            <Form.Group>
              <Form.Label>Code</Form.Label>
              <Form.Control name="code" ref={registerRole({ required: "Required" })} type="text" placeholder='ex: 143' />
              <InputErrMsg message={errorsRole.code && errorsRole.code.message}></InputErrMsg>
            </Form.Group>
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <Form.Control name="color" ref={registerRole} type="color" defaultValue="#ffffff" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Role
            </Button>
          </Form>
        </Col>
        <Col style={{marginTop: "1em"}}>
          <h3>Technology Entry</h3>
          <Form onSubmit={handleTechnologySubmit(onTechnologyFormSubmit)}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control name="full_name" ref={registerTechnology({ required: "Required" })} type="text" placeholder='ex: Face to Face' />
              <InputErrMsg message={errorsTechnology.full_name && errorsTechnology.full_name.message}></InputErrMsg>
            </Form.Group>
            <Form.Group>
              <Form.Label>Abbreviation</Form.Label>
              <Form.Control name="name" ref={registerTechnology({ required: "Required" })} type="text" placeholder='ex: FF' />
                <InputErrMsg message={errorsTechnology.name && errorsTechnology.name.message}></InputErrMsg>
            </Form.Group>
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <Form.Control name="color" ref={registerTechnology} type="color" defaultValue="#ffffff" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Technology
            </Button>
          </Form>
        </Col>
      </Row>
      <Toast show={showNotif} onClose={toggleShowNotif} style={{
        position: 'absolute',
        bottom: 25,
        right: 25,
        background: '#7fe897'
      }} delay={10000} autohide>
        <Toast.Header>
          <strong className="mr-auto">{insertedDataType} Added</strong>
        </Toast.Header>
        <Toast.Body>
          {toastBody}
        </Toast.Body>
      </Toast>
      <MFooter/>
    </>
  );
};

export default EntryPage;
