import React from "react";
import { Link } from "react-router-dom";
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

  console.log(theme);

  return (
    <>
      <Navbar />
      {/* <h1>View Theme</h1> */}
      <div className="card">
        <div className="c-head">
          <h1>View Theme</h1>
        </div>

        <table>
          <thead>
            <tr bgcolor="#FFC300">
              <th>Theme</th>
              <th >Mix</th>
              <th>Allocation %</th>
              <th>Risk</th>
              <th>Investment Horizon</th>{" "}
            </tr>
          </thead>

          <tbody>
            {theme.loading ? (
              ""
            ) : (
              <tr>
                <td>{theme.data.themeName}</td>
                <td >Equity ,bonds</td>
               
                <td>{theme.data.equities}</td>
                <td>{theme.data.risk}</td>
                <td>{theme.data.investmentHorizon}</td>
              </tr>
            )}
          </tbody>
        </table>
        
      </div>

      <Link className="btn btn-primary" to='/'>Go Back</Link>
    </>
  );
};

export default Theme;
