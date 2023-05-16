import React from "react";

import Navbar from "../Navbar/Navbar";

import { useEffect, useState } from "react";

import HeaderService from "../../services/HeaderService";

import { useLocation } from "react-router-dom";

const Theme = () => {
  const location = useLocation();
  const { transferObject } = location.state;

  console.log(transferObject);

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

  return (
    <>
      <Navbar />
      <div className="c1">
        <div className="c2">
          <h1>Theme</h1>
        </div>

        <table>
          <thead>
            <tr bgcolor="#FFC300">
              <th>Theme</th>
              <th>Mix</th>
              <th>Allocation %</th> <th>Risk</th>
              <th>Investment Horizon</th>{" "}
            </tr>
          </thead>

          <tbody>
            {/* trial */}
            {theme.loading
              ? ""
              : theme.data.map((item, index) => {
                  return (
                    <tr key={item.themeName}>
                      <td>{item.themeName}</td>
                      <td>{item.equity}</td>
                      <td>{item.allocation}</td>
                      <td>{item.risk}</td>
                      <td>{item.investmentHorizon}</td>
                    </tr>
                  );
                })}

            {/* <tr>

            <td rowSpan={3}>Aggressive</td>

            <td>Equities</td>

            <td>75%</td>

            <td rowSpan={3}>High</td>

            <td rowSpan={3}>Long Term</td>

          </tr>

          <tr>

            <td>Commodities</td>

            <td>15%</td>

          </tr>

          <tr>

            <td>Alternative Investments</td>

            <td>10%</td>

          </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Theme;
