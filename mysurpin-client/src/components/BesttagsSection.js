import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

const BesttagsSection = () => {
  const state = useSelector((state) => state.surpinReducer);
  const { tags } = state;
  console.log("tags의 상태", tags);

  const data = {
    // 각 막대별 라벨
    labels: ["TAG", "TAG", "TAG", "TAG", "TAG", "TAG"],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [1, 2, 3, 2, 1], // 수치
        backgroundColor: ["yellow", "red", "green", "blue", "black"], // 각 막대 색
      },
    ],
  };

  const options = {
    legend: {
      display: false, // label 보이기 여부
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0, // y축 스케일에 대한 최소값 설정
            stepSize: 1, // y축 그리드 한 칸당 수치
          },
          animation: {
            duration: 2, // general animation time
          },
          hover: {
            animationDuration: 0, // duration of animations when hovering an item
          },
          responsiveAnimationDuration: 0, // animation duration after a resize
        },
      ],
    },

    // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    // true : 크기가 알아서 결정됨.
    maintainAspectRatio: false,
  };

  return (
    <div className="besttagsSection">
      <div className="besttags__title">Best Tags</div>
      <Bar data={data} width={300} height={200} options={options} />
      <div className="besttags__chart"></div>
    </div>
  );
};

export default BesttagsSection;
