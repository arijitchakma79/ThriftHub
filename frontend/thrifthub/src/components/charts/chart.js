/*import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Chart = ({ incomeData: data }) => {
  // Create an object to count income by category
  const categoryCounts = {};
  data.forEach((income) => {
    if (categoryCounts[income.category]) {
      categoryCounts[income.category]++;
    } else {
      categoryCounts[income.category] = 1;
    }
  });

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          // Add more colors for additional categories
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          // Add more colors for additional categories
        ],
      },
    ],
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-md w-90">
      <h2 className="text-xl font-semibold text-white mb-4">Income Categories</h2>
      <div className="h-80">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default Chart;
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Chart = () => {
  // Sample data for the chart
  const sampleData = {
    labels: ['Category A', 'Category B', 'Category C'],
    datasets: [
      {
        data: [300, 500, 200],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-md w-90">
      <h2 className="text-xl font-semibold text-white mb-4">Income Categories</h2>
      <div className="h-80">
        <Doughnut data={sampleData} />
      </div>
    </div>
  );
};

export default Chart;
*/

