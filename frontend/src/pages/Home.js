import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import EventCard from '../components/EventCard';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [search, category]);

  const fetchEvents = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      
      const response = await API.get('/events', { params });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={styles.loading}>
      <div style={styles.spinner}></div>
      <p>Loading amazing events...</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Discover Amazing Events</h1>
        <p style={styles.heroSubtitle}>Find and book tickets for concerts, workshops, conferences, and festivals</p>
      </div>
      
      <div style={styles.filtersContainer}>
        <div style={styles.filters}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            <option value="">All Categories</option>
            <option value="concert">🎵 Concert</option>
            <option value="workshop">🛠️ Workshop</option>
            <option value="conference">💼 Conference</option>
            <option value="festival">🎪 Festival</option>
          </select>
        </div>
      </div>

      <div style={styles.eventsSection}>
        <h2 style={styles.sectionTitle}>
          {events.length > 0 ? `${events.length} Events Found` : 'No Events Found'}
        </h2>
        
        <div style={styles.grid}>
          {events.length > 0 ? (
            events.map(event => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <div style={styles.noEvents}>
              <div style={styles.noEventsIcon}>🎭</div>
              <h3>No events match your criteria</h3>
              <p>Try adjusting your search or browse all categories</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 2rem 2rem',
    color: 'white'
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    background: 'linear-gradient(45deg, #fff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  filtersContainer: {
    padding: '0 2rem 2rem',
    display: 'flex',
    justifyContent: 'center'
  },
  filters: { 
    display: 'flex', 
    gap: '1rem', 
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '1rem',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    fontSize: '1.2rem',
    zIndex: 1
  },
  searchInput: { 
    padding: '0.8rem 1rem 0.8rem 3rem', 
    border: 'none',
    borderRadius: '25px', 
    width: '300px',
    fontSize: '1rem',
    background: 'rgba(255, 255, 255, 0.9)',
    outline: 'none',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
  },
  select: { 
    padding: '0.8rem 1rem', 
    border: 'none',
    borderRadius: '25px',
    fontSize: '1rem',
    background: 'rgba(255, 255, 255, 0.9)',
    outline: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
  },
  eventsSection: {
    padding: '0 2rem 4rem',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '2rem',
    textAlign: 'center',
    color: 'white'
  },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
    gap: '2rem'
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
  noEvents: { 
    gridColumn: '1 / -1',
    textAlign: 'center', 
    color: 'white',
    padding: '4rem 2rem'
  },
  noEventsIcon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  }
};

export default Home;