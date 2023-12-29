import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";
  import { Bar, Doughnut } from "react-chartjs-2";


  ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  );
function CostSavingsDonutChart(props) {

    const data = {
        labels: ['EC2', 'S3', 'RDS', 'VPC', 'CloudFoundation'],
        datasets: [{
            label: 'Cost Savings',
            data: [832000, 250000, 150000, 1250000, 90000],
            backgroundColor: ['#E6F69D', '#AADEA7','#64C2A6','#2D87BB'],
            borderColor: ['#E6F69D', '#AADEA7','#64C2A6','#2D87BB'],
        }]
    }

    const options = {

    }

    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart, args, pluginsOptions) {
            const {ctx, data} = chart;

            ctx.save();
            ctx.font = 'bolder 15px sans-serif';
            ctx.fillStyle ='gray';
            ctx.textAlign ='center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`$${data.datasets[0].data[0]}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
        }
    }
  return (
    <div >

        <Doughnut
            data = {data}
            options ={options}
            plugins = {[textCenter]}
        >
        </Doughnut>

    </div>
  )
}

export default CostSavingsDonutChart