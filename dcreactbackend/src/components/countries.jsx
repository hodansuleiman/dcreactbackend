import React, { useState, useEffect } from "react";

const Countries = () => {
  const [countries, setCountries] = useState();
  const [inputSearch, setInputSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const fetchCountryData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setCountries(data[0]);
    console.log("?", data[0]);
  };

  useEffect(() => {}, []); // fetch data once on load

  const inputHandler = (e) => {
    setInputSearch(e.target.value);
  };

  const submitHandler = (e) => {
    const url = `https://restcountries.com/v3.1/all`;
    fetchCountryData(url);
  };

  // what we would lke to return

  return (
    <>
      <input name="search" onChange={inputHandler} value={inputSearch} />
      <button onClick={submitHandler}> search</button>
      {countries && (
        <div>
          <img src={countries.flags.png} alt={countries.name.official} />
          <h3> {countries.name.official}</h3>
          <h4>
            Population: <span>{countries.population}</span>
          </h4>
          <h4> Region:{countries.region}</h4>
          {countries.capital && <h4> Captial: {countries.capital[0]}</h4>}
          <button onClick={() => setShowDetails(!showDetails)}>
            Show Details
          </button>
          {showDetails && (
            <div>
              <img src={countries.flags.png} alt={countries.name.official} />
              <h3> {countries.name.official}</h3>
              <h4>
                Population: <span>{countries.population}</span>
              </h4>
              <h4> Region:{countries.region}</h4>
              {countries.capital && <h4> Captial: {countries.capital[0]}</h4>}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Countries;
