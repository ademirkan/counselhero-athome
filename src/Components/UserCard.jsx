import styles from "../Styles/UserCard.module.css";
import { useEffect, useState } from "react";

const UserCard = ({
  name = "John Doe",
  imageURL,
  email = "johndoe@gmail.com",
  onClick = () => {},
}) => {
  return (
    <div className={styles.userCard} onClick={onClick}>
      <img className="rounded-full" src={imageURL} alt={name} />
      <div>{name}</div>
      <div className="f text-sm">{email}</div>
    </div>
  );
};

export default UserCard;
