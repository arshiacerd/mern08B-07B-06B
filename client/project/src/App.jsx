import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UploadFile from "./components/UploadFile";
import Users from "./components/Users";
import {Routes, Route} from "react-router-dom"
import Edit from "./components/Edit";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Signup/> */}
      <Routes>
        <Route path="/edit/:id" element={<Edit />} /> {/* 👈 Renders at /app/ */}
        <Route path="/" element={<Users />} /> {/* 👈 Renders at /app/ */}
      </Routes>
    </>
  );
}

export default App;
