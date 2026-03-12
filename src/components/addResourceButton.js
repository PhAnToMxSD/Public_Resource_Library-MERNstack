import { auth } from "../config/firebase";
import { ResourceAddition } from "./resourceAddition";
import { useState } from "react";

export const AddResourceButton = ({ onResourceAdded }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  if (isClicked && auth?.currentUser!=null) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResourceAddition onResourceAdded={onResourceAdded} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        onClick={() => setIsClicked(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: "flex",
          border: "3px solid #2CD367",
          alignContent: "center",
          backgroundColor: isHovered ? "#2CD367" : "transparent",
          color: isHovered ? "white" : "#2CD367",
          filter: "drop-shadow(0px 0px 8px green)",
          fontFamily: '"Datatype", monospace',
          fontSize: "20px",
          fontWeight: 400,
          fontStyle: "normal",
          padding: "5px 20px",
          cursor: "pointer",
          transition: "background-color 0.2s, color 0.2s",
        }}
      >
        Add Resource
      </button>
    </div>
  );
};
