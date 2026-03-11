import { db, auth } from "../config/firebase.js";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ResourceAddition } from "./resourceAddition.js";


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
    if (auth.currentUser.uid !== creatorId) return alert("You can only delete resources you created");
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
      <ResourceAddition onResourceAdded={getResourceList} />
      <hr style={{ border: "none", height: "14px", backgroundColor: "#2CD367", margin: "40px 20px", width: "100vw" }} />
      <div>
        {resourceList.map((resource) => (
          <div key={resource.id} className="resource">
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.url}
            </a>
            <button onClick={() => deleteResource(resource.id, resource.userId)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
