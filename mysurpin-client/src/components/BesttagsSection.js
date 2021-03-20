import React from "react";
import { useSelector } from "react-redux";
import { Line } from "@reactchartjs/react-chart.js";

const BesttagsSection = () => {
  const state = useSelector((state) => state.surpinReducer);
  const { tags } = state;
  console.log("tags의 상태", tags);

  const data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
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

      <div className="besttags__chart"></div>
      <Line data={data} options={options} />
    </div>
  );
};

export default BesttagsSection;
