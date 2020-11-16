import React from "react";
import { DashboardProps } from "../interfaces";
import PropTypes from "prop-types";
import { Col, Row, Table } from "react-bootstrap";
// import CanvasJSReact from '../../pages/api/canvasjs.react';

/**
 * Dashboard component
*/

const getTotalWords = (convo) => {
  return convo.split(' ').length
}
const average = (array) => {
  if (array.length < 1) return 0;
  return array.reduce((a, b) => a + b) / array.length;
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  let CanvasJSReact, CanvasJS, CanvasJSChart;
  let charts = (<></>);

  const totalInteractions = props.data.length;
  let participantList = new Set()
  let durationList = []
  let wpiList = []
  let technologyCount = {}
  let technologyPieChartDatapoints = []

  for (let i = 0; i < props.data.length; i++) {
    durationList.push(props.data[i].duration)
    wpiList.push(getTotalWords(props.data[i].conversation))
    participantList.add(props.data[i].initiator)
    participantList.add(props.data[i].receiver)
    if (props.data[i].technology in technologyCount) {
      technologyCount[props.data[i].technology] += 1
    } else {
      technologyCount[props.data[i].technology] = 1
    }
  }

  console.log(participantList)

  durationList = durationList.sort((a, b) => a - b)
  const minDuration = durationList[0];
  const maxDuration = durationList[durationList.length - 1]
  const q1Duration = durationList[Math.floor(durationList.length/4)]
  const q2Duration = durationList[Math.floor(durationList.length/2)]
  const q3Duration = durationList[Math.floor(durationList.length*3/4)]
  const averageDuration = Math.round(average(durationList)*10)/10

  wpiList = wpiList.sort((a, b) => a - b)
  const minwpi = wpiList[0];
  const maxwpi = wpiList[wpiList.length - 1]
  const q1wpi = wpiList[Math.floor(wpiList.length/4)]
  const q2wpi = wpiList[Math.floor(wpiList.length/2)]
  const q3wpi = wpiList[Math.floor(wpiList.length*3/4)]
  const averageWpi = Math.round(average(wpiList))

  for (let t in technologyCount) {
    technologyPieChartDatapoints.push({
      y: Math.round(technologyCount[t]*10000/totalInteractions)/100,
      label: t
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

  const WPIBoxPlot = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
		dataPointWidth: 40,
    title:{
      text: "WPI Distribution",
      fontSize: "18"
    },
    axisY: {
      title: "WPI (count)"
    },
    data: [{
      type: "boxAndWhisker",
      // color: "black",
      upperBoxColor: "#23bfaa",
      lowerBoxColor: "#c0504e",
      stroke: 1,
      dataPoints: [
        { label: "Conversations",  y: [minwpi, q1wpi, q3wpi, maxwpi, q2wpi] }
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

  if (typeof window !== 'undefined') {
    CanvasJSReact = require('../../pages/api/canvasjs.react')
    CanvasJSChart = CanvasJSReact.default.CanvasJSChart;
    charts = (
      <>
        <Col sm="4">
          <CanvasJSChart options = {TechnologyPieChart}/>
        </Col>
        <Col sm="3">
          <CanvasJSChart options = {DurationsBoxPlot}/>
        </Col>
        <Col sm="3">
          <CanvasJSChart options = {WPIBoxPlot}/>
        </Col>
      </>
    )
  }
  
  return (
    <>
      <Row style={{padding: "1em"}}>
        <Col sm="2">
          <Table striped>
            <thead>
              <tr>
                <th style={{ textAlign: "center", borderTop: "0px", paddingTop: "0px" }} colSpan={2}>Overall Statistics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Participants</td>
                <td>{participantList.size}</td>
              </tr>
              <tr>
                <td>Technologies</td>
                <td>{technologyPieChartDatapoints.length}</td>
              </tr>
              <tr>
                <td>Total Interactions</td>
                <td>{totalInteractions}</td>
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
                <td>Average WPI</td>
                <td>{averageWpi}</td>
              </tr>
              <tr>
                <td>Median WPI</td>
                <td>{q2wpi}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        {charts}
      </Row>
    </>
  );
};

Dashboard.propTypes = {
  data: PropTypes.any,
};
