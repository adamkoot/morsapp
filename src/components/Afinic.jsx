import React, { Component } from "react";
import "../styles/style.scss";
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      output: "",
      valueOfA: 0,
      valueOfB: 0,
      valueOfKeyword: "",
      radioOption: "",
      textOfFile: "",
      showHideMorse: true,
      showHideAffine: false,
      showHideVigenere: false,
    };
  }
  setValueOfA(a) {
    this.setState({
      valueOfA: parseInt(a),
    });
  }

  getAPI = (link) =>{
    fetch(link)
    .then((res) => res.json())
    .then((json) => this.setState({ input: json.results }));

    this.convert(this.state.input);
  }

  setValueOfB(b) {
    this.setState({
      valueOfB: parseInt(b),
    });
  }

  setOption = (e) => {
    this.setState({
      radioOption: e.target.value,
    });
  };

  inputTextFromFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      this.convert(text);
      // this.state.input = "";
      // this.state.input = text;
    };
    reader.readAsText(e.target.files[0]);
  };

  convert(input) {
    this.setState({ input: input.toLowerCase() });
    let chars = input.split("");
    let currChar = chars;
    let output;
    let a = this.state.valueOfA;
    let b = this.state.valueOfB;
    let invert = 0;
    let encryptedWord = "";
    let currInt = 0;
    let currEnc = "";
    for (let j = 0; j < 100; j++) {
      if ((26 * j + 1) % a === 0) invert = (26 * j + 1) / a;
    }
    if (this.state.radioOption === "encrypt") {
      for (let i = 0; i < chars.length; i++) {
        if (currChar[i] === " " || currChar[i] === "," || currChar[i] === ".") {
          if (currChar[i] === " ") {
            encryptedWord += " ";
          }
          if (currChar[i] === ",") {
            encryptedWord += ",";
          }
          if (currChar[i] === ".") {
            encryptedWord += ".";
          }
        } else {
          currInt = parseInt(currChar[i], 36) - 10;
          currEnc = (a * currInt + b) % 26;
          encryptedWord += String.fromCharCode(97 + currEnc);
        }
      }
      output = encryptedWord;
      //console.log(encryptedWord);
      this.setState({ output: output });
    }
    if (this.state.radioOption === "decrypt") {
      for (let i = 0; i < chars.length; i++) {
        if (currChar[i] === " " || currChar[i] === "," || currChar[i] === ".") {
          if (currChar[i] === " ") {
            encryptedWord += " ";
          }
          if (currChar[i] === ",") {
            encryptedWord += ",";
          }
          if (currChar[i] === ".") {
            encryptedWord += ".";
          }
        } else {
          currInt = parseInt(currChar[i], 36) - 10;
          currEnc = (invert * (currInt - b + 26)) % 26;
          encryptedWord += String.fromCharCode(97 + currEnc);
        }
      }
      output = encryptedWord;
      this.setState({ output: output });
    }
  }
  render() {
    return (
      <div className="col-sm-12 main">
        <div className="row">
          <div className="col-sm-12">
            <h1>Szyfr Afiniczny</h1>
            <div className="col-sm-2">
              <h5>
                A
                <input
                  className="form-control"
                  onChange={(e) => this.setValueOfA(e.target.value)}
                />{" "}
              </h5>
              <h5>
                B
                <input
                  className="form-control"
                  onChange={(e) => this.setValueOfB(e.target.value)}
                />{" "}
              </h5>
              <h5>
                Ewentualnie podaj api (endpoint JSON):
                <input
                  className="form-control"
                  onChange={(e) => this.getAPI(e.target.value)}
                />{" "}
              </h5>
            </div>
          </div>
        </div>
        <h3>
        <p>Podaj tekst</p>
          <input
            className="form-control"
            id="input"
            value={this.state.input}
            onChange={(e) => this.convert(e.target.value)}
          />{" "}
        </h3>
        <input
          type="file"
          className="form-control-file"
          id="file"
          onChange={(e) => this.inputTextFromFile(e)}
        />
        <h3>
          <input
            className="form-control"
            id="output"
            value={this.state.output}
          />{" "}
        </h3>
        <button
          onClick={this.downloadOutputTxtFile}
          className="btn btn-secondary"
        >
          Download output
        </button>
        <div onChange={(event) => this.setOption(event)}>
          <input
            type="radio"
            value="encrypt"
            name="option"
            id="encrypt"
            onChange={this.handleOptionChange}
          />
          &nbsp;encrypt&nbsp;&nbsp;&nbsp;
          <input
            type="radio"
            value="decrypt"
            name="option"
            id="decrypt"
            onChange={this.handleOptionChange}
          />
          &nbsp;decrypt
        </div>

        
        {!this.state.input && (
                    <div className="error">
                        <p className="alert">Wprowadz A</p>
                    </div>
                )}

                {!this.state.radioOption && (
                    <div className="error">
                        <p className="alert">Wprowadz B</p>
                    </div>
                )}
                
                {!this.state.input && (
                    <div className="error">
                        <p className="alert">Wprowadz tekst</p>
                    </div>
                )}

                {!this.state.radioOption && (
                    <div className="error">
                        <p className="alert">Zaznacz co chcesz zrobić!</p>
                    </div>
                )}
      </div>
    );
  }
}
