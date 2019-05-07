import React from "react";
import * as d3 from "d3";

export const PieChart = props => {
  const height = 500;
  const width = 550;
  //console.log(props.data);
  let pie;
  if (props.type === "views") {
    pie = d3.pie().value(d => d.views)(props.data);
  } 
  else if (props.type === "upvotes") {
    console.log(props.data);
    pie = d3.pie().value(d => d.upVotes.length)(props.data);
  } else if (props.type === "downvotes") {
    pie = d3.pie().value(d => d.downVotesCount)(props.data);
  }

  

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2} ${height / 2})`}>
        <Slice pie={pie} data={props.data} type={props.type}/>
      </g>
    </svg>
  );
};

const Slice = props => {
  let { pie, data } = props;
  let type = props.type;
  //console.log(data);
  let arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(200);

  let interpolate = d3.interpolateRgb("#eaaf79", "#b92b27");

  return pie.map((slice, index) => {
    let sliceColor = interpolate(index / (pie.length - 1));
    return (
      <path d={arc(slice)} fill={sliceColor}>
        <title>
          {/* {data[index].questionId + ": " + data[index].views} */}
          {(() => {
            switch (type) {
              case "views":
                return "Answer " + (index + 1) + " : " + data[index].views;
              case "upvotes":
                return "Answer " + (index + 1) + " : " + data[index].upVotes.length;
              case "downvotes":
                return "Answer " + (index + 1) + " : " + data[index].downVotesCount;
            }
          })()}
        </title>
      </path>
    );
  });
};

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
