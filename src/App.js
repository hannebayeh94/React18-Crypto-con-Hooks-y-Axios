
import "./App.css";
import React from "react";
import Crypto from "./components/Crypto";

const App = () => {
  return (
    <div className="container-fluid">
      <h1 className="text-center">Cryptos con react</h1>
      <Crypto />
    </div>
  );
};

export default App;
