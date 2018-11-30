import React, { Component } from "react";
import "./App.css";

const INPUT_TYPE = {
  DocumentType: "DocumentType",
  DocumentName: "DocumentName",
  Categorie: "Categorie",
  Email: "Email"
};
const isValidInputDocumentName = value => {
  if (value.length >= 2 && value.length <= 32) {
    return true;
  } else {
    return false;
  }
};

const isValidInputEmail = email => {
  if (email.length > 128) {
    return false;
  }
  let pat = /^[a-z]+$/;
  let address = email.split("@");
  console.log("address", address);
  if (address.length !== 2) {
    return false;
  }
  let username = address[0];
  let domaine = address[1];
  if (username.length > 0) {
    if (pat.test(username) === false) {
      return false;
    }
  } else {
    return false;
  }
  let domaineSplited;
  if (domaine) {
    if (domaine.length > 0) {
      domaineSplited = domaine.split(".");
      if (domaineSplited.length !== 2) {
        return false;
      }
      if (pat.test(domaineSplited[0]) === false) {
        return false;
      }
      if (pat.test(domaineSplited[1]) === false) {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }

  return true;
};
const isValidInput = value => {
  return value.length ? true : false;
};

const validationFunction = {
  Categorie: isValidInput,
  DocumentType: isValidInput,
  Email: isValidInputEmail,
  DocumentName: isValidInputDocumentName
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { numberOfValidInput: 0, progress: 0, validInputs: {} };
  }
  calculProgress = numberOfValidInput => {
    const totalInput = 4;
    let progress = (numberOfValidInput * 100) / totalInput;
    return progress;
  };
  onkeyUp = inputType => event => {
    const { validInputs } = this.state;
    let { value } = event.target;
    validInputs[inputType] = validationFunction[inputType](value);
    const Inputs = Object.keys(validInputs);
    const filtredInputs = Inputs.filter(key => validInputs[key]);
    let numberOfValidInput = filtredInputs.length;
    let progress = this.calculProgress(numberOfValidInput);
    this.setState({ validInputs, numberOfValidInput, progress });
  };
  render() {
    const { progress, numberOfValidInput } = this.state;

    return (
      <div className="App">
        <div className="containerInput">
          <label>Progress {progress} </label>
        </div>
        <div className="containerInput">
          <label>valide {numberOfValidInput} </label>
        </div>

        <div className="containerInput">
          <label>Document Type</label>
          <input onKeyUp={this.onkeyUp(INPUT_TYPE.DocumentType)} type="text" />
        </div>
        <div className="containerInput">
          <label>Document Name</label>
          <input type="text" onKeyUp={this.onkeyUp(INPUT_TYPE.DocumentName)} />
        </div>
        <div className="containerInput">
          <label>Categorie</label>
          <input type="text" onKeyUp={this.onkeyUp(INPUT_TYPE.Categorie)} />
        </div>
        <div className="containerInput">
          <label>Email</label>
          <input type="text" onKeyUp={this.onkeyUp(INPUT_TYPE.Email)} />
        </div>
      </div>
    );
  }
}

export default App;
