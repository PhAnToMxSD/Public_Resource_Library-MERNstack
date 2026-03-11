import { db, auth } from "../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export const ResourceAddition = () => {
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
    <div>
      <input
        type="text"
        placeholder="Title of Resource..."
        value={_title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description of Resource..."
        value={_description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL of Resource..."
        value={_url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={addResource}>Add Resource</button>
    </div>
  );
};
