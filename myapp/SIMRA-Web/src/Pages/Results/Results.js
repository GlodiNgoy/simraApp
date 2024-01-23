import React, { useState } from 'react';
import Chart from "react-apexcharts";

function graph(){

    
    const [state, setState] = useState({
        options: {
          colors: ["#4472c4", "#ed7d31", "#a5a5a5", "#ffc000", "#5b9bd5", "#70ad47", "#264478", "#9e480e"],
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: ['Tshilapfene', 'Njhakanjhaka', 'Ha-mutsha', 'Tsiada'],
          },
          plotOptions: {
            bar: {
              columnWidth: '80%',
              barPadding: 20,
              dataLabels: {
                position: 'top',
                enabled: false, 
                style: {
                    fontSize: '0px',
                    fontWeight: 'bold',
                  },
              },
            },
            barHeight: '80%', 
            distributed: true,
            
          },
          yaxis: {
            title: {
              text: 'MEAN CFU/100 ml',
            },
          },
          
          grid: {
            show: false, 
          },
        },
        series: [
          {
            name: "C.perfringes",
            data: [100, 100, 250, 250],
            barWidth: 10,
            
          },
          {
            name: "C. perfriges wet",
            data: [18000, 25000, 22000, 19000],
            barWidth: 10,
            
          },
          {
            name: "Faecal coliform dry",
            data: [180000, 250000, 220000, 190000],
            barWidth: 10,
            
          },
          {
            name: "Faecal coliform wet",
            data: [205000, 215000, 217000, 190000],
            barWidth: 10,
           
          },
          {
            name: "E. coli dry",
            data: [10000, 5000, 9000, 10000],
            barWidth: 10,
            
          },
          {
            name: "E. coli wet",
            data: [120000, 110000, 120000, 105000],
            barWidth: 10,
            
          },
          {
            name: "E. faecalis dry",
            data: [130000, 175000, 200000, 130000],
            barWidth: 10,
          },
          {
            name: "E. faecalis wet",
            data: [190000, 175000, 180000, 220000],
            barWidth: 10,
          },
        ],
      });
      return (
        <div >
        <h1 style={{ textAlign: 'center'}}>
          Results: FIB 
        </h1>
        <div>
          <div>
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="100%"
              height="400%"
             
            />
          </div>
        </div>
      </div>
      );
}

export default graph