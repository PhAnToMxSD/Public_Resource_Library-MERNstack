import { db, auth } from "../config/firebase.js";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { AddResourceButton } from "./addResourceButton.js";
import { UpdateResourceButton } from "./updateResourceButton.js";

export const ResourceRender = () => {
  const [resourceList, setResourceList] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [showMyResources, setShowMyResources] = useState(false);

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
    width: "30vw",
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          justifyContent: "space-around",
          marginLeft: "20px",
          gap: "10px",
          width: "100vw",
          padding: "20px 0"
        }}
      >
        <input
          className="inputauth"
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          style={{ flex: 1, maxWidth: "45vw" }}
        />
        <input
          className="inputauth"
          type="text"
          placeholder="Search by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          style={{ flex: 1, maxWidth: "45vw" }}
        />
        <button
          className={showMyResources ? "inputauthD" : "inputauthC"}
          onClick={() => {
            if (!auth?.currentUser)
              return alert("Please sign in to view your resources");
            setShowMyResources(!showMyResources);
          }}
        >
          {showMyResources ? "Show All" : "My Resources"}
        </button>
      </div>
      <hr
        style={{
          border: "none",
          height: "14px",
          backgroundColor: "#2CD367",
          margin: "40px 20px",
          width: "100vw",
        }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {resourceList
          .filter((resource) => {
            const matchesTitle = resource.title
              ?.toLowerCase()
              .includes(searchTitle.toLowerCase());
            const matchesCategory = resource.category
              ?.toLowerCase()
              .includes(searchCategory.toLowerCase());
            const matchesUser = showMyResources
              ? resource.userId === auth?.currentUser?.uid
              : true;
            return matchesTitle && matchesCategory && matchesUser;
          })
          .map((resource) => (
            <div key={resource.id} style={resourceStyle}>
              <h2>Title:</h2>
              <h2>{resource.title}</h2>
              <p>Description:</p>
              <textarea style={{ textAlign: "center", height: "30px" }} value={resource.description} readOnly />
              <p>Category:</p>
              <p>{resource.category}</p>
              <p>URL:</p>
              <textarea style={{ textAlign: "center", height: "30px" }} value={resource.url} readOnly/>
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
                Copy URL
              </button>
              <UpdateResourceButton onResourceUpdated={getResourceList} resourceId={resource.id} />
            </div>
          ))}
      </div>
    </div>
  );
};
