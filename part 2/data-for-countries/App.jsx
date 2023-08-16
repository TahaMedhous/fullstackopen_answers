import { useEffect, useState } from "react";
import CountryDisplay from "./Components/CountryDisplay";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [term, setTerm] = useState(null);
  const [result, setResult] = useState([]);
  const [weather, setWeather] = useState(null);

  const handleInputChange = (event) => {
    event.preventDefault();
    setTerm(event.target.value);
  };

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all/")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const filterCountries = () => {
      const filteredC = countries.filter((country) =>
        country.name.common.toLowerCase().includes(term.toLowerCase())
      );
      setResult(filteredC);
    };

    if (term !== null && term !== "") {
      filterCountries();
    }

    return () => {
      setResult([]);
    };
  }, [term]);

  return (
    <div>
      {countries.length < 1 ? (
        <p>please wait while the data is loading</p>
      ) : (
        <>
          <label>find countries</label>
          <input type="text" onChange={handleInputChange} />
          <br />
          <CountryDisplay results={result} setResult={setResult} />
        </>
      )}
    </div>
  );
};

export default App;
