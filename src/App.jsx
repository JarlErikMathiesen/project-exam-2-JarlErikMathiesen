import Layout from './components/layout/Layout';
import { apiFetch } from './api/client';
import { Routes, Route, Link } from 'react-router-dom';

const getVenues = async () => {
  const data = await apiFetch('/venues');

  return data.data;
};

import { useEffect, useState } from 'react';

function HomePage() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function loadVenues() {
      try {
        const data = await getVenues();
        /* console.log(data); */
        setVenues(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadVenues();
  }, []);

  return (
    <div>
      {venues.map((venue) => (
        <p key={venue.id}>{venue.name}</p>
      ))}
    </div>
  );
}

function Login() {
  return <h1>login</h1>;
}

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
