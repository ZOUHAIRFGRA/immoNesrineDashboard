import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import 'chartjs-adapter-date-fns';
const Dashboard = () => {
  const [expensesData, setExpensesData] = useState([]);
  const [materialsData, setMaterialsData] = useState([]);
  const expensesChartRef = useRef(null);
  const materialsChartRef = useRef(null);
  const [expensesChartInstance, setExpensesChartInstance] = useState(null);
  const [materialsChartInstance, setMaterialsChartInstance] = useState(null);

  useEffect(() => {
    fetchExpensesData();
    fetchRentsData();
  }, []);

  const fetchExpensesData = async () => {
    try {
      const response = await axios.get('/expense/expenses');
      setExpensesData(response.data);
    } catch (error) {
      console.error('Error fetching expenses data:', error);
    }
  };

  const fetchRentsData = async () => {
    try {
      const response = await axios.get('/rent/rents');
      const materialDataFromRents = response.data;
      const mapped = Array.isArray(materialDataFromRents) && materialDataFromRents.map(rent => rent.material)
      console.log(mapped)
      setMaterialsData(mapped);
    } catch (error) {
      console.error('Error fetching rents data:', error);
    }
  };

  useEffect(() => {
    if (expensesData.length > 0) {
      destroyChartInstance(expensesChartInstance);
      renderExpensesChart();
    }
  }, [expensesData]);

  useEffect(() => {
    if (materialsData.length > 0) {
      destroyChartInstance(materialsChartInstance);
      renderMaterialsChart();
    }
  }, [materialsData]);

  const destroyChartInstance = (chartInstance) => {
    if (chartInstance !== null) {
      chartInstance.destroy();
    }
  };

  const renderExpensesChart = () => {
    const ctx = expensesChartRef.current.getContext('2d');
    
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the date 3 months ago
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
    // Filter expensesData for the past 3 months
    const filteredExpenses = Array.isArray(expensesData) && expensesData.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= threeMonthsAgo && expenseDate <= currentDate;
    });
  
    // Extract dates and prices from filtered expenses
    const dates = Array.isArray(filteredExpenses) && filteredExpenses.map(expense => new Date(expense.date)).sort((a, b) => a - b);
    // Sort the dates in ascending order
    const prices =  Array.isArray(dates) &&  dates.map(date => {
      const totalPrice = Array.isArray(filteredExpenses) && filteredExpenses
        .filter(expense => new Date(expense.date).toDateString() === date.toDateString())
        .reduce((total, expense) => total + expense.price, 0);
      return totalPrice;
    });

    const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

    
  const chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Expense Price',
        data: prices,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day', // Display labels by day
            displayFormats: {
              day: 'MMM dd' // Format for displaying month and day
            },
            stepSize: 15 // Display every 15 days
          },
          beginAtZero: true
        },
        y: {
          beginAtZero: true,
          min: minPrice, // Set the minimum value of the y-axis to the minimum price
          stepSize: 5000 // Set the interval between ticks to 5000
        }
      }
    }
  });
  
    setExpensesChartInstance(chartInstance);
  };
  
  

  const renderMaterialsChart = () => {
    const ctx = materialsChartRef.current.getContext('2d');
    const rentedCounts = calculateMaterialsRentedCount();
    const materialLabels = Object.keys(rentedCounts);

    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: materialLabels,
        datasets: [{
          label: 'Material Rented Count',
          data: Object.values(rentedCounts),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    setMaterialsChartInstance(chartInstance);
  };

  const calculateMaterialsRentedCount = () => {
    const rentedCountMap = {};
    Array.isArray(materialsData) && materialsData.forEach(material => {
      if (material.name in rentedCountMap) {
        rentedCountMap[material.name]++;
      } else {
        rentedCountMap[material.name] = 1;
      }
    });
    return rentedCountMap;
  };

  const calculateTotalExpenses = () => {
    return Array.isArray(expensesData) && expensesData.reduce((total, expense) => total + expense.price, 0);
  };

  const calculateTotalRentedCount = () => {
    return Object.values(calculateMaterialsRentedCount()).reduce((total, count) => total + count, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
  
  <div className="flex flex-wrap mb-8">
    <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
      <h2 className="text-xl font-bold mb-4">Total Expenses Amount: ${calculateTotalExpenses()}</h2>
      <canvas ref={expensesChartRef} style={{ width: '100%', height: '400px' }}></canvas>
    </div>

    <div className="w-full lg:w-1/2">
      <h2 className="text-xl font-bold mb-4">Total Materials Rented Count: {calculateTotalRentedCount()}</h2>
      <canvas ref={materialsChartRef} style={{ width: '100%', height: '400px' }}></canvas>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
