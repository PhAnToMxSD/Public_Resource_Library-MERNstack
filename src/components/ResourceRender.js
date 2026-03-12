import { db, auth } from "../config/firebase.js";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { AddResourceButton } from "./addResourceButton.js";

export const ResourceRender = () => {
  const [resourceList, setResourceList] = useState([]);

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

  const deleteResource = async (id, creatorId) => {
    if (!auth?.currentUser) return alert("Please sign in to delete a resource");
    if (auth.currentUser.uid !== creatorId)
      return alert("You can only delete resources you created");
    try {
      const resourceDoc = doc(db, "Resource", id);
      await deleteDoc(resourceDoc);
      getResourceList();
    } catch (error) {
      console.error(error);
    }
  };

  const resourceStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
    width: "33vw",
    borderRadius: "10px",
    margin: "30px",
    border: "2px solid #2CD367",
    backgroundColor: "#2CD367",
    color: "white",
    filter: "drop-shadow(0px 0px 8px green)",
    fontFamily: '"Datatype", monospace',
    fontSize: "20px",
    fontWeight: 400,
    fontStyle: "normal",
    padding: "10px",
  };

  return (
    <div>
      <AddResourceButton onResourceAdded={getResourceList} />
      <hr
        style={{
          border: "none",
          height: "14px",
          backgroundColor: "#2CD367",
          margin: "40px 20px",
          width: "100vw",
        }}
      />
      <div>
        {resourceList.map((resource) => (
          <div key={resource.id} style={resourceStyle}>
            <h2>Title:</h2>
            <h2>{resource.title}</h2>
            <p>Description:</p>
            <textarea style={{ textAlign: "center", height: "30px" }}>
              {resource.description}
            </textarea>
            <p>Category:</p>
            <p>{resource.category}</p>
            <p>URL:</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.url}
            </a>
            <button
              className="inputauthD"
              onClick={() => deleteResource(resource.id, resource.userId)}
            >
              Delete
            </button>
            <button
              className="inputauthCD"
              onClick={() => {
                navigator.clipboard.writeText(resource.url);
                alert("URL copied to clipboard!");
              }}
            >
              Update Resource
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
