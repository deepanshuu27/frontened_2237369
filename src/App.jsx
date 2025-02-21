import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./styles.css";

function App() {
  const [inputData, setInputData] = useState('{"data": ["M", "1", "334", "4", "B"]}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filters = [
    { value: "Numbers", label: "Numbers" },
    { value: "Alphabets", label: "Alphabets" },
    { value: "Highest Alphabet", label: "Highest Alphabet" },
  ];

  useEffect(() => {
    document.title = "ABCD123"; 
  }, []);

  const handleSubmit = async () => {
    setError(""); 
    setResponse(null); 

    try {
      const jsonData = JSON.parse(inputData); 

      const res = await axios.post("https://backened-2237369.onrender.com", jsonData);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON input or Failed to fetch API.");
    }
  };

  return (
    <div className="container">
      <h2>API Input</h2>
      <textarea
        className="input-box"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button className="submit-btn" onClick={handleSubmit}>Submit</button>

      {error && <p className="error">{error}</p>}

      {response && (
        <>
          <legend class="multi-filter-container">Multi Filter</legend>
          <Select
            isMulti
            options={filters}
            className="dropdown"
            onChange={(selectedOptions) =>
              setSelectedFilters(selectedOptions.map((opt) => opt.value))
            }
          />

          <div className="response-container">
            <h3>Filtered Response</h3>
            
            {selectedFilters.includes("Numbers") && response.numbers.length > 0 && (
              <p><strong>Numbers:</strong> {response.numbers.join(", ")}</p>
            )}

            {selectedFilters.includes("Alphabets") && response.alphabets.length > 0 && (
              <p><strong>Alphabets:</strong> {response.alphabets.join(", ")}</p>
            )}

            {selectedFilters.includes("Highest Alphabet") && response.highest_alphabet.length > 0 && (
              <p><strong>Highest Alphabet:</strong> {response.highest_alphabet.join(", ")}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
