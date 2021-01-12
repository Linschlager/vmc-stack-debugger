import React from "react";
import { useSelector } from "react-redux";

const VmState = ({ program }) => {
  const ep = useSelector((state) => state.ep);
  const sp = useSelector((state) => state.sp);
  const pc = useSelector((state) => state.pc);
  const fp = useSelector((state) => state.fp);
  const store = useSelector((state) => state.store);

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
      const row = (
        <tr key={i} style={{ backgroundColor: "darkgray" }}>
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
