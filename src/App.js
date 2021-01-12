import React, { useEffect, useState } from "react";
import { copyRecordsHack, copyRecordsRev } from "./programs";
import ProgramState from "./display/ProgramState";
import { CLEAR, mapToAction } from "./vm/instructions";
import VmRuntime from "./display/VmRuntime";
import VmState from "./display/VmState";

import "./styles.css";
import { useDispatch } from "react-redux";

export default function App() {
  const [program, setProgram] = useState([]);
  const [tempActions, setTempActions] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (tempActions.length > 0) {
      try {
        const lines = tempActions.split("\n");
        const instructions = lines.map((line) => line.split(/ (.+)/)[1]);
        const actions = instructions.map((i) => mapToAction(i));
        setProgram(actions);
        dispatch({ type: CLEAR });
      } catch (e) {}
    }
  }, [dispatch, tempActions]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <textarea
          value={tempActions}
          onChange={(e) => setTempActions(e.target.value)}
        ></textarea>
        <button onClick={(_) => setTempActions(copyRecordsHack)}>
          Load #1 (Hack)
        </button>
        <button onClick={(_) => setTempActions(copyRecordsRev)}>
          Load #2 (StoreRev)
        </button>
        <VmState program={program} />
        <VmRuntime program={program} />
      </div>
      <div style={{}}>
        <ProgramState program={program} />
      </div>
    </div>
  );
}
