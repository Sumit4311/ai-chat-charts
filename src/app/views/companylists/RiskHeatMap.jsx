import React from 'react'
import ReactApexChart from 'react-apexcharts'



const RiskHeatMap = (props) => {
  console.log("props123", props?.riskMapValue?.labelValuedto)

  const findingHeatmap = (e) => {
    const data = props?.riskMapValue?.labelValuedto?.filter(val => val.label === e)
    console.log("datataa",data);
    return ([{
      x: "",
      y: data?.[0]?.value
    }])
  }

  const generateData = (count, yrange) => {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = 'w' + (i + 1).toString();
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    console.log("seriesseries", series)
    return series;
  }

  const options = {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: false
        }
      }
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [{
            // from: -30,
            // to: 5,
            name: 'Low',
            color: '#60b9fd'
          },
          {
            // from: 6,
            // to: 20,
            name: 'Moderate',
            color: '#40eab0'
          },
          {
            // from: 21,
            // to: 45,
            name: 'Significant',
            color: '#feb527'
          },
          {
            // from: 46,
            // to: 55,
            name: 'High',
            color: '#ff8b9c'
          }
        ]
        }
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      width: 1
    },
    title: {
      text: ''
    },
  }

  const series = [
    {
      name: ' Low',
      data: findingHeatmap('Low')
    },
  
  {
    name: 'Moderate',
    data: findingHeatmap('Moderate')

  },
  
  {
    name: 'Significant',
    data: findingHeatmap('Significant')
  },
  {
    name: 'High',
    data: findingHeatmap('High')
  }
  ]


  return (
    <div>

      <ReactApexChart options={options} series={series} type="heatmap" height={510} />


    </div>
  )
}

export default RiskHeatMap