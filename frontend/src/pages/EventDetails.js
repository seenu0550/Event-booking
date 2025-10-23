import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { getUser } from '../utils/auth';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const user = getUser();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await API.get(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      toast.error('Event not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please login to book events');
      navigate('/login');
      return;
    }

    setBooking(true);
    try {
      await API.post('/bookings', { eventId: id });
      toast.success('🎉 Event booked successfully!');
      fetchEvent();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return (
    <div style={styles.loading}>
      <div style={styles.spinner}></div>
      <p>Loading event details...</p>
    </div>
  );

  if (!event) return (
    <div style={styles.loading}>
      <div style={styles.errorIcon}>😕</div>
      <p>Event not found</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.categoryBadge}>
            {event.category}
          </div>
          <div style={styles.priceTag}>
            ${event.price}
          </div>
        </div>

        <h1 style={styles.title}>{event.title}</h1>
        <p style={styles.description}>{event.description}</p>
        
        <div style={styles.detailsGrid}>
          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>📅</div>
            <div>
              <h4>Date</h4>
              <p>{new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>🕒</div>
            <div>
              <h4>Time</h4>
              <p>{event.time}</p>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>📍</div>
            <div>
              <h4>Venue</h4>
              <p>{event.venue}</p>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>👥</div>
            <div>
              <h4>Organizer</h4>
              <p>{event.organizer?.name}</p>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>🎫</div>
            <div>
              <h4>Available Seats</h4>
              <p>{event.seatsAvailable} of {event.totalSeats}</p>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>🏷️</div>
            <div>
              <h4>Category</h4>
              <p style={{textTransform: 'capitalize'}}>{event.category}</p>
            </div>
          </div>
        </div>

        <div style={styles.bookingSection}>
          {event.seatsAvailable > 0 ? (
            <button
              onClick={handleBooking}
              disabled={booking}
              style={styles.bookButton}
            >
              {booking ? (
                <span style={styles.buttonContent}>
                  <div style={styles.buttonSpinner}></div>
                  Booking...
                </span>
              ) : (
                <span style={styles.buttonContent}>
                  🎫 Book Now - ${event.price}
                </span>
              )}
            </button>
          ) : (
            <button disabled style={styles.soldOutButton}>
              😔 Sold Out
            </button>
          )}
          
          {event.seatsAvailable <= 5 && event.seatsAvailable > 0 && (
            <p style={styles.urgencyText}>
              ⚡ Only {event.seatsAvailable} seats left!
            </p>
          )}
        </div>
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
  card: { 
    maxWidth: '900px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '3rem', 
    borderRadius: '24px', 
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  categoryBadge: {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  priceTag: {
    fontSize: '2rem',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  title: { 
    fontSize: '2.5rem', 
    fontWeight: '700', 
    marginBottom: '1rem', 
    color: '#2d3748',
    lineHeight: '1.2'
  },
  description: { 
    fontSize: '1.2rem', 
    color: '#718096', 
    marginBottom: '3rem', 
    lineHeight: '1.6'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem'
  },
  detailCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    background: 'rgba(102, 126, 234, 0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(102, 126, 234, 0.2)'
  },
  detailIcon: {
    fontSize: '2rem',
    minWidth: '50px'
  },
  bookingSection: {
    textAlign: 'center',
    padding: '2rem 0'
  },
  bookButton: { 
    padding: '1.2rem 3rem', 
    background: 'linear-gradient(45deg, #10b981, #059669)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '16px', 
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '200px'
  },
  soldOutButton: { 
    padding: '1.2rem 3rem', 
    background: '#9ca3af', 
    color: 'white', 
    border: 'none', 
    borderRadius: '16px', 
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'not-allowed',
    minWidth: '200px'
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  buttonSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  urgencyText: {
    marginTop: '1rem',
    color: '#f59e0b',
    fontWeight: '600',
    fontSize: '1rem'
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
  },
  errorIcon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  }
};

export default EventDetails;