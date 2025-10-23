import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { setAuth } from '../utils/auth';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await API.post('/auth/register', formData);
      setAuth(response.data.token, response.data.user);
      toast.success('Account created successfully! 🎉');
      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.title}>Join EventHub</h2>
          <p style={styles.subtitle}>Create your account to start booking events</p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}>👤</span>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}>📧</span>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}>🎭</span>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              style={styles.select}
            >
              <option value="user">👤 Event Attendee</option>
              <option value="admin">👑 Event Organizer</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? (
              <span style={styles.buttonContent}>
                <div style={styles.spinner}></div>
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account? 
            <Link to="/login" style={styles.link}> Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    minHeight: '100vh',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  formContainer: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '3rem',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    width: '100%',
    maxWidth: '450px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  title: { 
    fontSize: '2rem', 
    fontWeight: '700', 
    marginBottom: '0.5rem',
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    color: '#718096',
    fontSize: '1rem'
  },
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '1.5rem' 
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    fontSize: '1.2rem',
    zIndex: 1
  },
  input: { 
    width: '100%', 
    padding: '1rem 1rem 1rem 3rem', 
    border: '2px solid #e2e8f0',
    borderRadius: '16px', 
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.8)'
  },
  select: { 
    width: '100%', 
    padding: '1rem 1rem 1rem 3rem', 
    border: '2px solid #e2e8f0',
    borderRadius: '16px', 
    fontSize: '1rem',
    outline: 'none',
    cursor: 'pointer',
    background: 'rgba(255, 255, 255, 0.8)'
  },
  button: { 
    width: '100%', 
    padding: '1rem', 
    background: 'linear-gradient(45deg, #667eea, #764ba2)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '16px', 
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem'
  },
  footerText: {
    color: '#718096',
    fontSize: '0.9rem'
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default Register;