import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css"
import App from "./App"

import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
   <Navbar/>
    <App/>
    <Footer/>
  </BrowserRouter>
);

