import { useState } from "react";
import {ResourceUpdation} from "./resourceUpdation.js";
import { auth } from "../config/firebase.js";

export const UpdateResourceButton = ({ onResourceUpdated, resourceId }) => {
  const [isClicked, setIsClicked] = useState(false);
  if (isClicked && auth?.currentUser != null) {
    return (
      <div className="center-wrap">
        <ResourceUpdation onResourceUpdated={onResourceUpdated} resourceId={resourceId} />
      </div>
    );
  }

  return (
    <div className="center-wrap">
      <button
        onClick={() => setIsClicked(true)}
        className="btn-info"
      >
        Update Resource
      </button>
    </div>
  );
};