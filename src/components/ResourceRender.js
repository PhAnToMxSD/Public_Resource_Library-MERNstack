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

  return (
    <div className="resource-section">
      <AddResourceButton onResourceAdded={getResourceList} />
      <div className="section-divider" />
      <div className="surface-panel search-panel">
        <input
          className="ui-input"
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          className="ui-input"
          type="text"
          placeholder="Search by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <button
          className={showMyResources ? "btn-danger" : "btn-primary"}
          onClick={() => {
            if (!auth?.currentUser)
              return alert("Please sign in to view your resources");
            setShowMyResources(!showMyResources);
          }}
        >
          {showMyResources ? "Show All" : "My Resources"}
        </button>
      </div>
      <div className="section-divider" />
      <div className="resource-grid">
        {resourceList
          .filter((resource) => {
            const title = (resource.title || "").toLowerCase();
            const category = (resource.category || "").toLowerCase();
            const matchesTitle = title.includes(searchTitle.toLowerCase());
            const matchesCategory = category.includes(searchCategory.toLowerCase());
            const matchesUser = showMyResources
              ? resource.userId === auth?.currentUser?.uid
              : true;
            return matchesTitle && matchesCategory && matchesUser;
          })
          .map((resource) => {
            const creatorTag =
              resource.userId === auth?.currentUser?.uid ? "Your upload" : "Community";

            return (
              <article key={resource.id} className="resource-card">
                <div className="card-header-row">
                  <span className="card-badge">{resource.category || "General"}</span>
                  <span className="card-meta">{creatorTag}</span>
                </div>

                <h3 className="card-title">{resource.title || "Untitled"}</h3>

                <p className="card-label">Description</p>
                <p className="card-content">{resource.description || "No description provided."}</p>

                <p className="card-label">URL</p>
                <a
                  href={resource.url}
                  className="card-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {resource.url}
                </a>

                <div className="card-actions">
                  <button
                    className="btn-danger"
                    onClick={() => deleteResource(resource.id, resource.userId)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn-warning"
                    onClick={() => {
                      navigator.clipboard.writeText(resource.url);
                      alert("URL copied to clipboard!");
                    }}
                  >
                    Copy URL
                  </button>
                  <UpdateResourceButton
                    onResourceUpdated={getResourceList}
                    resourceId={resource.id}
                  />
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
};
