import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/HomePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
