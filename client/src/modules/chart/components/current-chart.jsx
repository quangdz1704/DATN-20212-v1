import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { ChartActions } from "../redux/actions";

const convertDataToChart =(data)=> {
    const label = [];
    const dataChart = {
      heater: [],
      lightning: [],
      powerSocket: [],
      roomAirConditionor: [],
      workingAirConditionor: [],
      topFloor: []
    }
    let sumHeaterInPeriod = 0;
      let sumLightInPeriod = 0;
      let sumSocketInPeriod = 0;
      let sumRoomACInPeriod = 0;
      let sumWorkingACInPeriod = 0;
      let sumTopFloorInPeriod = 0;
      
    for(let i=0; i<data.length-1; i++){
      
      if( dayjs(data[i].time).format('DD-MM-YYYY') !== dayjs(data[i+1].time).format('DD-MM-YYYY')){
        label.push(dayjs(data[i].time).format('DD-MM-YYYY'));
        dataChart.heater.push(sumHeaterInPeriod);
        dataChart.lightning.push(sumLightInPeriod);
        dataChart.powerSocket.push(sumSocketInPeriod);
        dataChart.roomAirConditionor.push(sumRoomACInPeriod);
        dataChart.workingAirConditionor.push(sumWorkingACInPeriod);
        dataChart.topFloor.push(sumTopFloorInPeriod);

        sumHeaterInPeriod = 0;
        sumLightInPeriod = 0;
        sumSocketInPeriod = 0;
        sumRoomACInPeriod = 0;
        sumWorkingACInPeriod = 0;
        sumTopFloorInPeriod = 0;
      }
      else{
        sumHeaterInPeriod += data[i].heater || 0 ;
        sumLightInPeriod += data[i].lightning || 0 ;
        sumSocketInPeriod += data[i].powerSocketket || 0 ;
        sumRoomACInPeriod += data[i].roomAirConditionor ||0 ;
        sumWorkingACInPeriod += data[i].workingAirConditionor || 0 ;
        sumTopFloorInPeriod += data[i].topFloor || 0 ;
      }
    }
    console.log("res", label, dataChart);
return {
  label,
  dataChart
}
}

function CurrentChart(props) {

    const { chart } = props;
    const [label, setLabel] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        props.getCurrentData();
    }, [])

    useEffect(() => {
        if(chart?.current?.data){
          const dataConverted = convertDataToChart(chart.current.data);
          setLabel(dataConverted.label);
          setDataChart(dataConverted.dataChart);
        }
    }, [chart.current])

    const state = {
      options: {
        chart: {
          id: "basic-bar",
          type: "area",
          background: '#fff'
        },
        xaxis: {
          categories: label
        },
        yaxis:{
          labels:{
            formatter: (val) => {return Math.round(val * 100) / 100}
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
      series: [{
        name: 'Heater',
        data: dataChart.heater
      }, 
      {
        name: 'Lightning',
        data: dataChart.lightning
      },
      {
        name: 'Power Socket',
        data: dataChart.powerSocket
      },
      {
        name: 'Room Conditionor',
        data: dataChart.roomAirConditionor
      },
      {
        name: 'Working Conditionor',
        data: dataChart.workingAirConditionor
      },
      {
        name: 'Top floor',
        data: dataChart.topFloor
      }
    ],
    };

    return (
          <div style={{marginLeft: 300}}>
          <Chart
              options={state.options}
              series={state.series}
              // type="bar"
              width="1000"
            />
            {/* <Line
            data={{
              labels: label,
              datasets: [
                {
                  data: dataChart.heater,
                  label: "Heater",
                  borderColor: "#3e95cd",
                  fill: false,
                  
                },
                {
                  data: dataChart.lightning,
                  label: "Lightning",
                  borderColor: "#8e5ea2",
                  fill: false,
                  
                },
                {
                  data: dataChart.roomAirConditionor,
                  label: "Room AC",
                  borderColor: "#3cba9f",
                  fill: false,
                  
                },
                {
                  data: dataChart.powerSocket,
                  label: "Current Socket",
                  borderColor: "#e8c3b9",
                  fill: false,
                  
                },
                {
                  data: dataChart.workingAirConditionor,
                  label: "Working AC",
                  borderColor: "#c45850",
                  fill: false,
                  
                },
                {
                  data: dataChart.topFloor,
                  label: "Top Floor",
                  borderColor: "#c45850",
                  fill: false,
                  
                }
              ]
            }}
            options={{
              title: {
                display: true,
                text: "World population per region (in millions)"
              },
              legend: {
                display: true,
                position: "bottom"
              }
            }}
        /> */}
        </div>
    )
}

function mapState(state) {
    const chart = state.chart;
    return { chart }
}

const actions = {
    getCurrentData: ChartActions.getCurrentData,
}

const connectedCurrentChart = connect(mapState, actions)(withTranslate(CurrentChart));
export { connectedCurrentChart as CurrentChart };

