import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { ChartActions } from "../redux/actions";

const getColor = (sum) =>{
  if(sum <= 200000) return {
    bg: '#35E67E',
    border: '#26A35A'
  }
  else if(200000<sum<=500000){
    return {
      bg: '#FAF748',
      border: '#FF922B'
    }
  }
  else{
    return {
      bg: '#FF925D',
      border: '#FF3D16'
    }
  }
}

const convertDataToChart =(data)=> {
    const labelChart = [];
    const dataChart = [];
    const bgColor = [];
    const borderColor = [];
    let sumVolInPeriod = 0;
      
    for(let i=0; i<data.length - 1; i++){
      
      if( dayjs(data[i].time).format('DD-MM-YYYY') !== dayjs(data[i+1].time).format('DD-MM-YYYY')){
        dataChart.push(sumVolInPeriod);
        let color = getColor(sumVolInPeriod);
        bgColor.push(color.bg);
        borderColor.push(color.border);
        console.log("push new", dayjs(data[i].time).format('DD-MM-YYYY'));
        labelChart.push(dayjs(data[i].time).format('DD-MM-YYYY'));
        sumVolInPeriod = 0;
      }
      else{
        sumVolInPeriod += data[i].voltage || 0;
      }
    }
    // console.log("labellllllll", labelChart);
    const res = {
      labelChart: labelChart,
      dataChart,
      bgColor,
      borderColor
    }
    return res
}

function VoltageChart(props) {

    const { chart } = props;
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        props.getVoltageData();
    }, [])

    useEffect(() => {
        if(chart?.voltage?.data){
          const dataConverted = convertDataToChart(chart.voltage.data);
          // console.log("aloooooooooooo", dataConverted, chart.voltage.data);

          setDataChart(dataConverted);
        }
    }, [chart.voltage])

    // console.log("eeeeeeeeee", dataChart, chart?.voltage?.data);
    return (
      <React.Fragment>
          <Bar
            data={{
              labels: dataChart.labelChart,
              datasets: [
                {
                  label: 'Voltage',
                  data: dataChart.dataChart,
                  backgroundColor: dataChart.bgColor,
                  borderColor: dataChart.borderColor,
                  borderWidth: 1
              }]
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
          />
      </React.Fragment>
    )
}

function mapState(state) {
    const chart = state.chart;
    return { chart }
}

const actions = {
    getVoltageData: ChartActions.getVoltageData,
}

const connectedVoltageChart = connect(mapState, actions)(withTranslate(VoltageChart));
export { connectedVoltageChart as VoltageChart };

