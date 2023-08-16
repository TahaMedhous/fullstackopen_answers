import { useEffect, useState } from "react";

const CountrList = ({ list, setResult }) => {
  const ChangeToOneCntry = (name) => {
    const country = list.find((country) => country.name.common === name);
    setResult([country]);
  };
  return (
    <div>
      {list.length < 10 ? (
        <ul>
          {list.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button
                onClick={() => {
                  ChangeToOneCntry(country.name.common);
                }}
              >
                Show
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <i>Too many matches, specify another filter</i>
      )}
    </div>
  );
};

const CountrOne = ({ country }) => {
  const [weather, setWeather] = useState({
    temp: null,
    wind: null,
  });

  const cap = country.capital[0];
  const key = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${cap}&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: data.current.temp_c,
          wind: data.current.wind_mph,
        });
      });
  }, []);

  return (
    <>
      <h1>{country.name.common}</h1>
      <>capital: {cap}</>
      <br />
      <>area: {country.area}</>
      <br />
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} width="200" />
      <h2>weather in {cap}</h2>
      <p>temperature {weather.temp} Celcius</p>
      <p>wind {weather.wind} m/s</p>
    </>
  );
};

function CountryDisplay({ results, setResult }) {
  if (results.length === 1) {
    return <CountrOne country={results[0]} />;
  } else if (results.length > 1) {
    return <CountrList list={results} setResult={setResult} />;
  }
}

export default CountryDisplay;
