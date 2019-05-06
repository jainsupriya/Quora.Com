// import React from "react";
// import Chart from 'chart.js'

// class LineChart extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     const node = this.node;

//     var myChart = new Chart(node, {
//       type: "line",
//       data: {
//         labels: ["Red", "Blue", "Yellow"],
//         datasets: [
//           {
//             label: "# of Likes",
//             data: [12, 19, 3],
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.2)",
//               "rgba(54, 162, 235, 0.2)",
//               "rgba(255, 206, 86, 0.2)"
//             ]
//           }
//         ]
//       }
//     });
//   }

//   render() {
//     return (
//       <div>
//         <canvas
//           style={{ width: '80%', height: '80%' }}
//           ref={node => (this.node = node)}
//         />
//       </div>
//     );
//   }
// }

// export default LineChart;

import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class LineChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
      <div className="chart">
        {/* <Bar
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        /> */}

        <Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

        {/* <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        /> */}
      </div>
    )
  }
}

export default LineChart;