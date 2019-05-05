import React from'react';
import * as d3 from 'd3';

const data = [1, 2, 4, 6];

export const PieChart = (props) => {
    const height = 600;
    const width = 700;
    console.log(props.data)
    let pie = d3.pie().value(d => d.views)(props.data);

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

    let arc = d3.arc().innerRadius(0).outerRadius(200);

    let interpolate = d3.interpolateRgb("#eaaf79", "#b92b27");

    return pie.map((slice, index) => {
        let sliceColor = interpolate(index / (pie.length - 1));
         return <path d={arc(slice)} fill={sliceColor}></path>
    })
}

// class PieChart extends React.Component{

//     constructor(props)
//     {
//         super(props);
//         this.state={
//             labels:['Under 18', 'Age 18-54',  'Age 55+'],
//             datasets:[{
//                 data: [2000, 4000, 6000],
//                 bgColors: ['red', 'blue', 'greeb']
//             }]
//         }

//     }

//     render(){
//         return(
//             <div>
//                 <Pie
//                 data={{
//                     labels:this.state.labels,
//                     datasets: this.state.datasets
//                 }}
//                 height='50%'
//                 />

//             </div>
//         )
//     }
// }

// export default PieChart;