import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    height: "",
    mass: "",
    gender: "",
    films: [],
  });

  useEffect(() => {
    async function fetchData() {
      const results = [];
      for (let i = 1; i <= 10; i++) {
        const res = await axios.get(`https://swapi.dev/api/people/${i}`);
        results.push(res.data);
      }
      setData(results);
    }
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, formData]);
  };

  return (
    <div className="App">
      <div className="grid">
        {data.map((person, index) => (
          <div className="card" key={index}>
            <h3>{person.name}</h3>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            <p>Gender: {person.gender}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Height"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mass"
          value={formData.mass}
          onChange={(e) => setFormData({ ...formData, mass: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
}

export default App;
