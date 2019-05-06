import React, { Component } from "react";
import * as d3 from "d3";
import axios from "axios";
import "./lineChart.css";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataAvailable: true
    };
  }
  componentWillReceiveProps = props => {
    const data = props.data;
    console.log(data);
    this.drawChart(data);

  };

  drawChart = dataset => {
    d3.select("#lineGraph").select("svg").remove();
    var margin = { top: 70, right: 70, bottom: 30, left: 75 };
    const width = window.innerWidth - 500;
    const height = 500;
    // var timeFormat =d3.timeParse("YYYY-MM-DD"); 
    var mindate = new Date(2019,3,6),
            maxdate = new Date(2019,4,6);
            console.log(mindate);
    var xScale = d3
      .scaleTime()
      .domain([
        d3.timeParse("%Y-%m-%d")(dataset[0].date),
        d3.timeParse("%Y-%m-%d")(dataset[30].date)
      ])
      .range([0, width]);

    var yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function(d) {
          return d.count;
        })
      ])
      .range([height, 0]);

    // xScale.domain(d3.extent(dataset, function(d) { return d.date; }));
    var line = d3
      .line()
      .x(function(d) {
        return xScale(d3.timeParse("%Y-%m-%d")(d.date));
      })
      .y(function(d) {
        return yScale(d.count);
      })
      .curve(d3.curveMonotoneX);


    var svg = d3
      // .select("body")
      .select("#lineGraph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + (margin.top - 20) + ")");

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale));

    svg
      .append("path")
      .datum(dataset)
      .attr("class", "line")
      .attr("d", line);

    svg
      .selectAll(".dot")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) {
        return xScale(d3.timeParse("%Y-%m-%d")(d.date));
      })
      .attr("cy", function(d) {
        return yScale(d.count);
      })
      .attr("r", 5)
      .on("mouseover", function(a, b, c) {
        d3.select(this)
          .attr("class", "focus")
          .attr("r", 10);
        svg
          .append("text")
          .attr("id", "temp")
          .attr("x", function() {
            return xScale(d3.timeParse("%Y-%m-%d")(a.date)) - 45;
          })
          .attr("y", function() {
            return yScale(a.count) - 20;
          })
          .text(function() {
            return [(a.date) + " ", " " + a.count];
          });
      })
      .on("mouseout", function(a, b) {
        d3.select(this).attr("class", "dot");
        d3.select(this).attr("r", 5);
        d3.select("#temp").remove();
      });

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + -50 + "," + height / 2 + ")rotate(-90)")
      .attr("style", "font-weight: bold; font-size: 14px")
      .text("Number of Profile Views");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + width / 2 + "," + (height + 40) + ")")
      .attr("style", "font-weight: bold; font-size: 14px")
      .text("Date");
  };
  render() {
    return (
      <div>
          {console.log("GHerererwe")}
        <div
          id="lineGraph"
          style={{
            display: this.state.isDataAvailable ? "block" : "none"
          }}
        />

        {/* <div
          style={{
            display: this.state.isDataAvailable ? "none" : "block"
          }}
        >
          <div className="alert alert-danger">
            <strong>Error!</strong> Data is not available please try again after
            few moments.
          </div>
        </div> */}
      </div>
    );
  }
}
export default LineChart;
