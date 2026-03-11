import { db } from "../config/firebase.js";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const ResourceRender = () => {
  const [resourceList, setResourceList] = useState([]);

  const [_title, setTitle] = useState("");
  const [_description, setDescription] = useState("");
  const [_url, setUrl] = useState("");

  const ResourceListREF = collection(db, "Resource");

  const getResourceList = async () => {
    try {
      const data = await getDocs(ResourceListREF);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
      console.log({ filteredData });
      setResourceList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResourceList();
  }, []);

  const addResource = async () => {
    try {
      await addDoc(ResourceListREF, {
        title: _title,
        description: _description,
        url: _url,
      });
      setTitle("");
      setDescription("");
      setUrl("");
      getResourceList();
    }catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Title of Resource..."
          onChange={(e) => {
            setTitle(e.target.value == "" ? alert("Untitled Resource") : e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description of Resource..."
          onChange={(e) => {
            setDescription(e.target.value == "" ? alert("No description provided") : e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="URL of Resource..."
          onChange={(e) => {
            setUrl(e.target.value == "" ? alert("No URL provided") : e.target.value);
          }}
        />
        <button onClick={addResource}>Add Resource</button>
      </div>
      <div>
        {resourceList.map((resource) => (
          <div key={resource.id}>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a href={resource.url}>{resource.url}</a>
          </div>
        ))}
      </div>
    </div>
  );
};
