/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Line } from "@reactchartjs/react-chart.js";
import { useHistory } from "react-router-dom";
import { getTagLists } from "../actions/index";
const BesttagsSection = ({ animatedItem, chartdata, chartlabel }) => {
  const state = useSelector((state) => state.surpinReducer);
  const { tags } = state;
  const [gradient, setGradient] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const total_slides = chartlabel.length - 1;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 50, 200, 400);
    gradient.addColorStop(0, "rgba(138, 181, 247, 0.5)");
    gradient.addColorStop(0.35, "rgba(138, 181, 247, 0.25)");
    gradient.addColorStop(1, "rgba(138, 181, 247, 0)");
    setGradient(gradient);
  }, []);

  useEffect(() => {
    slideRef.current.style.transition = "all 1s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * 22}vw)`;
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide >= total_slides) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(total_slides);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSearch = (label) => {
    const payload = JSON.stringify({
      pagenumber: 1,
      tag: label,
    });
    fetch(`${process.env.REACT_APP_SERVER_URL}/surpin/searchlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: payload,
    })
      .then((res) => {
        return res;
      })
      .then((res) => res.json())
      .then((body) => {
        dispatch(getTagLists(body));
        history.push({
          pathname: "/searchpage",
          state: { searchTag: label },
        });
      })

      .catch((err) => console.error(err));
  };

  return (
    <div className="besttagsSection">
      <div className="besttags__title">Trend Now</div>

      <div className="besttags__rank">
        <div className="besttags__rank__elements" ref={slideRef}>
          <div className="wave__container">
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
          <div className="wave__container2">
            <div className="wave2 -one"></div>
            <div className="wave2 -two"></div>
            <div className="wave2 -three"></div>
          </div>
          <div className="wave__container3">
            <div className="wave3 -one"></div>
            <div className="wave3 -two"></div>
            <div className="wave3 -three"></div>
          </div>
          <div className="wave__container4">
            <div className="wave4 -one"></div>
            <div className="wave4 -two"></div>
            <div className="wave4 -three"></div>
          </div>
          {chartlabel.map((label, idx) => {
            return (
              <div
                className="besttags__rank__element"
                key={idx}
                onClick={() => handleSearch(label)}
              >
                <div className="ranking">Search Rank #{idx + 1}</div>
                <div className="ranking__tag">{label}</div>
              </div>
            );
          })}
        </div>
        <div className="besttags__btn__left">
          <button className="left" onClick={prevSlide}>
            {"<"}
          </button>
        </div>
        <div className="besttags__btn__right">
          <button className="right" onClick={nextSlide}>
            {">"}
          </button>
        </div>
      </div>
      <div className="besttags__search-rank">
        <span className="besttags__search-rank__title">실시간 TOP 10</span>
        {chartlabel.map((label, idx) => {
          return (
            <div
              key={idx}
              className="besttags__search-ranks"
              onClick={() => handleSearch(label)}
            >
              <div className="besttags__search-rank__idx">{idx + 1}</div>
              <div className="besttags__search-rank__label">{label} </div>
            </div>
          );
        })}
      </div>
      <div {...animatedItem} className="besttags__chart">
        <Line
          className="bestChart"
          id="myChart"
          data={{
            labels: chartlabel,
            datasets: [
              {
                backgroundColor: gradient,
                pointBackgroundColor: "rgba(138, 181, 247, 1)",
                borderColor: "rgba(138, 181, 247, 1)",
                label: "# of Surpins",
                data: chartdata,
                fill: true,
                lineTension: 0.2,
                borderWidth: 2,
                pointRadius: 3,
              },
            ],
          }}
          options={{
            layout: {
              padding: 10,
            },
            responsive: true,
            legend: {
              display: false,
            },
          }}
          scales={{
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  padding: 10,
                  autoSkip: false,
                  maxRotation: 15,
                  minRotation: 15,
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "My Surpin BEST",
                  padding: 10,
                },
                gridLines: {
                  display: false,
                  color: "rgba(80, 102, 120, 0.25)",
                },
                ticks: {
                  beginAtZero: false,
                  max: 63,
                  min: 57,
                  padding: 10,
                },
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
export default BesttagsSection;
