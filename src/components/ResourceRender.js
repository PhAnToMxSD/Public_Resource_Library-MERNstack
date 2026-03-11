import { db } from "../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

export const ResourceRender = () => {
  const [resourceList, setResourceList] = useState([]);
  const ResourceListREF = collection(db, "Resource");

  useEffect(() => {
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
    getResourceList();
  }, []);

  return (
    <div>
      {resourceList.map((resource) => (
        <div key={resource.id}>
          <h2>{resource.title}</h2>
          <p>{resource.description}</p>
          <a href={resource.url}>{resource.url}</a>
        </div>
      ))}
    </div>
  );
};
