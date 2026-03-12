import { db, auth } from "../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { AddResourceButton } from "./addResourceButton.js";

export const ResourceAddition = ({ onResourceAdded }) => {
  const [_title, setTitle] = useState("");
  const [_description, setDescription] = useState("");
  const [_url, setUrl] = useState("");
  const [_category, setCategory] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  if (isClicked) {
    return <div>
      <AddResourceButton onResourceAdded={onResourceAdded} />
    </div>;
  }


  const ResourceListREF = collection(db, "Resource");

  const addResource = async () => {
    if (!auth?.currentUser) return alert("Please sign in to add a resource");
    if (!_title) return alert("Untitled Resource");
    if (!_description) return alert("No description provided");
    if (!_url) return alert("No URL provided");
    try {
      await addDoc(ResourceListREF, {
        title: _title,
        description: _description,
        url: _url,
        category: _category,
        userId: auth?.currentUser?.uid,
      });
      setTitle("");
      setDescription("");
      setUrl("");
      setCategory("");
      setIsClicked(true);
      if (onResourceAdded) onResourceAdded();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <input
        type="text"
        className="inputauth"
        placeholder="Title of Resource..."
        value={_title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="inputauth"
        type="text"
        placeholder="Category of Resource..."
        value={_category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        className="inputauthurl"
        type="text"
        placeholder="URL of Resource..."
        value={_url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        className="inputauthdes"
        placeholder="Description of Resource..."
        value={_description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      <button
        onClick={addResource}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          border: "3px solid #2CD367",
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
