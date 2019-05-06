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
    componentDidMount() {

        const data = [{
            year: "2017",
            val: 20
        },
        {
            year: "2016",
            val: 30
        },
        {
            year: "2015",
            val: 27
        },
        {
            year: "2014",
            val: 12
        },
        {
            year: "2013",
            val: 17
        }]
        this.drawChart(data);

        // this.loadData();
    }
    // loadData = async () => {
    //     try {
    //         const res = await axios.get("/api/graph");
    //         this.drawChart(res.data);
    //         this.setState({
    //             isDataAvailable: true
    //         });
    //     } catch (error) {
    //         console.error("Error: ", error);
    //         this.setState({
    //             isDataAvailable: false
    //         });
    //     }
    // };
    drawChart = dataset => {
        // console.log(dataset);
        var margin = { top: 50, right: 70, bottom: 30, left: 75 };
        const width = window.innerWidth - 500;
        const height = window.innerHeight - 400;

        var xScale = d3
            .scaleLinear()
            .domain([
                d3.min(dataset, function(d) {
                    return d.year;
                }),
                d3.max(dataset, function(d) {
                    return d.year;
                })
            ])
            .range([0, width]);

        var yScale = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(dataset, function(d) {
                    return d.val;
                })
            ])
            .range([height, 0]);

        var line = d3
            .line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return yScale(d.val);
            })
            .curve(d3.curveMonotoneX);

        var svg = d3
            // .select("body")
            .select("#lineGraph")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));

        svg.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line);

        svg.selectAll(".dot")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", function(d) {
                return xScale(d.year);
            })
            .attr("cy", function(d) {
                return yScale(d.val);
            })
            .attr("r", 5)
            .on("mouseover", function(a, b, c) {
                d3.select(this)
                    .attr("class", "focus")
                    .attr("r", 10);
                svg.append("text")
                    .attr("id", "temp")
                    .attr("x", function() {
                        return xScale(a.year) - 45;
                    })
                    .attr("y", function() {
                        return yScale(a.val) - 20;
                    })
                    .text(function() {
                        return [a.year + " ", " " + a.val.toFixed(2)];
                    });
            })
            .on("mouseout", function(a, b) {
                d3.select(this).attr("class", "dot");
                d3.select(this).attr("r", 5);
                d3.select("#temp").remove();
            });

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr(
                "transform",
                "translate(" + -50 + "," + height / 2 + ")rotate(-90)"
            )
            .text("Number of Profile Views");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr(
                "transform",
                "translate(" + width / 2 + "," + (height + 30) + ")"
            )
            .text("Date");
    };
    render() {
        return (
            <div>
                <div
                    id="lineGraph"
                    style={{
                        display: this.state.isDataAvailable ? "block" : "none"
                    }}
                />

                <div
                    style={{
                        display: this.state.isDataAvailable ? "none" : "block"
                    }}
                >
                    <div className="alert alert-danger">
                        <strong>Error!</strong> Data is not available please try again after few moments.
                    </div>
                </div>
            </div>
        );
    }
}
export default LineChart;