import React from "react";

import Navbar from "../Navbar/Navbar";

import { useEffect, useState } from "react";

import HeaderService from "../../services/HeaderService";

import { useLocation } from "react-router-dom";
import "./Theme.css";
const Theme = () => {
  const location = useLocation();
  const { transferObject } = location.state;

 // console.log(transferObject);

  const [themeName, setThemeName] = useState("");

  console.log(transferObject.themeName);

  const [theme, setTheme] = useState({
    data: [],

    loading: true,
  });

  useEffect(() => {
    HeaderService.fetchByTheme(transferObject.themeName)

      .then((response) => {
        setTheme({
          data: response.data,

          loading: false,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(theme)

  return (
    <>
      <Navbar />
      <div className="card">
        <div className="c-head">
          <h1>View Theme</h1>
        </div>

        <table>
          <thead>
            <tr bgcolor="#FFC300">
              <th>Theme</th>
              <th>Mix</th>
              <th>Allocation %</th> 
              <th>Risk</th>
              <th>Investment Horizon</th>{" "}
            </tr>
          </thead>

          <tbody>
            
            {
              theme.loading?"":<tr>
                <td>{theme.data.themeName}</td>
                <td></td>
                <td></td>
                <td>{theme.data.risk}</td>
                <td>{theme.data.investmentHorizon}</td>
                
              </tr>
            }
          </tbody>
        </table>
        {transferObject.themeName}
      </div>
    </>
  );
};

export default Theme;
