import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR, INPUT_INT } from "../vm/instructions";

const VmRuntime = ({ program }) => {
  const pc = useSelector((state) => state.pc);
  const dispatch = useDispatch();
  const [arg, setArg] = useState(Math.floor(Math.random() * 100));

  const doAction = () => {
    if (pc > -1) {
      if (program[pc].type === INPUT_INT) {
        dispatch({
          ...program[pc],
          payload: {
            ...program[pc].payload,
            input: arg
          }
        });
      } else {
        dispatch(program[pc]);
      }
    }
    // else -> program has terminated
  };
  return (
    <>
      {pc === -1 ? (
        <button onClick={(_) => dispatch({ type: CLEAR })}>Restart</button>
      ) : (
        <>
          <button disabled={program?.length === 0} onClick={doAction}>
            Execute {program[pc]?.type || "[]"}
          </button>
          {program[pc]?.type === INPUT_INT && (
            <input
              type="number"
              onChange={(e) => setArg(e.target.value)}
              value={arg}
            />
          )}
        </>
      )}
    </>
  );
};

export default VmRuntime;
