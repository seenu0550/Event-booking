import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { getUser, isAdmin } from '../utils/auth';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', time: '', venue: '', price: 0, category: '', seatsAvailable: 0
  });
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/');
      return;
    }
    fetchEvents();
  }, [user, navigate]);

  const fetchEvents = async () => {
    try {
      const response = await API.get('/events');
      setEvents(response.data);
    } catch (error) {
      toast.error('Failed to fetch events');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await API.put(`/events/${editingEvent._id}`, formData);
        toast.success('Event updated successfully');
      } else {
        await API.post('/events', formData);
        toast.success('Event created successfully');
      }
      setShowForm(false);
      setEditingEvent(null);
      setFormData({ title: '', description: '', date: '', time: '', venue: '', price: 0, category: '', seatsAvailable: 0 });
      fetchEvents();
    } catch (error) {
      toast.error('Failed to save event');
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await API.delete(`/events/${eventId}`);
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const editEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0],
      time: event.time,
      venue: event.venue,
      price: event.price,
      category: event.category,
      seatsAvailable: event.seatsAvailable
    });
    setShowForm(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <button onClick={() => setShowForm(true)} style={styles.addButton}>
          Add New Event
        </button>
      </div>

      {showForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Event Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                style={styles.input}
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                style={styles.textarea}
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
                style={styles.input}
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Venue"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                required
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                required
                style={styles.input}
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
                style={styles.input}
              >
                <option value="">Select Category</option>
                <option value="concert">Concert</option>
                <option value="workshop">Workshop</option>
                <option value="conference">Conference</option>
                <option value="festival">Festival</option>
              </select>
              <input
                type="number"
                placeholder="Available Seats"
                value={formData.seatsAvailable}
                onChange={(e) => setFormData({...formData, seatsAvailable: Number(e.target.value)})}
                required
                style={styles.input}
              />
              <div style={styles.formButtons}>
                <button type="submit" style={styles.saveButton}>
                  {editingEvent ? 'Update' : 'Create'} Event
                </button>
                <button type="button" onClick={() => {setShowForm(false); setEditingEvent(null);}} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.eventsList}>
        <h2>Manage Events ({events.length})</h2>
        {events.map(event => (
          <div key={event._id} style={styles.eventCard}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <div style={styles.eventDetails}>
              <span>Date: {new Date(event.date).toLocaleDateString()}</span>
              <span>Seats: {event.seatsAvailable}/{event.totalSeats}</span>
              <span>Price: ${event.price}</span>
            </div>
            <div style={styles.eventActions}>
              <button onClick={() => editEvent(event)} style={styles.editButton}>Edit</button>
              <button onClick={() => deleteEvent(event._id)} style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { fontSize: '2rem', fontWeight: 'bold' },
  addButton: { padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' },
  textarea: { padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', minHeight: '100px', resize: 'vertical' },
  formButtons: { display: 'flex', gap: '1rem' },
  saveButton: { flex: 1, padding: '0.75rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  cancelButton: { flex: 1, padding: '0.75rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  eventsList: { marginTop: '2rem' },
  eventCard: { backgroundColor: 'white', padding: '1.5rem', marginBottom: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  eventDetails: { display: 'flex', gap: '1rem', margin: '1rem 0', fontSize: '0.9rem', color: '#6b7280' },
  eventActions: { display: 'flex', gap: '0.5rem' },
  editButton: { padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  deleteButton: { padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default AdminDashboard;