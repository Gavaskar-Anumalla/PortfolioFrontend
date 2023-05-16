import React from "react";
import "./css/App.css";
import PortComposition from "./components/Portfolio/PortComposition";
import Theme from "./components/Portfolio/Theme"
import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./components/Portfolio/LandingPage";
import PortHeader from "./components/Portfolio/PortHeader";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        {/* <Route path='/' element={<LandingPage/>}></Route> */}
        <Route path="/portheader" element={<PortHeader />}></Route>
        <Route path="/portcomposition" element={<PortComposition />}></Route>
        <Route path="/theme" element={<Theme/>}></Route>
      </Routes>
      <Outlet/>
    </div>
  );
}

export default App;
