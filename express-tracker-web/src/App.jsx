import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Album from "./Album";
import Expense from "./Expense";

function App() {
  return (
    <div className="App">
      <Expense />
      {/* <Album /> */}
    </div>
  );
}

export default App;
