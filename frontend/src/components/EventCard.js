import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.category}>{event.category}</span>
        <span style={styles.price}>${event.price}</span>
      </div>
      
      <h3 style={styles.title}>{event.title}</h3>
      <p style={styles.description}>{event.description}</p>
      
      <div style={styles.details}>
        <div style={styles.detailItem}>
          <span style={styles.icon}>📅</span>
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.icon}>🕒</span>
          <span>{event.time}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.icon}>📍</span>
          <span>{event.venue}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.icon}>🎫</span>
          <span>{event.seatsAvailable} seats left</span>
        </div>
      </div>
      
      <Link to={`/event/${event._id}`} style={styles.button}>
        View Details & Book
      </Link>
    </div>
  );
};

const styles = {
  card: { 
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px', 
    padding: '1.5rem', 
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  category: {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '15px',
    fontSize: '0.8rem',
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#2d3748',
    background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  title: { 
    fontSize: '1.3rem', 
    fontWeight: '600', 
    marginBottom: '0.5rem', 
    color: '#2d3748',
    lineHeight: '1.3'
  },
  description: { 
    color: '#718096', 
    marginBottom: '1.5rem', 
    lineHeight: '1.5',
    fontSize: '0.9rem'
  },
  details: { 
    marginBottom: '1.5rem',
    display: 'grid',
    gap: '0.5rem'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#4a5568'
  },
  icon: {
    fontSize: '1rem'
  },
  button: { 
    display: 'block',
    width: '100%',
    textAlign: 'center',
    padding: '0.8rem 1.5rem', 
    background: 'linear-gradient(45deg, #667eea, #764ba2)', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '12px', 
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
  }
};

export default EventCard;