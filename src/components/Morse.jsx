import React, { Component } from 'react';
import morseCodes from "../consts/morseCodes";
import morseCodesDotsDashes from "../consts/morseCodesDotsDashes";
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
            api:"",
        };
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
          this.state.input = "";
          this.state.input = text;
        };
        reader.readAsText(e.target.files[0]);
      };

    
      getAPI = (link) =>{
        fetch(link)
        .then((res) => res.json())
        .then((json) => this.setState({ input: json.results }));

        this.convert(this.state.input);
      }

    convert(input) {
        this.setState({ input: input.toLowerCase() });
        //to jest mors

        let output = "";
        let morseArray;
        if (this.state.radioOption === "encrypt") {
            morseArray = input.split("");
            for (let i = 0; i < morseArray.length; i++) {
                if (morseArray[i] === " ") {
                    output += " ";
                } else {
                    output += morseCodes[morseArray[i]];
                }
            }
            output += " ";
            console.log(output);
            this.setState({ output: output });
        } else if (this.state.radioOption === "decrypt") {
            morseArray = input.split(" ");
            for (let i = 0; i < morseArray.length; i++) {
                output += morseCodesDotsDashes[morseArray[i]];
            }
            console.log(output);
            this.setState({ output: output });
        }
    }
    render() {
        return (
            <div className="col-sm-12 main">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Alfabet Morse'a</h1>
                    </div>
                    <div className="col-sm-4">
              <h5>
                Ewentualnie podaj API (endpoint JSON):
                <input
                  className="form-control"
                  onChange={(e) => this.getAPI(e.target.value)}
                />{" "}
              </h5>
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
