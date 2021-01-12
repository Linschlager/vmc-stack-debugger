import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR, INPUT_BOOL, INPUT_INT } from "../vm/instructions";

const VmRuntime = ({ program }) => {
  const pc = useSelector((state) => state.pc);
  const dispatch = useDispatch();
  const [intArg, setIntArg] = useState(Math.floor(Math.random() * 100));
  const [boolArg, setBoolArg] = useState(Math.floor(Math.random() * 100));

  const doAction = () => {
    if (pc > -1) {
      if (program[pc].type === INPUT_INT) {
        dispatch({
          ...program[pc],
          payload: {
            ...program[pc].payload,
            input: intArg
          }
        });
      } else if (program[pc].type === INPUT_BOOL) {
        dispatch({
          ...program[pc],
          payload: {
            ...program[pc].payload,
            input: boolArg
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
          <button onClick={(_) => dispatch({ type: CLEAR })}>&#x21ba;</button>
          {program[pc]?.type === INPUT_INT && (
            <input
              type="number"
              onChange={(e) => setIntArg(e.target.value)}
              value={intArg}
            />
          )}
          {program[pc]?.type === INPUT_BOOL && (
            <input
              type="checkbox"
              onChange={(e) => setBoolArg(e.target.checked)}
              value={boolArg}
            />
          )}
        </>
      )}
    </>
  );
};

export default VmRuntime;
