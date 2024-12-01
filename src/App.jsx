import React, { useEffect, useState } from 'react';
import { backend } from './axios';
import './App.css'; // CSS faylni ulaymiz

function App() {
  const [rate, setRate] = useState(null);
  const [field, setField] = useState('');
  const [result, setResult] = useState(0);
  const API_KEY = '67bebe0e23-e827c01d45-snt7l2';

  useEffect(() => {
    backend
      .get(`fetch-one?from=USD&to=UZS&api_key=${API_KEY}`)
      .then((response) => {
        if (response.status === 200) {
          setRate(response.data.result.UZS);
          console.log(14, response.data.result.UZS);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleConvert(event) {
    event.preventDefault();

    if (!field || isNaN(field)) {
      alert('Iltimos, raqam kiriting!');
      return;
    }

    setResult((field * rate).toFixed(2));
  }

  return (
    <div className="app">
      <form className="form-container">
        <h2 className="form-title">Valyuta Konverteri</h2>
        <input
          className="input-field"
          placeholder="Raqam kiriting"
          value={field}
          onChange={(e) => setField(e.target.value)}
          type="number"
        />
        <button className="convert-button" onClick={handleConvert}>
          Convert
        </button>
        <h1 className="result-text">Natija: {result} UZS</h1>
      </form>
    </div>
  );
}

export default App;
