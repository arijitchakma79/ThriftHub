import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs, Tooltip, Legend, ArcElement, Title } from 'chart.js';

ChartJs.register(Tooltip, Legend, ArcElement, Title);

const CustomPieChart = ({data}) => {


  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default CustomPieChart;
