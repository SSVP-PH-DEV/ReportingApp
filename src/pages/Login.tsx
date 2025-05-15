import React, { useState } from 'react';

interface LoginProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // This would be an actual API call in a real implementation
      // For demo purposes, we'll simulate a delay and then call onLogin
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onLogin({ email, password });
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="app-logo">
          <i className="bi bi-bank text-primary" style={{ fontSize: '3rem' }}></i>
          <h2 className="mt-2">Parish Finance</h2>
        </div>
        
        <h4 className="form-title">Sign In</h4>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@parish.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label htmlFor="password" className="form-label mb-0">Password</label>
              <a href="#" className="text-primary small">Forgot password?</a>
            </div>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="d-grid mb-4">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-muted mb-0">
              Don't have an account? <a href="#" className="text-primary">Contact administrator</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;