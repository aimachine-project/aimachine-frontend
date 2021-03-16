import React from "react";
import "./App.css";
import Navbar from "../Navbar";
import PageContent from "../PageContent";

function App() {
  return (
    <div className="App flex flex-col lg:flex-row">
      <PageContent />
      <Navbar />
    </div>
  );
}
export default App;
