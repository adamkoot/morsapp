import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/style.scss";

export default class componentName extends Component {
  render() {
    return (
      <div className="header">
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <Link
            to="/"
            activeClassName="active"
            className={("btn btn-primary", "btn btn-primary btn-lg")}
          >
            ALFABER MORSA
          </Link>
          <Link
            to="/afinic"
            activeClassName="active"
            className={("btn btn-primary", "btn btn-primary btn-lg")}
          >
            SZYFR AFINICZNY
          </Link>
          <Link
            to="/vigener"
            activeClassName="active"
            className={("btn btn-primary", "btn btn-primary btn-lg")}
          >
            SZYFR VIGENERE'A
          </Link>
        </div>
      </div>
    );
  }
}
