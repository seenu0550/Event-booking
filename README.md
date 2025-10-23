# Event Booking System

A full-stack web application for event management and booking built with React.js, Node.js, Express.js, and MongoDB.

## Features

- **User Authentication**: Register/Login with JWT
- **Event Browsing**: View all events with search and filter
- **Event Booking**: Book tickets for events
- **User Dashboard**: View and manage bookings
- **Admin Dashboard**: Create, edit, delete events
- **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Inline CSS (minimal design)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file and configure:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventbooking
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

### Database Setup

Make sure MongoDB is running on your system. The app will automatically create the database and collections.

## Usage

1. **Register/Login**: Create an account or login
2. **Browse Events**: View all available events on the home page
3. **Book Events**: Click on event details and book tickets
4. **User Dashboard**: View your bookings and cancel if needed
5. **Admin Features**: Register as admin to create and manage events

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Admin)
- `PUT /api/events/:id` - Update event (Admin)
- `DELETE /api/events/:id` - Delete event (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/event/:eventId` - Get event bookings (Admin)
- `DELETE /api/bookings/:id` - Cancel booking

## Project Structure

```
event-scheduling/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   └── server.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── utils/       # Utility functions
│   └── public/          # Static files
└── README.md
```

## Default Admin Account

To test admin features, register with role "admin" during signup.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request