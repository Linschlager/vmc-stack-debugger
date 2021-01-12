import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  ADD_INT,
  CALL,
  DEREF,
  DIV_T_INT,
  DUP,
  EQ_INT,
  GE_INT,
  GT_INT,
  INPUT_BOOL,
  INPUT_INT,
  LE_INT,
  LOAD_ADDR_REL,
  LOAD_IM_INT,
  LT_INT,
  MOD_T_INT,
  MULT_INT,
  NEG_INT,
  NE_INT,
  OUTPUT_BOOL,
  OUTPUT_INT,
  RETURN,
  STORE,
  STORE_REV,
  SUB_INT
} from "./vmReducer.consts";

const VmState = ({ program }) => {
  const ep = useSelector((state) => state.ep);
  const sp = useSelector((state) => state.sp);
  const pc = useSelector((state) => state.pc);
  const fp = useSelector((state) => state.fp);
  const store = useSelector((state) => state.store);
  const [affectedCells, setAffectedCells] = useState([]);
  const [lastAffected, setLastAffected] = useState([[], []]);

  useEffect(() => {
    const getAffectedCells = () => {
      const nextAction = program[pc];
      switch (nextAction?.type) {
        case DUP:
          return [sp, sp - 1];
        case CALL:
          return [sp, sp + 1, sp + 2];
        case RETURN:
          return [fp + 2, fp + 1, fp];
        case LOAD_IM_INT:
        case LOAD_ADDR_REL:
          return [sp];
        case DEREF:
          return [sp - 1, store[sp - 1]];
        case STORE:
          return [sp - 2, sp - 1, store[sp - 2]];
        case STORE_REV:
          return [sp - 2, sp - 1, store[sp - 1]];
        case NEG_INT:
        case ADD_INT:
        case SUB_INT:
          return [sp - 1];
        case MULT_INT:
        case DIV_T_INT:
        case MOD_T_INT:
        case EQ_INT:
        case NE_INT:
        case GT_INT:
        case LT_INT:
        case GE_INT:
        case LE_INT:
          return [sp - 1, sp - 2];
        case INPUT_BOOL:
        case INPUT_INT:
          return [store[sp - 1]];
        case OUTPUT_BOOL:
        case OUTPUT_INT:
          return [sp - 1];
        default:
          return [];
      }
    };
    setAffectedCells(getAffectedCells());
  }, [program, store, sp, fp, pc]);

  useEffect(() => {
    setLastAffected((prev) => [prev[1], affectedCells]);
  }, [affectedCells]);

  const renderStackRows = () => {
    const storeSize = Math.max(...Object.keys(store).map((k) => +k));
    const length = Math.max(sp, fp, storeSize, 10);

    const rows = [];
    for (let i = length + 1; i >= 0; i--) {
      let p = [];
      if (ep === i) {
        p.push(
          <span
            key="ep"
            title="Extreme Pointer"
            style={{ backgroundColor: "blue", color: "white", padding: 2 }}
          >
            &rarr;
          </span>
        );
      }
      if (sp === i) {
        p.push(
          <span
            key="sp"
            title="Stack Pointer"
            style={{ backgroundColor: "red", color: "white", padding: 2 }}
          >
            &rarr;
          </span>
        );
      }
      if (fp === i) {
        p.push(
          <span
            key="fp"
            title="Frame Pointer"
            style={{ backgroundColor: "green", color: "white", padding: 2 }}
          >
            &rarr;
          </span>
        );
      }
      const isAffected = affectedCells.includes(i);
      const hasBeenAffected = lastAffected[0].includes(i);
      const row = (
        <tr
          key={i}
          style={{
            backgroundColor: isAffected
              ? "lightgreen"
              : hasBeenAffected
              ? "#ccc"
              : "#ddd"
          }}
        >
          <td>{p}</td>
          <td>{store[i] ?? "‎‎‏‏‎ ‎"}</td>
        </tr>
      );
      rows.push(row);
    }
    return rows;
  };

  const renderProgramRows = () => {
    return program.map((action, i) => {
      return (
        <tr key={i}>
          <td>
            <span
              style={{
                backgroundColor: pc === i ? "green" : "gray",
                color: "white",
                padding: 4
              }}
            >
              {i}
            </span>
          </td>
          <td>{action.input}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <h1>State of the VM</h1>
      <div>
        <table style={{ border: "1px solid black" }}>
          <thead>
            <tr>
              <th>Pointers</th>
              <th>Stack</th>
            </tr>
          </thead>
          <tbody>{renderStackRows()}</tbody>
        </table>
        <table
          style={{
            border: "1px solid black",
            position: "absolute",
            right: 10,
            top: 10,
            zIndex: -1
          }}
        >
          <thead>
            <tr>
              <th>Counter</th>
              <th>Command</th>
            </tr>
          </thead>
          <tbody>{renderProgramRows()}</tbody>
        </table>
      </div>
    </>
  );
};
export default VmState;
