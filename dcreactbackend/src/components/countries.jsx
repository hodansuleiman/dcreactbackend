import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState();
  const [inputSearch, setInputSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const fetchCountryData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    console.log("?", data);

    //filtering data
    let filterCountries = [];
    data.map((d) => {
      if (d.name.common.includes(inputSearch)) {
        filterCountries.push(d);
      }
    });
    //inputSearch
    console.log("filtered", filterCountries);
    setCountries(filterCountries);
  };

  useEffect(() => {}, []); // fetch data once on load

  const inputHandler = (e) => {
    setInputSearch(e.target.value);
  };

  const dropdownHandler = (e) => {
    console.log("dropdown", e.target.value);

    //fetch
    //filter contienent == e.target.value
    //push to a array
    //setCoutnries(new arra)
  };

  const submitHandler = (e) => {
    const url = `https://restcountries.com/v3.1/all`;
    fetchCountryData(url);
  };

  // Return the JSX for displaying country details
  // what we would lke to return

  return (
    <>
      <div className="inputs">
        <div className="search-input">
          <input
            name="search"
            placeholder="search for country"
            onChange={inputHandler}
            value={inputSearch}
          />
          <button onClick={submitHandler}> search</button>
        </div>
        <div className="select_region">
          <select onChange={dropdownHandler}>
            <option value="all">All</option>
            <option value="africa">Africa</option>
            <option value="america">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>

      {countries &&
        countries.map((countries) => {
          return (
            <div>
              <img src={countries.flags.png} alt={countries.name.official} />
              <h3> {countries.name.official}</h3>
              <h4>
                Population: <span>{countries.population}</span>
              </h4>
              <h4> Region:{countries.region}</h4>
              {countries.capital && <h4> Captial: {countries.capital[0]}</h4>}
              <div>
                {countries.borders.map((b) => {
                  return <div>{b}</div>;
                })}
              </div>
              {/* <button onClick={() => setShowDetails(!showDetails)}>
                Show Details
              </button>
              {showDetails && (
                <div>
                  <img
                    src={countries.flags.png}
                    alt={countries.name.official}
                  />
                  <h3> {countries.name.official}</h3>
                  <h4>
                    Population: <span>{countries.population}</span>
                  </h4>
                  <h4> Region:{countries.region}</h4>
                  {countries.capital && (
                    <h4> Captial: {countries.capital[0]}</h4>
                  )}
                </div>
              )} */}
            </div>
          );
        })}
    </>
  );
};

/**
 * get all countries by a https://restcountries.com/v3.1/all
 * input serach filter by countries
 * dropdown filter continenent
 */

export default Countries;
