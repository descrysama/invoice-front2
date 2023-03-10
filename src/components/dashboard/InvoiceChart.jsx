import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';


const InvoiceChart = ({format}) => {



  const auth = useSelector(state => state.store);
    const options = {
      chart: {
        type: "area",
        height: 280,
        toolbar : {
          show : false
        },
        
      },  dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      
      xaxis: {
        categories: format === "week" ? auth.invoicesByWeek.map((d) => d._id) : format === "month" ? auth.invoicesByMonth.map((d) => d._id) : auth.invoicesByHour.map((d) => d._id +":00h"),
      },
      series: [
        {
          name: "Sales",
          data: format === "week" ? auth.invoicesByWeek.map((d) => d.count) : format ==="month" ? auth.invoicesByMonth.map((d) => d.count) : auth.invoicesByHour.map((d) => d.count),
        },
      ],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 0.3,
          stops: [0, 100]
        }
      },
      grid : {
        show:false
      }
  }
  
    return (
      <div className="chart bg-white">
        <Chart options={options} series={options.series} height={280} type="area" />
      </div>
    );
  };


export default InvoiceChart;