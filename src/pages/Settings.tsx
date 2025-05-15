import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

const ProfileSettings: React.FC = () => {
  return (
    <div className="profile-settings">
      <h4 className="mb-4">Profile Settings</h4>
      <form>
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">Personal Information</h5>
          </div>
          <div className="card-body">
            <div className="mb-3 text-center">
              <div className="avatar mx-auto mb-3" style={{ width: '100px', height: '100px', fontSize: '2rem' }}>
                <span>JD</span>
              </div>
              <button type="button" className="btn btn-sm btn-outline-primary">
                Change Photo
              </button>
            </div>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" defaultValue="John" />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" defaultValue="Doe" />
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" defaultValue="john.doe@parish.org" />
              </div>
              <div className="col-12">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" className="form-control" id="phone" defaultValue="(555) 123-4567" />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="role" className="form-label">Role</label>
                <input type="text" className="form-control" id="role" defaultValue="Administrator" readOnly />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="joinDate" className="form-label">Join Date</label>
                <input type="text" className="form-control" id="joinDate" defaultValue="Jan 15, 2024" readOnly />
              </div>
            </div>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">Change Password</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input type="password" className="form-control" id="currentPassword" />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input type="password" className="form-control" id="newPassword" />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <input type="password" className="form-control" id="confirmPassword" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">Notification Settings</h5>
          </div>
          <div className="card-body">
            <div className="form-check form-switch mb-3">
              <input className="form-check-input" type="checkbox" id="emailNotifications" defaultChecked />
              <label className="form-check-label" htmlFor="emailNotifications">
                Email Notifications
              </label>
              <div className="form-text">Receive email notifications for important updates</div>
            </div>
            <div className="form-check form-switch mb-3">
              <input className="form-check-input" type="checkbox" id="newDonations" defaultChecked />
              <label className="form-check-label" htmlFor="newDonations">
                New Donations
              </label>
              <div className="form-text">Get notified when a new donation is received</div>
            </div>
            <div className="form-check form-switch mb-3">
              <input className="form-check-input" type="checkbox" id="monthlyReports" defaultChecked />
              <label className="form-check-label" htmlFor="monthlyReports">
                Monthly Reports
              </label>
              <div className="form-text">Receive monthly financial reports by email</div>
            </div>
          </div>
        </div>
        
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary">Cancel</button>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

const CategorySettings: React.FC = () => {
  const incomeCategories = [
    'Sunday Collection',
    'Special Collection',
    'Donations',
    'Building Fund',
    'Mission Fund',
    'Youth Ministry',
    'Events',
    'Other'
  ];
  
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
  
  return (
    <div className="category-settings">
      <h4 className="mb-4">Category Settings</h4>
      
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Income Categories</h5>
              <button className="btn btn-sm btn-primary">
                <i className="bi bi-plus-circle me-1"></i> Add
              </button>
            </div>
            <div className="card-body">
              <div className="list-group">
                {incomeCategories.map((category, index) => (
                  <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{category}</span>
                    <div className="btn-group btn-group-sm">
                      <button type="button" className="btn btn-outline-secondary">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button type="button" className="btn btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Expense Categories</h5>
              <button className="btn btn-sm btn-primary">
                <i className="bi bi-plus-circle me-1"></i> Add
              </button>
            </div>
            <div className="card-body">
              <div className="list-group">
                {expenseCategories.map((category, index) => (
                  <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{category}</span>
                    <div className="btn-group btn-group-sm">
                      <button type="button" className="btn btn-outline-secondary">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button type="button" className="btn btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserSettings: React.FC = () => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@parish.org',
      role: 'Administrator',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@parish.org',
      role: 'Treasurer',
      status: 'active'
    },
    {
      id: 3,
      name: 'Michael Smith',
      email: 'michael.smith@parish.org',
      role: 'Staff',
      status: 'active'
    },
    {
      id: 4,
      name: 'Lisa Brown',
      email: 'lisa.brown@parish.org',
      role: 'Staff',
      status: 'inactive'
    }
  ];
  
  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="badge bg-success">Active</span>;
    } else {
      return <span className="badge bg-secondary">Inactive</span>;
    }
  };
  
  return (
    <div className="user-settings">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">User Management</h4>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add User
        </button>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">System Users</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-2 bg-primary">
                          <span>{user.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge bg-primary-light text-primary">
                        {user.role}
                      </span>
                    </td>
                    <td>{getStatusBadge(user.status)}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-outline-secondary">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button type="button" className="btn btn-outline-primary">
                          <i className="bi bi-key"></i>
                        </button>
                        {user.status === 'active' ? (
                          <button type="button" className="btn btn-outline-warning">
                            <i className="bi bi-pause-fill"></i>
                          </button>
                        ) : (
                          <button type="button" className="btn btn-outline-success">
                            <i className="bi bi-play-fill"></i>
                          </button>
                        )}
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
      </div>
    </div>
  );
};

const Settings: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  
  return (
    <div className="settings-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Settings</h1>
      </div>
      
      <div className="row g-4">
        <div className="col-12 col-md-3">
          <div className="card">
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <Link 
                  to="/settings/profile" 
                  className={`list-group-item list-group-item-action d-flex align-items-center ${currentPath === 'profile' || !currentPath || currentPath === 'settings' ? 'active' : ''}`}
                >
                  <i className="bi bi-person me-2"></i>
                  Profile Settings
                </Link>
                <Link 
                  to="/settings/categories" 
                  className={`list-group-item list-group-item-action d-flex align-items-center ${currentPath === 'categories' ? 'active' : ''}`}
                >
                  <i className="bi bi-tag me-2"></i>
                  Categories
                </Link>
                <Link 
                  to="/settings/users" 
                  className={`list-group-item list-group-item-action d-flex align-items-center ${currentPath === 'users' ? 'active' : ''}`}
                >
                  <i className="bi bi-people me-2"></i>
                  User Management
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-md-9">
          <Routes>
            <Route path="/" element={<ProfileSettings />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/categories" element={<CategorySettings />} />
            <Route path="/users" element={<UserSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Settings;