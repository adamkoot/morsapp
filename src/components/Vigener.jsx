import React, { Component } from "react";

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

  setOption = (e) => {
    this.setState({
      radioOption: e.target.value,
    });
  };

  getAPI = (link) =>{
    console.log(link)
    fetch(link)
    .then((res) => res.json())
    .then((json) => this.setState({ input: json.results }));

    this.convert(this.state.input);
  }

  setValueOfKeyword(keyword) {
    this.setState({
      valueOfKeyword: keyword,
    });
  }
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

  convert(input) {
    this.setState({ input: input.toLowerCase() });
    let vigenereArray = input.split("");
    let keyword = this.state.valueOfKeyword;
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let output = "";
    let j = 0;
    if (this.state.radioOption === "encrypt") {
      let cipherText = "";
      for (let i = 0; i < vigenereArray.length; i++) {
        const inputCharacter = vigenereArray[i];
        const inputCharacterIndex = alphabet.indexOf(inputCharacter);
        if (inputCharacterIndex === -1) {
          cipherText += inputCharacter;
          continue;
        }
        const keywordCharacter = keyword[j];
        const keywordCharacterIndex = alphabet.indexOf(keywordCharacter);
        const indicesSum = inputCharacterIndex + keywordCharacterIndex;
        const cipherCharacterIndex = indicesSum % 26;
        const cipherTextCharacter = alphabet[cipherCharacterIndex];
        j = j === keyword.length - 1 ? 0 : j + 1;
        cipherText += cipherTextCharacter;
        output = cipherText;
      }
      this.setState({ output: output });
    }

    if (this.state.radioOption === "decrypt") {
      let cipherText = input.split("");
      let plainText = "";
      for (let i = 0; i < cipherText.length; i++) {
        if (cipherText[i] === "," || cipherText[i] === ".") {
          if (cipherText[i] === ",") {
            plainText += ",";
          }
          if (cipherText[i] === ".") {
            plainText += ".";
          }
          output = plainText;
        } else {
          const ciphertextCharacter = cipherText[i];
          const ciphertextCharacterIndex =
            alphabet.indexOf(ciphertextCharacter);
          if (ciphertextCharacterIndex === -1) {
            plainText += ciphertextCharacter;
            continue;
          }
          const keyCharacter = keyword[j];
          const keyCharacterIndex = alphabet.indexOf(keyCharacter);
          const indicesSum = ciphertextCharacterIndex - keyCharacterIndex + 26;
          const cipherCharacterIndex = indicesSum % 26;
          const cipherTextCharacter = alphabet[cipherCharacterIndex];
          j = j === keyword.length - 1 ? 0 : j + 1;
          plainText += cipherTextCharacter;
          output = plainText;
        }
      }
      this.setState({ output: output });
    }
  }
  render() {
    return (
      <div className="col-sm-12">
        <div className="row">
          
            <h1>Szyfr Vigenere'a</h1>
            <div className="col-sm-4">
              <h5>
                Keyword
                <input
                  className="form-control"
                  onChange={(e) => this.setValueOfKeyword(e.target.value)}
                />{" "}
              </h5>
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
            <p className="alert">Wprowadz KEYWORD</p>
          </div>
        )}

        {!this.state.radioOption && (
          <div className="error">
            <p className="alert">Zaznacz co chcesz zrobić!</p>
          </div>
        )}

        {!this.state.input && (
          <div className="error">
            <p className="alert">Wprowadz tekst</p>
          </div>
        )}
      </div>
    );
  }
}
