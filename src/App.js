import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewComponent from "./components/ViewComponent";
import CreateComponent from "./components/CreateComponent";
import EditComponent from "./components/EditComponent";
import DataComponent from "./components/DataComponent";
import PaginationComponent from "./components/PaginationComponent";
import ShineImage from "./components/ImgComponent/ShineImage";
import src from "./components/test.png";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <CreateComponent/> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ViewComponent />} />
          <Route path="/create" element={<CreateComponent />} />
          <Route path="/edit/:id" element={<EditComponent />} />
          <Route path="/data/:id" element={<DataComponent />} />
        </Routes> 
        {/* <PaginationComponent />
        {/* <ShineImage src={src} alt="Loading..." /> */}
      </div>
    </Router>
  );
}

export default App;
