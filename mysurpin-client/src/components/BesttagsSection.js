import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "@reactchartjs/react-chart.js";

const BesttagsSection = ({ animatedItem, chartdata }) => {
  const state = useSelector((state) => state.surpinReducer);
  const { tags } = state;
  const [chartDataset, setChartdataset] = useState({});

  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(75,192,192,0.7)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    let data = {
      labels: chartdata,
      datasets: [
        {
          backgroundColor: gradient,
          label: "# of Votes",
          data: chartdata,
          fill: true,
        },
      ],
    };
    setChartdataset(data);
  }, [chartDataset]);

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
        <Line id="myChart" data={chartDataset} options={options} />
      </div>
    </div>
  );
};
export default BesttagsSection;
