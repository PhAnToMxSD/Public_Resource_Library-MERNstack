import { db, auth } from "../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export const ResourceAddition = ({ onResourceAdded }) => {
  const [_title, setTitle] = useState("");
  const [_description, setDescription] = useState("");
  const [_url, setUrl] = useState("");

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
        userId: auth?.currentUser?.uid,
      });
      setTitle("");
      setDescription("");
      setUrl("");
      if (onResourceAdded) onResourceAdded();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center gap-4">
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
        placeholder="Description of Resource..."
        value={_description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="inputauth"
        type="text"
        placeholder="URL of Resource..."
        value={_url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={addResource} style={
        {
          border: "3px solid #2CD367",
          backgroundColor: "transparent",
          color: "#2CD367",
          filter: "drop-shadow(0px 0px 8px green)",
          fontFamily: '"Datatype", monospace',
          fontSize: "20px",
          fontWeight: 400,
          fontStyle: "normal",
          padding: "5px 20px",
          cursor: "pointer"
        }
      }>Add Resource</button>
    </div>
  );
};
