import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "@reactchartjs/react-chart.js";

const BesttagsSection = ({
  animatedItem,
  useScrollEventListener,
  chartdata,
  handleChartdata,
}) => {
  const state = useSelector((state) => state.surpinReducer);
  const { tags } = state;
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

  return (
    <div className="besttagsSection">
      <div className="besttags__title">Best Tags</div>
      <div {...animatedItem} className="besttags__chart">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BesttagsSection;
