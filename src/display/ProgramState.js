import React from "react";
import { useSelector } from "react-redux";

const ProgramState = ({ program }) => {
  const pc = useSelector((state) => state.pc);

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
    <table
      style={{
        border: "1px solid black",
        position: "relative"
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
  );
};

export default ProgramState;
