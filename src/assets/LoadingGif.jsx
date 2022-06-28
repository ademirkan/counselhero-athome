/**
 * Replacement GIF while user info is fetched
 */
const LoadingGIF = () => {
  return (
    <div className="centered-container">
      <img
        className="w-32 h-32"
        src={require("./loading.gif")}
        alt="loading..."
      />
    </div>
  );
};

export default LoadingGIF;
