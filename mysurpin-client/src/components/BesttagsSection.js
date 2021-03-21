import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "@reactchartjs/react-chart.js";

const BesttagsSection = () => {
  const state = useSelector((state) => state.surpinReducer);
  const { tags } = state;
  const [chartdata, setChartdata] = useState(["0", "0", "0", "0", "0", "0"]);

  let data = {
    labels: chartdata,
    datasets: [
      {
        label: "# of Votes",
        data: chartdata,
        fill: false,
        backgroundColor: "rgb(255, 99, 132, 0)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const handleChartdata = () => {
    setChartdata([12, 19, 3, 5, 2, 3]);
  };

  return (
    <div className="besttagsSection">
      <div className="besttags__title">Best Tags</div>
      <div className="besttags__chart">
        <Line data={data} options={options} />
      </div>
      <button onClick={handleChartdata}>그래프 올라와라!</button>
    </div>
  );
};

export default BesttagsSection;
