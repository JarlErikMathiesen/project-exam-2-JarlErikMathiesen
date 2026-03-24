import Layout from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateVenue from './pages/CreateVenue';
import VenueDetailPage from './pages/VenueDetailPage';
import EditVenue from './pages/EditVenue';
import VenueBookings from './pages/VenueBookings';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/create-venue" element={<CreateVenue />} />
          <Route path="/profile/venue/:id/edit" element={<EditVenue />} />
          <Route path="/venue/:id" element={<VenueDetailPage />} />
          <Route
            path="/profile/venue/:id/bookings"
            element={<VenueBookings />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
