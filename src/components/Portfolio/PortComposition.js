import React, { useEffect, useState, useRef } from "react";
import "./PortComposition.css";
import Navbar from "../Navbar/Navbar";
import HeaderService from "../../services/HeaderService";
import { useLocation } from "react-router-dom";
const PortComposition = () => {
  const location = useLocation();
  const transferObject = location.state;
  console.log(transferObject);

  let nameInput = useRef();

  const [masterData, setMasterData] = useState([]);
  const [isinNumber, setIsinNumber] = useState();
  const [nameOfCompany, setNameOfCompany] = useState();
  const [reqData, setReqData] = useState("");
  const [quantity, setQuantity] = useState();
  const [value, setValue] = useState();
  const [message, setMessage] = useState("");
  const [availableBalance, setAvailableBalance] = useState();
  const [exceedError,setExceedError]=useState(false);
  const [compositionData, setCompositionData] = useState({
    data: [],
    loading: true,
  });

  const [savedData, setSavedData] = useState();
  //const [remainingBalance, setRemainingBalance] = useState();

  //to display the usm
  useEffect(() => {
    HeaderService.fetchData()
      .then((response) => {
        setMasterData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //to display securities added
  useEffect(() => {
    // console.log(transferObject.portfolioName);
    HeaderService.fetchAllSecuritiesByPortfolioName(
      transferObject.portfolioName
    )
      .then((response) => {
        let localComposotionData=response.data;
        setCompositionData({
          data: response.data,
          loading: false,
        });
        let temp=0;
      localComposotionData.portfoliocomposition.map((item) => {
      temp=temp+item.value;
    });
     setAvailableBalance(transferObject.initialInvestment-temp)
      })
      .catch((error) => {
        console.log(error);
      });
      

  }, [savedData]);
  console.log(compositionData);

  
  
 
  const handleSearch = (e) => {
    console.log(nameInput.current.value);
    setNameOfCompany(e.target.value);

    HeaderService.fetchByNameOfCompany(nameInput.current.value)
      .then((response) => {
        setReqData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* const handleChange = (e) => {
    //setIsinNumber(e.target.value);
    setNameOfCompany(e.target.value);
    HeaderService.fetchByNameOfCompany(e.target.value)
      .then((response) => {
        setReqData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
    console.log(e.target.value);
  }; */
  const calculateValue = (e) => {
    setQuantity(e.target.value);
    setValue(Math.round(e.target.value * reqData.lastPrice*100)/100);
    if((Math.round(e.target.value * reqData.lastPrice*100)/100)>=availableBalance){
      setExceedError(true)
    }
    
  };

  const savePortfolioComposition = (e) => {
    if(exceedError==true){
      window.alert("you have exceed your invested amount, please decrease the quantity");
      setQuantity("")
      setExceedError(false)
      return <PortComposition></PortComposition>
    }
    let compositionObject = {
      securityName: reqData.nameOfCompany,
      equityCategory: reqData.equity,
      assetClass: reqData.assetClass,
      subAssetClass: reqData.subAssetClass,
      exchange: reqData.exchange,
      transactionType: "buy",
      price: reqData.lastPrice,
      quantity: quantity,
      value: value,
      allocation: "90",
      portfoliodetail: {
        portfolioName: transferObject.portfolioName,
      },
    };
    HeaderService.createComposition(compositionObject)
      .then((response) => {
        console.log(response.data);
        // setMessage("security added succesfully");
        setSavedData(response.data);
        setNameOfCompany("");
        setReqData("");
        setValue("");
        setQuantity("");
      })
      .catch((error) => {
        console.log(error);
      });
      window.alert("Security added succesfully");
  };

  //console.log(masterData);

  return (
    <div>
      {/* <div>
        <Navbar />
      </div> */}
      <div className="c1">
        <h1>Asset and Holdings Details</h1>
        <div className="box"></div>

        <div className="container">
          <table className="table table-bordered container">
            <thead>
              <tr style={{ backgroundColor: "black", color: "white" }}>
                <th>Portfolio Name</th>
                <th>Theme Name</th>
                <th>Investment Amount</th>
                <th>Available Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{transferObject.portfolioName}</td>
                <td> {transferObject.themeName}</td>
                <td>{transferObject.initialInvestment}</td>
                <td>{availableBalance}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <div className="container">
          <h2>Portfolio Composition</h2>
          <div className="t-gap">
            <table className="table table-bordered table-striped container">
             
              <thead>
                <tr style={{ backgroundColor: "black", color: "white" }}>
                  <th>Security Name</th>
                  <th>Asset Class</th>
                  <th>Sub Asset Class</th>
                  <th>Equity Category</th>
                  <th>Security Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Transaction Date</th>
                </tr>
              </thead>
              <tbody>
                {compositionData.loading
                  ? ""
                  : (
                    compositionData.data.portfoliocomposition.map(
                      (item, index) => {
                        return (
                          <tr key={item.portfolioCompostionId}>
                            <td>{item.securityName}</td>
                            <td>{item.assetClass}</td>
                            <td>{item.subAssetClass}</td>
                            <td>{item.equityCategory}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.value}</td>
                            <td>{item.transactionDate}</td>
                          </tr>
                        );
                      }
                    ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="c2">
          <button className="btn btn-primary l1" type="submit" onClick={savePortfolioComposition}>Add securities</button>
        </div>
        <table>
          <tr bgcolor="#FFC300">
            <th>Security Name</th>
            <th>Asset class</th>
            <th>SubAsset class</th>
            <th>Equity Category</th>
            <th>Security Price</th>
            <th>Quantity</th>
            <th>Value</th>
            {/* <th>Action</th> */}
          </tr>
          <tr>
            <td>
              <input
                value={nameOfCompany}
                list="stocks"
                placeholder="search for the company"
                ref={nameInput}
                onChange={handleSearch}
              ></input>
              <datalist id="stocks">
                <option value="">Select the Company</option>
                {masterData.map((item) => {
                  return (
                    <option value={item.nameOfCompany}>
                      {item.nameOfCompany}
                    </option>
                  );
                })}
              </datalist>
              {/* <input type="submit" onClick={handleSearch}></input> */}

              {/* <select value={isinNumber} onChange={handleChange}>
                <option value="">Select the Company</option>
                {masterData.map((item) => {
                  return (
                    <option value={item.isinNumber}>
                      {item.nameOfCompany}
                    </option>
                  );
                })}
              </select> */}
              {/* <select value={nameOfCompany} onChange={handleChange}>
                <option value="">Select the Company</option>
                {masterData.map((item) => {
                  return (
                    <option value={item.nameOfCompany}>
                      {item.nameOfCompany}
                    </option>
                  );
                })}
              </select> */}
            </td>
            <td>{reqData.assetClass}</td>
            <td>{reqData.subAssetClass}</td>
            <td>{reqData.equity}</td>
            <td>{reqData.lastPrice}</td>
            <td>
              {reqData.length >= 0 ? (
                ""
              ) : (
                <input
                  type="number"
                  value={quantity}
                  onChange={calculateValue}
                ></input>
              )}
            </td>
            <td>{value}</td>
          </tr>
        </table>
        {/* <div className="sub">
          <button
            className="btn btn-info submit"
            type="submit"
            onClick={savePortfolioComposition}
          >
            SAVE
          </button> */}

          <div>{message}</div>
       
      </div>
    </div>
  );
};

export default PortComposition;
