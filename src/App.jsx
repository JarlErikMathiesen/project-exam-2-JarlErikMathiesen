import Layout from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/profile';
import VenueDetailPage from './pages/VenueDetailPage';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/venue/:id" element={<VenueDetailPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
