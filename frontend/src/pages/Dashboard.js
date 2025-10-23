import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { getUser } from '../utils/auth';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await API.get('/bookings/user');
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await API.delete(`/bookings/${bookingId}`);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) return (
    <div style={styles.loading}>
      <div style={styles.spinner}></div>
      <p>Loading your bookings...</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>My Dashboard</h1>
          <p style={styles.subtitle}>Welcome back, {user?.name}! 👋</p>
        </div>
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{bookings.length}</div>
            <div style={styles.statLabel}>Total Bookings</div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🎫 My Bookings</h2>
        
        {bookings.length > 0 ? (
          <div style={styles.bookingsList}>
            {bookings.map(booking => (
              <div key={booking._id} style={styles.bookingCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.eventTitle}>{booking.event.title}</h3>
                  <span style={booking.status === 'confirmed' ? styles.confirmed : styles.cancelled}>
                    {booking.status === 'confirmed' ? '✅ Confirmed' : '❌ Cancelled'}
                  </span>
                </div>
                
                <div style={styles.bookingDetails}>
                  <div style={styles.detailRow}>
                    <span style={styles.icon}>📅</span>
                    <span>{new Date(booking.event.date).toLocaleDateString()}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.icon}>🕒</span>
                    <span>{booking.event.time}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.icon}>📍</span>
                    <span>{booking.event.venue}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.icon}>🎫</span>
                    <span>{booking.seatsBooked} seat(s)</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.icon}>💰</span>
                    <span>${booking.totalAmount}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.icon}>📝</span>
                    <span>Booked on {new Date(booking.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    style={styles.cancelButton}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noBookings}>
            <div style={styles.noBookingsIcon}>🎭</div>
            <h3>No bookings yet</h3>
            <p>You haven't booked any events yet. Start exploring amazing events!</p>
            <button onClick={() => navigate('/')} style={styles.browseButton}>
              🔍 Browse Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { 
    minHeight: '100vh',
    padding: '2rem', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '3rem',
    flexWrap: 'wrap',
    gap: '2rem'
  },
  title: { 
    fontSize: '2.5rem', 
    fontWeight: '700', 
    color: 'white',
    marginBottom: '0.5rem'
  },
  subtitle: { 
    color: 'rgba(255, 255, 255, 0.8)', 
    fontSize: '1.2rem'
  },
  stats: {
    display: 'flex',
    gap: '1rem'
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '1.5rem',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    minWidth: '120px'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '0.5rem'
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem'
  },
  section: { 
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: { 
    fontSize: '1.8rem', 
    fontWeight: '600', 
    marginBottom: '2rem',
    color: 'white'
  },
  bookingsList: { 
    display: 'grid', 
    gap: '1.5rem'
  },
  bookingCard: { 
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '2rem', 
    borderRadius: '20px', 
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  eventTitle: { 
    fontSize: '1.4rem', 
    fontWeight: '600', 
    color: '#2d3748',
    margin: 0
  },
  confirmed: { 
    color: '#10b981', 
    fontWeight: '600',
    background: 'rgba(16, 185, 129, 0.1)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem'
  },
  cancelled: { 
    color: '#ef4444', 
    fontWeight: '600',
    background: 'rgba(239, 68, 68, 0.1)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem'
  },
  bookingDetails: { 
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.95rem',
    color: '#4a5568'
  },
  icon: {
    fontSize: '1.1rem',
    minWidth: '20px'
  },
  cancelButton: { 
    padding: '0.8rem 1.5rem', 
    background: 'linear-gradient(45deg, #ef4444, #dc2626)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '12px', 
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
  },
  noBookings: { 
    textAlign: 'center', 
    color: 'white',
    padding: '4rem 2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  noBookingsIcon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  },
  browseButton: { 
    padding: '1rem 2rem', 
    background: 'linear-gradient(45deg, #10b981, #059669)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '16px', 
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1.1rem',
    marginTop: '1.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
  },
  loading: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    color: 'white',
    fontSize: '1.2rem'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  }
};

export default Dashboard;