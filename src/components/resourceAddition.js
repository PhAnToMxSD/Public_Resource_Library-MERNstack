import { db, auth } from "../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { AddResourceButton } from "./addResourceButton.js";

export const ResourceAddition = ({ onResourceAdded }) => {
  const [_title, setTitle] = useState("");
  const [_description, setDescription] = useState("");
  const [_url, setUrl] = useState("");
  const [_category, setCategory] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  if (isClicked) {
    return (
      <div>
        <AddResourceButton onResourceAdded={onResourceAdded} />
      </div>
    );
  }

  const ResourceListREF = collection(db, "Resource");

  const addResource = async () => {
    if (!auth?.currentUser) return alert("Please sign in to add a resource");
    if (!_title) return alert("Untitled Resource");
    if (!_description) return alert("No description provided");
    if (!_url) return alert("No URL provided");
    if (!_category) return alert("No category provided");
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
    <div className="surface-panel form-panel">
      <h3 className="panel-title">Add New Resource</h3>
      <input
        type="text"
        className="ui-input"
        placeholder="Title of Resource..."
        value={_title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="ui-input"
        type="text"
        placeholder="Category of Resource..."
        value={_category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        className="ui-textarea"
        type="text"
        placeholder="URL of Resource..."
        value={_url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        className="ui-textarea ui-textarea-lg"
        placeholder="Description of Resource..."
        value={_description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      <button onClick={addResource} className="btn-primary">
        Add Resource
      </button>
    </div>
  );
};
