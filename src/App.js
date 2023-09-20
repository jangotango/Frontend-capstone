import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import PostPage from "./components/Post"; // Correct the import path if needed


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<PostPage />} />
          {/* You can add more routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
