import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Dashboard: React.FC = () => {
  const incomeChartRef = useRef<HTMLCanvasElement | null>(null);
  const expenseChartRef = useRef<HTMLCanvasElement | null>(null);
  const balanceChartRef = useRef<HTMLCanvasElement | null>(null);
  
  // Charts initialization
  useEffect(() => {
    let incomeChart: Chart | null = null;
    let expenseChart: Chart | null = null;
    let balanceChart: Chart | null = null;
    
    if (incomeChartRef.current) {
      incomeChart = new Chart(incomeChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Income (2025)',
            data: [12500, 13200, 15000, 14200, 16500, 17800],
            borderColor: '#1a56db',
            backgroundColor: 'rgba(26, 86, 219, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
    
    if (expenseChartRef.current) {
      expenseChart = new Chart(expenseChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Expenses (2025)',
            data: [8500, 9200, 9800, 10500, 11200, 12400],
            backgroundColor: '#f59e0b'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
    
    if (balanceChartRef.current) {
      balanceChart = new Chart(balanceChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Net Balance (2025)',
            data: [4000, 4000, 5200, 3700, 5300, 5400],
            borderColor: '#00A67E',
            backgroundColor: 'rgba(0, 166, 126, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
    
    // Cleanup function
    return () => {
      if (incomeChart) incomeChart.destroy();
      if (expenseChart) expenseChart.destroy();
      if (balanceChart) balanceChart.destroy();
    };
  }, []);
  
  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Dashboard</h1>
        <div className="d-flex">
          <button type="button" className="btn btn-outline-primary">
            <i className="bi bi-file-earmark-pdf me-2"></i>
            Export Report
          </button>
        </div>
      </div>
      
      {/* Financial Summary */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon bg-primary-light">
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Total Income</p>
              <h3 className="stat-value">$89,200</h3>
              <p className="stat-change positive">
                <i className="bi bi-arrow-up-short"></i> 
                8.1% vs last month
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon bg-warning-light">
              <i className="bi bi-cash-coin"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Total Expenses</p>
              <h3 className="stat-value">$61,600</h3>
              <p className="stat-change negative">
                <i className="bi bi-arrow-up-short"></i> 
                10.7% vs last month
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon bg-success-light">
              <i className="bi bi-wallet2"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Net Balance</p>
              <h3 className="stat-value">$27,600</h3>
              <p className="stat-change positive">
                <i className="bi bi-arrow-up-short"></i> 
                2.3% vs last month
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon bg-danger-light">
              <i className="bi bi-people"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Total Donors</p>
              <h3 className="stat-value">242</h3>
              <p className="stat-change positive">
                <i className="bi bi-arrow-up-short"></i> 
                4.6% vs last month
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Income Trend</h5>
              <div className="dropdown">
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="incomeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Last 6 Months
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="incomeDropdown">
                  <li><a className="dropdown-item" href="#">Last 3 Months</a></li>
                  <li><a className="dropdown-item" href="#">Last 6 Months</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <canvas ref={incomeChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Expense Breakdown</h5>
              <div className="dropdown">
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="expenseDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Last 6 Months
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="expenseDropdown">
                  <li><a className="dropdown-item" href="#">Last 3 Months</a></li>
                  <li><a className="dropdown-item" href="#">Last 6 Months</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <canvas ref={expenseChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Third Row */}
      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Net Balance History</h5>
              <div className="dropdown">
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="balanceDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Last 6 Months
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="balanceDropdown">
                  <li><a className="dropdown-item" href="#">Last 3 Months</a></li>
                  <li><a className="dropdown-item" href="#">Last 6 Months</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <canvas ref={balanceChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Recent Transactions</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex align-items-center p-3">
                  <div className="me-3">
                    <span className="badge bg-success-light text-success">
                      <i className="bi bi-graph-up-arrow"></i>
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-medium">Sunday Collection</p>
                    <small className="text-muted">June 25, 2025</small>
                  </div>
                  <div className="text-end">
                    <span className="fw-medium text-success">+$3,240</span>
                  </div>
                </div>
                <div className="list-group-item d-flex align-items-center p-3">
                  <div className="me-3">
                    <span className="badge bg-warning-light text-warning">
                      <i className="bi bi-cash-coin"></i>
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-medium">Utilities Payment</p>
                    <small className="text-muted">June 22, 2025</small>
                  </div>
                  <div className="text-end">
                    <span className="fw-medium text-danger">-$845</span>
                  </div>
                </div>
                <div className="list-group-item d-flex align-items-center p-3">
                  <div className="me-3">
                    <span className="badge bg-success-light text-success">
                      <i className="bi bi-graph-up-arrow"></i>
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-medium">Special Donation</p>
                    <small className="text-muted">June 20, 2025</small>
                  </div>
                  <div className="text-end">
                    <span className="fw-medium text-success">+$1,500</span>
                  </div>
                </div>
                <div className="list-group-item d-flex align-items-center p-3">
                  <div className="me-3">
                    <span className="badge bg-warning-light text-warning">
                      <i className="bi bi-cash-coin"></i>
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-medium">Staff Salaries</p>
                    <small className="text-muted">June 15, 2025</small>
                  </div>
                  <div className="text-end">
                    <span className="fw-medium text-danger">-$2,780</span>
                  </div>
                </div>
                <div className="list-group-item d-flex align-items-center p-3">
                  <div className="me-3">
                    <span className="badge bg-success-light text-success">
                      <i className="bi bi-graph-up-arrow"></i>
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-medium">Building Fund</p>
                    <small className="text-muted">June 12, 2025</small>
                  </div>
                  <div className="text-end">
                    <span className="fw-medium text-success">+$950</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <a href="/income" className="btn btn-sm btn-outline-primary">View All Transactions</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;