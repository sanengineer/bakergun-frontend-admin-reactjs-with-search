import React from "react";
import Countup from "react-countup";

export const MonitorUserHistory = ({ numberOfUsersHistoryTable }) => {
  return (
    <div
      className="card"
      style={{
        backgroundColor: "unset",
        borderRadius: "unset",
        border: "1px solid #016d3b",
      }}
    >
      <div className="card-body display-board">
        <h4>Histories Created:</h4>
        <div
          className="number"
          style={{ fontSize: "58px", fontWeight: "bold" }}
        >
          <Countup
            start={10}
            useEasing={true}
            end={numberOfUsersHistoryTable}
          ></Countup>
        </div>
      </div>
    </div>
  );
};
