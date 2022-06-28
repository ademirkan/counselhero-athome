import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "../Components/UserCard";
import PageLayout from "../Layout/PageLayout";
import LoadingGIF from "../assets/LoadingGif";
const URL = "https://jsonplaceholder.typicode.com/users";

/**
 * Fetches and displays user information
 */
const UserPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetches data on initial render
  useEffect(() => {
    // Adapted from https://blog.logrocket.com/modern-api-data-fetching-methods-react/
    const getData = async () => {
      try {
        /* Fetch data */
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        /** Initialize data */
        let actualData = await response.json();
        setData(actualData);
      } catch (err) {
        return <div>ERROR...</div>;
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  /* Construct page contents based on if the fetch has returned or not */
  const pageContents = loading ? <LoadingGIF /> : <UserGrid users={data} />;

  return <PageLayout title="Users">{pageContents}</PageLayout>;
};

/**
 * Given array of user objects, returns flexbox of
 */
const UserGrid = ({ users }) => {
  return (
    <div className="grid-container">
      {[...users].map((user) => {
        return (
          <Link to={"/albums?userId=" + user.id} key={user.id}>
            <UserCard
              imageURL={
                "https://ui-avatars.com/api/?name=" +
                user.name.replace(/\s+/g, "")
              }
              name={user.name}
              email={user.email}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default UserPage;
