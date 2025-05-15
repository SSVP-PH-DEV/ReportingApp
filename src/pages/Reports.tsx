import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'chart.js/auto';

const Reports: React.FC = () => {
  const location = useLocation();
  const [reportType, setReportType] = useState('monthly');
  const [dateRange, setDateRange] = useState({
    start: '2025-01-01',
    end: '2025-06-30'
  });
  
  const incomeVsExpenseChartRef = useRef<HTMLCanvasElement | null>(null);
  const categoryBreakdownChartRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    // Set report type based on URL path
    const path = location.pathname.split('/').pop();
    if (path && ['monthly', 'quarterly', 'annual', 'custom'].includes(path)) {
      setReportType(path);
    }
    
    // Initialize charts
    let incomeVsExpenseChart: Chart | null = null;
    let categoryBreakdownChart: Chart | null = null;
    
    if (incomeVsExpenseChartRef.current) {
      incomeVsExpenseChart = new Chart(incomeVsExpenseChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Income',
              data: [12500, 13200, 15000, 14200, 16500, 17800],
              backgroundColor: '#1a56db',
              barPercentage: 0.6,
              categoryPercentage: 0.5
            },
            {
              label: 'Expenses',
              data: [8500, 9200, 9800, 10500, 11200, 12400],
              backgroundColor: '#f59e0b',
              barPercentage: 0.6,
              categoryPercentage: 0.5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
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
    
    if (categoryBreakdownChartRef.current) {
      categoryBreakdownChart = new Chart(categoryBreakdownChartRef.current, {
        type: 'doughnut',
        data: {
          labels: [
            'Sunday Collection',
            'Special Collection',
            'Donations',
            'Building Fund',
            'Mission Fund',
            'Youth Ministry',
            'Other Income'
          ],
          datasets: [{
            data: [42, 12, 18, 10, 7, 5, 6],
            backgroundColor: [
              '#1a56db',
              '#3b82f6',
              '#60a5fa',
              '#93c5fd',
              '#bfdbfe',
              '#dbeafe',
              '#eff6ff'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            }
          }
        }
      });
    }
    
    // Cleanup function
    return () => {
      if (incomeVsExpenseChart) incomeVsExpenseChart.destroy();
      if (categoryBreakdownChart) categoryBreakdownChart.destroy();
    };
  }, [location.pathname, reportType]);
  
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleGenerateReport = () => {
    console.log('Generate report for', reportType, 'with date range:', dateRange);
    // This would fetch data and update the report in a real application
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const getReportTitle = () => {
    switch (reportType) {
      case 'monthly':
        return 'Monthly Financial Report';
      case 'quarterly':
        return 'Quarterly Financial Report';
      case 'annual':
        return 'Annual Financial Report';
      case 'custom':
        return 'Custom Financial Report';
      default:
        return 'Financial Report';
    }
  };
  
  return (
    <div className="reports-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">{getReportTitle()}</h1>
        <div className="d-flex">
          <button 
            type="button" 
            className="btn btn-outline-secondary me-2"
          >
            <i className="bi bi-file-earmark-pdf me-2"></i>
            Export PDF
          </button>
          <button 
            type="button" 
            className="btn btn-outline-primary"
          >
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
        </div>
      </div>
      
      {/* Report Settings */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">Report Settings</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <label htmlFor="reportType" className="form-label">Report Type</label>
              <select 
                className="form-select" 
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annual</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="startDate"
                name="start"
                value={dateRange.start}
                onChange={handleDateRangeChange}
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="endDate"
                name="end"
                value={dateRange.end}
                onChange={handleDateRangeChange}
              />
            </div>
            <div className="col-12">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleGenerateReport}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="stat-card">
            <div className="stat-icon bg-primary-light">
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Total Income</p>
              <h3 className="stat-value">{formatCurrency(89200)}</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card">
            <div className="stat-icon bg-warning-light">
              <i className="bi bi-cash-coin"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Total Expenses</p>
              <h3 className="stat-value">{formatCurrency(61600)}</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card">
            <div className="stat-icon bg-success-light">
              <i className="bi bi-wallet2"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Net Balance</p>
              <h3 className="stat-value">{formatCurrency(27600)}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart Row */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Income vs Expenses</h5>
            </div>
            <div className="card-body">
              <div className="chart-container" style={{ height: '300px' }}>
                <canvas ref={incomeVsExpenseChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Third Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-7">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Financial Summary</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Budget</th>
                      <th>Actual</th>
                      <th>Variance</th>
                      <th>%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="fw-semibold bg-light">Income</td>
                    </tr>
                    <tr>
                      <td>Sunday Collection</td>
                      <td>{formatCurrency(40000)}</td>
                      <td>{formatCurrency(37500)}</td>
                      <td className="text-danger">-{formatCurrency(2500)}</td>
                      <td>93.8%</td>
                    </tr>
                    <tr>
                      <td>Donations</td>
                      <td>{formatCurrency(25000)}</td>
                      <td>{formatCurrency(30500)}</td>
                      <td className="text-success">+{formatCurrency(5500)}</td>
                      <td>122.0%</td>
                    </tr>
                    <tr>
                      <td>Building Fund</td>
                      <td>{formatCurrency(10000)}</td>
                      <td>{formatCurrency(12200)}</td>
                      <td className="text-success">+{formatCurrency(2200)}</td>
                      <td>122.0%</td>
                    </tr>
                    <tr>
                      <td>Other Income</td>
                      <td>{formatCurrency(8000)}</td>
                      <td>{formatCurrency(9000)}</td>
                      <td className="text-success">+{formatCurrency(1000)}</td>
                      <td>112.5%</td>
                    </tr>
                    <tr className="fw-semibold">
                      <td>Total Income</td>
                      <td>{formatCurrency(83000)}</td>
                      <td>{formatCurrency(89200)}</td>
                      <td className="text-success">+{formatCurrency(6200)}</td>
                      <td>107.5%</td>
                    </tr>
                    
                    <tr>
                      <td colSpan={5} className="fw-semibold bg-light">Expenses</td>
                    </tr>
                    <tr>
                      <td>Utilities</td>
                      <td>{formatCurrency(5000)}</td>
                      <td>{formatCurrency(5200)}</td>
                      <td className="text-danger">-{formatCurrency(200)}</td>
                      <td>104.0%</td>
                    </tr>
                    <tr>
                      <td>Staff Salaries</td>
                      <td>{formatCurrency(35000)}</td>
                      <td>{formatCurrency(35000)}</td>
                      <td>{formatCurrency(0)}</td>
                      <td>100.0%</td>
                    </tr>
                    <tr>
                      <td>Maintenance</td>
                      <td>{formatCurrency(8000)}</td>
                      <td>{formatCurrency(7500)}</td>
                      <td className="text-success">+{formatCurrency(500)}</td>
                      <td>93.8%</td>
                    </tr>
                    <tr>
                      <td>Other Expenses</td>
                      <td>{formatCurrency(15000)}</td>
                      <td>{formatCurrency(13900)}</td>
                      <td className="text-success">+{formatCurrency(1100)}</td>
                      <td>92.7%</td>
                    </tr>
                    <tr className="fw-semibold">
                      <td>Total Expenses</td>
                      <td>{formatCurrency(63000)}</td>
                      <td>{formatCurrency(61600)}</td>
                      <td className="text-success">+{formatCurrency(1400)}</td>
                      <td>97.8%</td>
                    </tr>
                    
                    <tr className="fw-bold">
                      <td>Net Balance</td>
                      <td>{formatCurrency(20000)}</td>
                      <td>{formatCurrency(27600)}</td>
                      <td className="text-success">+{formatCurrency(7600)}</td>
                      <td>138.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Income Breakdown</h5>
            </div>
            <div className="card-body">
              <div className="chart-container" style={{ height: '300px' }}>
                <canvas ref={categoryBreakdownChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notes Section */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Report Notes</h5>
        </div>
        <div className="card-body">
          <p>
            This report covers the financial activities for the period from <strong>{dateRange.start}</strong> to <strong>{dateRange.end}</strong>.
          </p>
          <p>
            <strong>Key Observations:</strong>
          </p>
          <ul>
            <li>Overall income exceeded budget projections by 7.5%, primarily due to higher than expected donations.</li>
            <li>Expenses were 2.2% under budget, with savings in maintenance and other operational costs.</li>
            <li>The building fund campaign has been performing above expectations with 22% more contributions than anticipated.</li>
            <li>Sunday collections were slightly below budget (93.8%) and may require additional attention.</li>
          </ul>
          <p>
            <strong>Recommendations:</strong>
          </p>
          <ul>
            <li>Continue to monitor utility costs as they are trending slightly higher than budgeted.</li>
            <li>Consider allocating some of the surplus to the building maintenance reserve fund.</li>
            <li>Review strategies for increasing regular Sunday contributions.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;