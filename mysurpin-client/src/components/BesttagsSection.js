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
        data: [12, 19, 3, 5, 2, 3],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
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
