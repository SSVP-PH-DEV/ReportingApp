import React, { useState } from 'react';

interface ExpenseEntry {
  id: number;
  date: string;
  category: string;
  vendor: string;
  amount: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;
}

const Expenses: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    vendor: '',
    amount: '',
    description: ''
  });
  
  const expenseCategories = [
    'Utilities',
    'Maintenance',
    'Staff Salaries',
    'Office Supplies',
    'Ministry Activities',
    'Events',
    'Charitable Giving',
    'Education',
    'Other'
  ];
  
  const expenseData: ExpenseEntry[] = [
    {
      id: 1,
      date: '2025-06-22',
      category: 'Utilities',
      vendor: 'City Power & Water',
      amount: 845,
      description: 'Monthly utility bill',
      status: 'approved',
      createdBy: 'Sarah Johnson'
    },
    {
      id: 2,
      date: '2025-06-15',
      category: 'Staff Salaries',
      vendor: 'Payroll',
      amount: 2780,
      description: 'Staff salaries for June',
      status: 'approved',
      createdBy: 'John Doe'
    },
    {
      id: 3,
      date: '2025-06-10',
      category: 'Maintenance',
      vendor: 'City Landscaping',
      amount: 350,
      description: 'Monthly grounds maintenance',
      status: 'approved',
      createdBy: 'Sarah Johnson'
    },
    {
      id: 4,
      date: '2025-06-08',
      category: 'Office Supplies',
      vendor: 'Office Depot',
      amount: 125,
      description: 'Printer paper and ink',
      status: 'approved',
      createdBy: 'Sarah Johnson'
    },
    {
      id: 5,
      date: '2025-06-05',
      category: 'Ministry Activities',
      vendor: 'Parish Youth Group',
      amount: 250,
      description: 'Youth retreat supplies',
      status: 'pending',
      createdBy: 'John Doe'
    }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New expense entry:', newEntry);
    setShowAddModal(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      category: '',
      vendor: '',
      amount: '',
      description: ''
    });
    // In a real app, you would add the entry to the database
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="badge bg-success">Approved</span>;
      case 'rejected':
        return <span className="badge bg-danger">Rejected</span>;
      case 'pending':
        return <span className="badge bg-warning">Pending</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };
  
  const totalExpenses = expenseData.reduce((sum, entry) => sum + entry.amount, 0);
  
  return (
    <div className="expense-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Expense Management</h1>
        <div className="d-flex">
          <button 
            type="button" 
            className="btn btn-outline-secondary me-2"
          >
            <i className="bi bi-file-earmark-excel me-2"></i>
            Export
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Expense
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="stat-card">
            <div className="stat-icon bg-warning-light">
              <i className="bi bi-cash-stack"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Total Expenses (MTD)</p>
              <h3 className="stat-value">{formatCurrency(totalExpenses)}</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card">
            <div className="stat-icon bg-danger-light">
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Largest Category</p>
              <h3 className="stat-value">Staff Salaries</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card">
            <div className="stat-icon bg-info-light">
              <i className="bi bi-hourglass-split"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Pending Approval</p>
              <h3 className="stat-value">1</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Expense Records</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenseData.map(entry => (
                  <tr key={entry.id}>
                    <td>{formatDate(entry.date)}</td>
                    <td>
                      <span className="badge bg-warning-light text-warning">
                        {entry.category}
                      </span>
                    </td>
                    <td>{entry.vendor}</td>
                    <td className="fw-semibold text-danger">{formatCurrency(entry.amount)}</td>
                    <td>{entry.description}</td>
                    <td>{getStatusBadge(entry.status)}</td>
                    <td>{entry.createdBy}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-outline-secondary">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button type="button" className="btn btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <nav aria-label="Expense pagination">
            <ul className="pagination justify-content-center mb-0">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Expense</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="date" 
                      name="date"
                      value={newEntry.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select 
                      className="form-select" 
                      id="category" 
                      name="category"
                      value={newEntry.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {expenseCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="vendor" className="form-label">Vendor</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="vendor" 
                      name="vendor"
                      placeholder="Enter vendor name"
                      value={newEntry.vendor}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount ($)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="amount" 
                      name="amount"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={newEntry.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea 
                      className="form-control" 
                      id="description" 
                      name="description"
                      rows={3}
                      placeholder="Enter a brief description"
                      value={newEntry.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">Save Expense</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </div>
      )}
    </div>
  );
};

export default Expenses;