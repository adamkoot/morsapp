import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Morse from "./components/Morse";
import Afinic from "./components/Afinic";
import Vigener from "./components/Vigener";
import Header from "./components/Header";
import "./styles/style.scss";
function App() {
  return (
    <div >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Morse />} />
          <Route path="/afinic" element={<Afinic />} />
          <Route path="/vigener" element={<Vigener />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
