import React from "react";
import "./LandingPage.css";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderService from "../../services/HeaderService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LandingPage() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState({
    data: [],
    loading: true,
  });
  const [show, setShow] = useState(false);
  const [fundManagerName, setFundManagerName] = useState("");
  const [portfolioName, setPortfolioName] = useState("");
  const [editableData, setEditableData] = useState({});
  const [portfolioData, setPortfolioData] = useState([]);
   
  const handleClose = () => setShow(false);
  const handleShow = (portfolioName) => {
    console.log(portfolioName);
    setShow(true);
    HeaderService.fetchByPortfolioName(portfolioName)
      .then((response) => {
        setEditableData(response.data);
        setPortfolioName(response.data.portfolioName);
        setFundManagerName(response.data.fundManagerName);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(editableData);
  const handleDelete = (portfolioName) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    HeaderService.deletePortfolio(portfolioName)
      .then((response) => {
        setPortfolioData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    HeaderService.fetchHomePageData()
      .then((response) => {
        setPortfolios({
          data: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [portfolioData]);
  console.log(portfolios);

  const handleSave = () => {
    let editedObj = {
      portfolioName: portfolioName,
      baseCurrency: editableData.baseCurrency,
      exchange: editableData.exchange,
      benchmark: editableData.benchmark,
      fundManagerName: fundManagerName,
      initialInvestment: editableData.initialInvestment,
      currentValue: editableData.initialInvestment,
      rebalancingFrequency: editableData.rebalancingFrequency,
      status: editableData.status,
      themeName: editableData.theme.themeName,
    };
     HeaderService.updatePortfolio(portfolioName,editedObj)
     .then(response=>{setPortfolioData(response.data)})
     .catch((error)=>{console.log(error)})
    console.log(editedObj);
    setShow(false);
  };
 
  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Portfolio Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                disabled
                plaintext
                value={editableData.portfolioName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Fundmanager Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="change the name"
                autoFocus
                onChange={(e) => {
                  setFundManagerName(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="tabs">
        <h1 className="tag">MY PORTFOLIOS</h1>
        <div class="row height d-flex justify-content-center align-items-center">
          <div class="col-md-8">
            {/* <div class="search" align="center">
              <br></br>
              <input
                type="text"
                class="form-control "
                placeholder="&#128270; Search Here.."
              />
              <button class="btn btn-primary anybutton">Search</button>
            </div> */}
          </div>

          <div className="add">
            <button
              className="btn btn-info"
              onClick={() => navigate("/portheader")}
            >
              Create portfolio
              {/* <svg
                onClick={() => navigate("/portheader")}
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-plus-circle-dotted"
                viewBox="0 0 16 16"
              >
                <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg> */}
            </button>
          </div>

          <div className="table">
            <table className="my-table">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>S.No</th>
                  <th>Portofolio Name</th>
                  <th>FundManger Name</th>
                  <th>Bench Mark</th>
                  <th>Theme</th>
                  <th>Investment value</th>
                  <th>Current Value</th>
                  {/* <th>returns</th> */}
                  <th>No of holdings</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolios.loading
                  ? ""
                  : portfolios.data.map((item, index) => {
                      return (
                        <tr key={item.portfolioName}>
                          <td>{index + 1}</td>
                          <td>
                            <Link
                              to="/portcomposition"
                              state={{
                                initialInvestment: item.initialInvestment,
                                portfolioName: item.portfolioName,
                                themeName: item.themeName,
                              }}
                            >
                              {item.portfolioName}
                            </Link>
                          </td>
                          <td>{item.fundManagerName}</td>
                          <td>{item.benchmark}</td>
                          <td>
                            <Link to="/theme" state={{ transferObject: item }}>
                              {item.themeName}
                            </Link>
                          </td>
                          <td style={{ textAlign: "right" }}>{item.initialInvestment}</td>
                          <td style={{ textAlign: "right" }}>{item.currentValue}</td>
                          <td style={{ textAlign: "center" }}>{item.noOfSecurities}</td>
                          <td className="del">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="35"
                              fill="currentColor"
                              class="bi bi-pen"
                              viewBox="0 0 16 16"
                              style={{ marginRight: "10px" }}
                              onClick={() => {
                                handleShow(item.portfolioName);
                              }}
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="35"
                              fill="currentColor"
                              class="bi bi-trash-fill"
                              viewBox="0 0 16 16"
                              margin-right="50px"
                              onClick={() => {
                                handleDelete(item.portfolioName);
                              }}
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
