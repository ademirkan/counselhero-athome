import "./App.css";
import UserPage from "./Pages/UserPage";
import { Route, Routes } from "react-router-dom";
import AlbumPage from "./Pages/AlbumPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/albums" element={<AlbumPage />} />
      </Routes>
    </div>
  );
}

export default App;
