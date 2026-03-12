import { db, auth } from "../config/firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { UpdateResourceButton } from "./updateResourceButton.js";

export const ResourceUpdation = ({ onResourceUpdated, resourceId }) => {
  const [_title, setTitle] = useState("");
  const [_description, setDescription] = useState("");
  const [_url, setUrl] = useState("");
  const [_category, setCategory] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  if (isClicked) {
    return (
      <div>
        <UpdateResourceButton
          onResourceUpdated={onResourceUpdated}
          resourceId={resourceId}
        />
      </div>
    );
  }

  const updateResource = async (title_, description_, url_, category_) => {
    if (!auth?.currentUser) return alert("Please sign in to update a resource");
    try {
      const resourceDoc = doc(db, "Resource", resourceId);
      const updatedFields = {};
      if (title_ != "") updatedFields.title = title_;
      if (description_ != "") updatedFields.description = description_;
      if (url_ != "") updatedFields.url = url_;
      if (category_ != "") updatedFields.category = category_;
      if (Object.keys(updatedFields).length === 0)
        return alert("No fields to update");
      await updateDoc(resourceDoc, updatedFields);
      setIsClicked(true);
      if (onResourceUpdated) onResourceUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <input
        type="text"
        className="inputauthup"
        placeholder="Title of Resource..."
        value={_title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="inputauthup"
        type="text"
        placeholder="Category of Resource..."
        value={_category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        className="inputauthurlup"
        type="text"
        placeholder="URL of Resource..."
        value={_url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        className="inputauthdesup"
        placeholder="Description of Resource..."
        value={_description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      <button
        onClick={() => updateResource(_title, _description, _url, _category)}
        className="inputauthC"
      >
        Update Resource
      </button>
    </div>
  );
};
