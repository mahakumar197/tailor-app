import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewComponent from "./components/ViewComponent";
import CreateComponent from "./components/CreateComponent";
import EditComponent from "./components/EditComponent";
import DataComponent from "./components/DataComponent";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ViewComponent />} />
          <Route path="/create" element={<CreateComponent />} />
          <Route path="/edit/:id" element={<EditComponent />} />
          <Route path="/data/:id" element={<DataComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
