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
   console.log("dates",dates)
    // Sort the dates in ascending order
    const prices =  Array.isArray(dates) &&  dates.map(date => {
      const totalPrice = Array.isArray(filteredExpenses) && filteredExpenses
        .filter(expense => new Date(expense.date).toDateString() === date.toDateString())
        .reduce((total, expense) => total + expense.price, 0);
      return totalPrice;
    });
    console.log(prices)

    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

    
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
        responsive: true,
    maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day', // Display labels by day
              displayFormats: {
                day: 'MMM dd' // Format for displaying month and day
              },
              },
            ticks: {
              stepSize: 5 // Set the interval between ticks to 5000
            },
            beginAtZero: true

          },
          y: {
            beginAtZero: false,
            min: minPrice, // Set the minimum value of the y-axis to the minimum price
            ticks: {
              stepSize: 5000 // Set the interval between ticks to 5000
            }
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
        responsive: true,
    maintainAspectRatio: false,
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
  
  const UsedmaterialsChartRef = useRef(null);
  const [UsedmaterialsChartInstance, setUsedMaterialsChartInstance] = useState(null);
  const [UsedmaterialsData, setUsedMaterialsData] = useState([]);

  useEffect(() => {
    fetchUsedMaterialsData();
  }, []);

  const fetchUsedMaterialsData = async () => {
    try {
      const response = await axios.get('/material/materials');
      setUsedMaterialsData(response.data);
    } catch (error) {
      console.error('Error fetching materials data:', error);
    }
  };

  useEffect(() => {
    if (UsedmaterialsData.length > 0) {
      destroyChartInstance(UsedmaterialsChartInstance);
      renderUsedMaterialsChart();
    }
  }, [UsedmaterialsData]);

  

  const renderUsedMaterialsChart = () => {
    const ctx = UsedmaterialsChartRef.current.getContext('2d');
    const materialLabels =Array.isArray(UsedmaterialsData) &&   UsedmaterialsData.map(material => material.name);
    const materialQuantities =Array.isArray(UsedmaterialsData) &&   UsedmaterialsData.map(material => material.quantity);

    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: materialLabels,
        datasets: [{
          label: 'Material Quantity',
          data: materialQuantities,
          backgroundColor: Array.isArray(materialQuantities) &&   materialQuantities.map(quantity => quantity < 10 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)'),
          borderColor: Array.isArray(materialQuantities) &&  materialQuantities.map(quantity => quantity < 10 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)'),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
    maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    setUsedMaterialsChartInstance(chartInstance);
  };
  return (
   <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="mb-8" style={{ height: '400px' }}>
        <h2 className="text-xl font-bold mb-4">Total Expenses Amount: ${calculateTotalExpenses()}</h2>
        <canvas ref={expensesChartRef} style={{ width: '100%', height: '100%' }}></canvas>
      </div>

      <div className="flex flex-wrap mt-16">
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0" style={{ height: '400px' }}>
          <h2 className="text-xl font-bold mb-4">Total Materials Rented Count: {calculateTotalRentedCount()}</h2>
          <canvas ref={materialsChartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>

        <div className="w-full lg:w-1/2 mb-4 lg:mb-0" style={{ height: '400px' }}>
          <h2 className="text-xl font-bold mb-4">Materials Inventory</h2>
          <canvas ref={UsedmaterialsChartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
