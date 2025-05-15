import React, { useState } from 'react';

interface Donor {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalDonations: number;
  lastDonation: string;
  status: 'active' | 'inactive';
}

const Donors: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDonor, setNewDonor] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const donorData: Donor[] = [
    {
      id: 1,
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, CA 90210',
      joinDate: '2023-02-15',
      totalDonations: 2850,
      lastDonation: '2025-06-18',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '(555) 234-5678',
      address: '456 Oak Dr, Somewhere, CA 90211',
      joinDate: '2022-07-20',
      totalDonations: 5620,
      lastDonation: '2025-06-20',
      status: 'active'
    },
    {
      id: 3,
      name: 'Robert Davis',
      email: 'robert.davis@example.com',
      phone: '(555) 345-6789',
      address: '789 Pine Ave, Elsewhere, CA 90212',
      joinDate: '2021-11-05',
      totalDonations: 7840,
      lastDonation: '2025-06-15',
      status: 'active'
    },
    {
      id: 4,
      name: 'Jennifer Martinez',
      email: 'jennifer.martinez@example.com',
      phone: '(555) 456-7890',
      address: '101 Cedar Blvd, Nowhere, CA 90213',
      joinDate: '2024-01-10',
      totalDonations: 1200,
      lastDonation: '2025-06-12',
      status: 'active'
    },
    {
      id: 5,
      name: 'David Thompson',
      email: 'david.thompson@example.com',
      phone: '(555) 567-8901',
      address: '234 Elm St, Anyplace, CA 90214',
      joinDate: '2023-09-22',
      totalDonations: 3450,
      lastDonation: '2025-05-28',
      status: 'inactive'
    }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDonor(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New donor:', newDonor);
    setShowAddModal(false);
    setNewDonor({
      name: '',
      email: '',
      phone: '',
      address: '',
    });
    // In a real app, you would add the donor to the database
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
    if (status === 'active') {
      return <span className="badge bg-success">Active</span>;
    } else {
      return <span className="badge bg-secondary">Inactive</span>;
    }
  };
  
  const totalDonors = donorData.length;
  const activeDonors = donorData.filter(donor => donor.status === 'active').length;
  const totalDonations = donorData.reduce((sum, donor) => sum + donor.totalDonations, 0);
  
  return (
    <div className="donors-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Donor Management</h1>
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
            Add Donor
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="stat-card">
            <div className="stat-icon bg-primary-light">
              <i className="bi bi-people-fill"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Total Donors</p>
              <h3 className="stat-value">{totalDonors}</h3>
              <p className="stat-change positive">
                <i className="bi bi-arrow-up-short"></i> 
                {Math.round((activeDonors / totalDonors) * 100)}% active
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card">
            <div className="stat-icon bg-success-light">
              <i className="bi bi-cash"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Total Contributions</p>
              <h3 className="stat-value">{formatCurrency(totalDonations)}</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card">
            <div className="stat-icon bg-info-light">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <div className="stat-content">
              <p className="stat-title">Avg Donation</p>
              <h3 className="stat-value">{formatCurrency(totalDonations / totalDonors)}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Donor List</h5>
          <div className="input-group" style={{ width: '250px' }}>
            <span className="input-group-text bg-transparent border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Search donors..." 
            />
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Join Date</th>
                  <th>Total Donations</th>
                  <th>Last Donation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donorData.map(donor => (
                  <tr key={donor.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-2 bg-primary">
                          <span>{donor.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="mb-0 fw-medium">{donor.name}</p>
                          <small className="text-muted">{donor.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="mb-0">{donor.phone}</p>
                      <small className="text-muted">{donor.address}</small>
                    </td>
                    <td>{formatDate(donor.joinDate)}</td>
                    <td className="fw-semibold">{formatCurrency(donor.totalDonations)}</td>
                    <td>{formatDate(donor.lastDonation)}</td>
                    <td>{getStatusBadge(donor.status)}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-outline-secondary">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button type="button" className="btn btn-outline-primary">
                          <i className="bi bi-envelope"></i>
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
          <nav aria-label="Donors pagination">
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
      
      {/* Add Donor Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Donor</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name"
                      placeholder="Enter full name"
                      value={newDonor.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      placeholder="Enter email address"
                      value={newDonor.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="phone" 
                      name="phone"
                      placeholder="Enter phone number"
                      value={newDonor.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea 
                      className="form-control" 
                      id="address" 
                      name="address"
                      rows={3}
                      placeholder="Enter full address"
                      value={newDonor.address}
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
                  <button type="submit" className="btn btn-primary">Add Donor</button>
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

export default Donors;