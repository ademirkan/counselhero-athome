import PageLayout from "../Layout/PageLayout";
import styles from "../Styles/AlbumPage.module.css";
import { useState, useEffect } from "react";
import useQuery from "../Hooks/useQuery";
import { Link } from "react-router-dom";
import PhotoCard from "../Components/PhotoCard";

const AlbumPage = ({ props }) => {
  // State
  const [albums, setAlbums] = useState(null);
  const [currentAlbumId, setCurrentAlbumId] = useState();
  const [albumPhotos, setAlbumPhotos] = useState(null);

  // Routing
  const query = useQuery();
  let userId = query.get("userId");

  // Handlers
  const handleSelect = (id) => {
    if (id !== currentAlbumId) {
      setCurrentAlbumId(id);
    }
  };

  // Initial render: fetch and store album list
  useEffect(() => {
    // Adapted from https://blog.logrocket.com/modern-api-data-fetching-methods-react/
    const getData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setAlbums(actualData);
        setCurrentAlbumId(actualData[0].id);
      } catch (err) {
        setAlbums(null);
        return <div>There was an error...</div>;
      }
    };
    getData();
  }, []);

  // Fetch photos when currentAlbumId changes
  useEffect(() => {
    if (currentAlbumId === null) return;

    const getData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${currentAlbumId}`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        // Retrieve JSON data from album
        let data = await response.json();

        // Convert JSON objects to array
        let photoList = [];
        for (var i in data) {
          photoList.push(data[i]);
        }

        // Initialize albumPhotos
        setAlbumPhotos(photoList);
      } catch (err) {
        setAlbumPhotos(null);
        return <div>ERROR ... </div>;
      }
    };
    getData();
  }, [currentAlbumId]);

  // Delay rendering until albums are fetched
  if (albums === null) {
    return <></>;
  }

  // Render component
  return (
    <PageLayout title="Album">
      <div className={styles.container}>
        <AlbumList
          albums={albums}
          onSelect={handleSelect}
          activeId={currentAlbumId}
        />

        <div className={styles.nav}>
          <Link to="/">
            <div className="bg-blue-500 text-white px-5 py-1 rounded font-normal leading-5">
              Back
            </div>
          </Link>
        </div>

        <div className={styles.photoGrid}>
          {albumPhotos === null ? (
            <></>
          ) : (
            [...albumPhotos].map((photo, index) => (
              <PhotoCard
                imageURL={photo.url}
                title={photo.title}
                key={index}
              ></PhotoCard>
            ))
          )}
        </div>
      </div>
    </PageLayout>
  );
};

/**************************** HELPER COMPONENTS ********************************/

// Creates list of buttons based on albums array
const AlbumList = ({ albums, onSelect, activeId }) => {
  return (
    <div className={styles.albumList}>
      {[...albums].map((album) => {
        return (
          <AlbumButton
            key={album.id}
            isActive={album.id === activeId}
            onClick={() => {
              onSelect(album.id);
            }}
          >
            {album.title}
          </AlbumButton>
        );
      })}
    </div>
  );
};

/**
 * Given name, isActive, onClick -- renders button
 */
const AlbumButton = ({ children, isActive = false, onClick = () => {} }) => {
  return (
    <div className={styles.albumButton} onClick={onClick}>
      <div
        style={{ position: "absolute" }}
        className={"bg-blue-500 w-1 h-full" + (!isActive ? " opacity-0" : "")}
      ></div>
      <div
        className={"px-4 py-2 " + styles.buttonText}
        style={{
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AlbumPage;
