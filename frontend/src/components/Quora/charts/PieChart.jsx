import React from'react';
import * as d3 from 'd3';

const data = [1, 2, 4, 6];

export const PieChart = () => {
    const height = 800;
    const width = 800;

    let pie = d3.pie()(data);

    return(
        <svg height={height} width={width}>
            <g transform={`translate(${width/2} ${height/2})`}>
                <Slice pie={pie}></Slice>
            </g>
        </svg>
    )

}

const Slice = props => {
    let {pie} = props;

    let arc = d3.arc().innerRadius(0).outerRadius(100);

    let interpolate = d3.interpolateRgb("#eaaf79", "#bc3358");

    return pie.map((slice, index) => {
        let sliceColor = interpolate(index / (pie.length - 1));
         return <path d={arc(slice)} fill={sliceColor}></path>
    })
}