import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backend } from './axios';
import './App.css';

function App() {
  const [rate, setRate] = useState(null);
  const [field, setField] = useState('');
  const [result, setResult] = useState(0);
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false); // loading holati
  const API_KEY = '67bebe0e23-e827c01d45-snt7l2';

  useEffect(() => {
    // Valyuta kursini olish
    backend
      .get(`fetch-one?from=USD&to=UZS&api_key=${API_KEY}`)
      .then((response) => {
        if (response.status === 200) {
          setRate(response.data.result.UZS);
          console.log('Valyuta kursi:', response.data.result.UZS);
        }
      })
      .catch((error) => {
        console.error('Valyuta kursi olishda xatolik:', error);
      });
  }, []); // bo'sh dependency array, faqat bir marta bajariladi

  const handleConvert = (event) => {
    event.preventDefault();

    if (!field || isNaN(field)) {
      alert('Iltimos, raqam kiriting!');
      return;
    }

    setResult((field * rate).toFixed(2));
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!username) {
      alert('GitHub username kiriting');
      return;
    }

    setLoading(true); // Search tugmasi bosilganda loadingni boshlash
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        if (response.status === 200) {
          setRepos(response.data);
          console.log('GitHub Repos:', response.data);
        }
      })
      .catch((error) => {
        console.error('GitHub Repos olishda xatolik:', error);
      })
      .finally(() => {
        setLoading(false); // Search tugmasi tugagandan so'ng loadingni to'xtatish
      });
  };

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
        <h1 className="result-text">Natija: {result}</h1>
      </form>

      <div>
        <form className="form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            type="text"
            placeholder="GitHub username"
          />
          <button onClick={handleSearch} className="button">
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>

        {repos.length > 0 && (
          <div className="repos-list">
            <h3>GitHub Repositories:</h3>
            <ul>
              {repos.map((repo) => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
