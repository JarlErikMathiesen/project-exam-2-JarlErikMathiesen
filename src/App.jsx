import Layout from './components/layout/Layout';
import { apiFetch } from './api/client';

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

function App() {
  return (
    <>
      <Layout>
        <HomePage />
      </Layout>
    </>
  );
}

export default App;
