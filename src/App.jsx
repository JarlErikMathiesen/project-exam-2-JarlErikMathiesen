import Layout from './components/layout/Layout';
import { apiFetch } from './api/client';

const getVenues = async () => {
  const data = await apiFetch('/venues');

  return console.log(data.data);
};

getVenues();

function App() {
  return (
    <>
      <Layout></Layout>
    </>
  );
}

export default App;
