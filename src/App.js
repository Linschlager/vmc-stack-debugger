import React, { useState } from "react";
import "./styles.css";
import { mapToAction } from "./vmReducer.consts";
import VmRuntime from "./VmRuntime";
import VmState from "./VmState";

export default function App() {
  const [program, setProgram] = useState([]);
  const [tempActions, setTempActions] = useState("");

  const parseActions = () => {
    const lines = tempActions.split("\n");
    const instructions = lines.map((line) => line.split(" ")[1]);
    const actions = instructions.map((i) => mapToAction(i));
    setProgram(actions);
  };

  return (
    <div>
      <textarea
        value={tempActions}
        onChange={(e) => setTempActions(e.target.value)}
      ></textarea>
      <button onClick={parseActions}>Parse</button>
      <VmState program={program} />
      <VmRuntime program={program} />
    </div>
  );
}
