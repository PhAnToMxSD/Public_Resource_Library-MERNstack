import { db } from "../config/firebase.js";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
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
    if (!_title) return alert("Untitled Resource");
    if (!_description) return alert("No description provided");
    if (!_url) return alert("No URL provided");
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

  const deleteResource = async (id) => {
    try {
        const resourceDoc = doc(db, "Resource", id);
        await deleteDoc(resourceDoc);
        getResourceList();
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div>
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
      <div>
        {resourceList.map((resource) => (
          <div key={resource.id}>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.url}
            </a>
            <button onClick={() => deleteResource(resource.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
