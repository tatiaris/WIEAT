import React from "react";
import { InpsContainer } from "./style";
import { InputProps } from "../interfaces";
import PropTypes from "prop-types";

/**
 * Inputs Container component
 */
export const InputContainer: React.FC<InputProps> = (props) => {
  const iea_api_url = "https://iea-backend.herokuapp.com";

  const get_data = (f_name) => {
    fetch(`${iea_api_url}/get-data?src_file=${f_name}`)
      .then((response) => response.json())
      .then((response_data) => {
        props.visualizeFunc(response_data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (event) => {
    console.log(event.target.value);
    event.preventDefault();

    const files = event.target.files;
    const formData = new FormData();
    formData.append("data_file", files[0]);

    let req = fetch(`${iea_api_url}/upload-data`, {
      method: "post",
      body: formData,
    })
      .then((response) => get_data(files[0].name))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleColorUpdate = (event) => {
    props.colorUpdateFunc(event.target.name, event.target.value);
  }

  const handleDownload = (event) => {
    event.preventDefault();
  }

  let colorInputs = [(<></>)];
  if (props.colorDict == undefined) {
    console.log("no colors");
  } else {
    colorInputs = (Object.keys(props.colorDict.colors)).map((key, i) => (
      <>
        <label key={"color-label-" + i}>{key + ': '}</label>
        <input key={"color-input-" + i} onChange={handleColorUpdate} type="color" name={key} value={props.colorDict.colors[key]}/>
      </>
    ));
  }

  return (
    <InpsContainer>
      <input
        onChange={handleFileChange}
        type="file"
        id="data_file"
        name="data_file"
      />
      <button id="download-poster-btn" onClick={handleDownload}>Download</button>
      <br></br>
      <span>Sample files: </span>
      <a href="/files/sample.csv">csv</a>,{" "}
      <a href="/files/sample.yaml">yaml</a>,{" "}
      <a href="/files/sample.json">json</a>
      <br/>
      {colorInputs}
    </InpsContainer>
  );
};

InputContainer.propTypes = {
  visualizeFunc: PropTypes.any,
  colorUpdateFunc: PropTypes.any,
  colorDict: PropTypes.any
};
