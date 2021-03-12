import React from "react";
import "./App.css";
import Navbar from "../Navbar";

function App() {
  return (
    <div className="App flex flex-col lg:flex-row">
      <div className="flex-auto">
        <p>hello world!</p>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
