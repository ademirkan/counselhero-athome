import styles from "../Styles/PageLayout.module.css";
const PageLayout = ({ title, children }) => {
  return (
    <>
      <h1>{title}</h1>
      {children}
    </>
  );
};

export default PageLayout;
