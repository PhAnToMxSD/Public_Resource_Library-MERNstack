import { auth } from "../config/firebase";
import { ResourceAddition } from "./resourceAddition";
import { useState } from "react";

export const AddResourceButton = ({ onResourceAdded }) => {
  const [isClicked, setIsClicked] = useState(false);
  if (isClicked && auth?.currentUser != null) {
    return (
      <div className="center-wrap">
        <ResourceAddition onResourceAdded={onResourceAdded} />
      </div>
    );
  }

  return (
    <div className="center-wrap">
      <button onClick={() => setIsClicked(true)} className="btn-primary">
        Add Resource
      </button>
    </div>
  );
};
