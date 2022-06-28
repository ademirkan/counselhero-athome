import { useRef } from "react";
import styles from "../Styles/PhotoCard.module.css";

const PhotoCard = ({ imageURL, title }) => {
  // Refs (for smooth background-foreground transition)
  const previousImageURLRef = useRef(imageURL);
  const currentImageURLRef = useRef(imageURL);

  // Update previous background image
  if (currentImageURLRef.current !== imageURL) {
    previousImageURLRef.current = currentImageURLRef.current;
    currentImageURLRef.current = imageURL;
  }

  return (
    <div
      className={styles.backgroundCard}
      style={{
        backgroundImage: `url(${previousImageURLRef.current})`,
      }}
    >
      <div
        className={styles.imageCard}
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
      >
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};

export default PhotoCard;
