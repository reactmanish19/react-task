import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import logs from "../../Assets/logs.json";
import LineChart from "../../Components/UserChart/LineChart";
import Loader from "../../Components/Loader/Loader";

const Users = () => {
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    // API call for User Data
    axios({
      url: "https://api.airtable.com/v0/appBTaX8XIvvr6zEC/tblYPd5g5k5IKIc98",
      method: "GET",
      headers: {
        Authorization: "Bearer key4v56MUqVr9sNJv",
      },
    })
      .then(function (response) {
        return response.data.records;
      })
      .then((data) => {
        console.log(data)
        setuserData(data);
      });
  }, []);

  // Logs Calculations
  const logsCalc = (val) => {
    let totalImpressions = 0;
    let totalConversions = 0;
    let totalRevenue = 0;

    // Loop for Logs
    logs.map((value) => {
      if (value.user_id === val.fields.Id) {
        totalRevenue += value.revenue;
        if (value.type === "conversion") totalConversions++;
        else if (value.type === "impression") totalImpressions++;
      }
      return null;
    });

    return (
      <>
        <p className="staticData" style={{ color: "orange" }}>
          {totalImpressions}
        </p>
        <p className="staticLabel">Impressions</p>
        <p className="staticData" style={{ color: "blue" }}>
          {totalConversions}
        </p>
        <p className="staticLabel">Conversions </p>
        <p className="staticData" style={{ color: "green" }}>
          $ {totalRevenue.toFixed(2)}
        </p>
        <p className="staticLabel">Revenue</p>
      </>
    );
  };

  // Loop for Users
  var cards = userData.map((val, ind) => {
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return (
      <>
        <div className="col-md-4" key={ind}>
          <Card.Body>
            <div style={{ display: "flex" }}>
              <div className="profileImage" style={{background:randomColor}}>{val.fields.Name[0]}</div>
              <div className="userDetails">
                <div className="userName">{val.fields.Name}</div>
                <div className="userOccupation">{val.fields.occupation}</div>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div className="charts">
                <LineChart
                  logData={logs.filter(
                    (logval) => logval.user_id === val.fields.Id
                  )}
                />
              </div>
              <div className="statics">{logsCalc(val)}</div>
            </div>
          </Card.Body>
        </div>
      </>
    );
  });

  return (
    <>
      <h1>USERS</h1>
      <div className="row justify-content-center">
        {userData.length === 0 ? <Loader /> : cards}
      </div>
    </>
  );
};

export default Users;
