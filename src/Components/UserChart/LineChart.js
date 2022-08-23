import React, { useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

const LineChart = ({ logData }) => {
  var UserData = {};

  logData.map((val) => {
    if (!Object.keys(UserData).includes(val.time.substr(0, 10))) {
      UserData[val.time.substr(0, 10)] = 1;
    } else {
      UserData[val.time.substr(0, 10)] += 1;
    }
    return null;
  });

  function sortObj(obj) {
    return Object.keys(obj)
      .sort()
      .reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {});
  }
  UserData = sortObj(UserData);
  useEffect(() => {}, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Conversions Chart",
        position: "bottom",
        font: { size: 10 },
      },
    },
    scales: {
      x: {
        display: false,
      },
    },
  };

  const data = {
    // labels,
    datasets: [
      {
        label: "Dataset 1",
        data: UserData,
        borderColor: "rgb(0,0,0)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0.4,
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
