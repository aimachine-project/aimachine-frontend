import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <p>hello world!</p>
      <div className="flex flex-row-reverse">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
      <div className="flex flex-col">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
  );
}

export default App;
