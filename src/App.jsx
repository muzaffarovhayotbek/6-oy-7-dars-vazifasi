import { useEffect, useState } from 'react';
import { backend } from './axios';
import Card from './components/Card';

function App() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    backend
      .get('latest')
      .then((response) => {
        if (response.status == 200) {
          setLatest(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div>
        {!loading &&
          latest.length > 0 &&
          latest.map(function (latest, index) {
            return <Card key={index} latest={latest} />;
          })}

        {loading && <p>loading...</p>}
      </div>
    </div>
  );
}

export default App;
