import { useState } from "react";
import {ResourceUpdation} from "./resourceUpdation.js";
import { auth } from "../config/firebase.js";

export const UpdateResourceButton = ({ onResourceUpdated, resourceId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  if (isClicked && auth?.currentUser!=null) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResourceUpdation onResourceUpdated={onResourceUpdated} resourceId={resourceId} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        onClick={() => setIsClicked(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className ="inputauthCDE"
      >
        Update Resource
      </button>
    </div>
  );
};