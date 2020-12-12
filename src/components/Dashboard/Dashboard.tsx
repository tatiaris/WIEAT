import React from "react";
import { DashboardProps } from "../interfaces";
import PropTypes from "prop-types";
import { Col, Row, Table } from "react-bootstrap";

const average = (array) => {
  if (array.length < 1) return 0;
  return array.reduce((a, b) => a + b) / array.length;
}

const getDiversityIndex = (interactionList, participantList) => {
  let total = 0
  let count = 0
  for (let i = 0; i < participantList.length - 1; i++) {
    for (let j = i + 1; j < participantList.length; j++) {
      count = 0
      for (let k = 0; k < interactionList.length; k++) {
        if ((interactionList[k].initiator == participantList[i] || interactionList[k].initiator == participantList[j]) && (interactionList[k].receiver == participantList[i] || interactionList[k].receiver == participantList[j])) {
          count++;
        }
      }
      if (count > 0) {
        total += (count/interactionList.length) * Math.log(count/interactionList.length)
      }
    }
  }
  return total * -1
}

/**
 * Dashboard component
*/
export const Dashboard: React.FC<DashboardProps> = (props) => {
  let CanvasJSReact, CanvasJS, CanvasJSChart;
  let charts = (<></>);

  const totalInteractions = props.data.length;
  let participantCount = {}
  let participantList = Array.from(new Set(props.data.map(d => d.initiator).concat(props.data.map(d => d.receiver))))
  participantList.forEach(p => { participantCount[p.toString()] = 0 });
  let participantsPieChartDatapoints = []
  
  let durationList = props.data.map(d => d.duration)
  
  let technologyCount = {}
  let technologyList = Array.from(new Set(props.data.map(d => d.technology)))
  technologyList.forEach(t => { technologyCount[t.toString()] = 0 });
  let technologyPieChartDatapoints = []

  for (let i = 0; i < props.data.length; i++) {
    participantCount[props.data[i].initiator] += 1
    participantCount[props.data[i].receiver] += 1
    technologyCount[props.data[i].technology] += 1
  }

  durationList = durationList.sort((a, b) => a - b)
  const minDuration = durationList[0];
  const maxDuration = durationList[durationList.length - 1]
  const q1Duration = durationList[Math.floor(durationList.length/4)]
  const q2Duration = durationList[Math.floor(durationList.length/2)]
  const q3Duration = durationList[Math.floor(durationList.length*3/4)]
  const averageDuration = Math.round(average(durationList)*10)/10
  const siil = durationList.reduce((a, b) => a + b, 0)

  const pList = Array.from(new Set(props.data.map(d => d.initiator).concat(props.data.map(d => d.receiver))))
  const diversityIndex = Math.round(getDiversityIndex(props.data, pList)*1000)/1000

  const episodeStartTime = props.data[0].start_time
  const episodeEndTime = props.data[props.data.length - 1].start_time

  for (let t in technologyCount) {
    technologyPieChartDatapoints.push({
      y: Math.round(technologyCount[t]*10000/totalInteractions)/100,
      label: t
    })
  }
  for (let p in participantCount) {
    participantsPieChartDatapoints.push({
      y: Math.round(participantCount[p]*10000/totalInteractions)/100,
      label: p
    })
  }
  
  const DurationsBoxPlot = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
		dataPointWidth: 40,
    title:{
      text: "Duration Distribution",
      fontSize: "18"
    },
    axisY: {
      title: "duration (seconds)"
    },
    data: [{
      type: "boxAndWhisker",
      // color: "black",
      upperBoxColor: "#23bfaa",
      lowerBoxColor: "#c0504e",
      stroke: 1,
      dataPoints: [
        { label: "Conversations",  y: [minDuration, q1Duration, q3Duration, maxDuration, q2Duration] }
      ],
      whiskerThickness: 3,
      stemThickness: 3,
      lineThickness: 3,
      upperBoxThickness: 3
    }]
  }

  const TechnologyPieChart = {
    theme: "light2",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Technology Used",
      fontSize: "18"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: technologyPieChartDatapoints
    }]
  }

  const participantsPieChart = {
    theme: "light2",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Participation Distribution",
      fontSize: "18"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: participantsPieChartDatapoints
    }]
  }

  if (typeof window !== 'undefined') {
    CanvasJSReact = require('../../pages/api/canvasjs.react')
    CanvasJSChart = CanvasJSReact.default.CanvasJSChart;
    charts = (
      <>
        <Col sm="5" style={{ margin: "1em" }}>
          <CanvasJSChart options = {TechnologyPieChart}/>
        </Col>
        <Col sm="5" style={{ margin: "1em" }}>
          <CanvasJSChart options = {participantsPieChart}/>
        </Col>
        <Col sm="5" style={{ margin: "1em" }}>
          <CanvasJSChart options = {DurationsBoxPlot}/>
        </Col>
      </>
    )
  }

  return (
    <>
      <Row style={{padding: "1em"}}>
        <Col sm="3" style={{ margin: "1em" }}>
          <Table striped>
            <thead>
              <tr>
                <th style={{ textAlign: "center", borderTop: "0px", paddingTop: "0px" }} colSpan={2}>Overall Analytics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Roles</td>
                <td>{participantList.length}</td>
              </tr>
              <tr>
                <td>Technologies</td>
                <td>{technologyPieChartDatapoints.length}</td>
              </tr>
              <tr>
                <td>Frequency of Interactions</td>
                <td>{totalInteractions}</td>
              </tr>
              <tr>
                <td>SIIL</td>
                <td>{siil}s</td>
              </tr>
              <tr>
                <td>Episode Length</td>
                <td>{episodeStartTime} - {episodeEndTime}</td>
              </tr>
              <tr>
                <td>Average Duration</td>
                <td>{averageDuration}s</td>
              </tr>
              <tr>
                <td>Median Duration</td>
                <td>{q2Duration}s</td>
              </tr>
              <tr>
                <td>Diversity Index</td>
                <td>{diversityIndex}</td>
              </tr>
              <tr>
                <td>I-I Ratio</td>
                <td>coming soon</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Row>
            {charts}
          </Row>
        </Col>
      </Row>
    </>
  );
};

Dashboard.propTypes = {
  data: PropTypes.any,
};
