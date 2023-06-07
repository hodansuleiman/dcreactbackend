import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FullmapImg from "../Images/fullmap.jpeg";
import CountryBox from "./CountryBox";

const Countries = () => {
  const [countries, setCountries] = useState();
  const [inputSearch, setInputSearch] = useState("");

  // const [showDetails, setShowDetails] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState("all");

  const fetchCountryData = async (url, filter = true) => {
    const response = await fetch(url);
    const data = await response.json();

    // console.log("?", data);

    if (filter) {
      let filterCountries = []; //empty array
      data.forEach((d) => {
        const countryName = d.name.common.toLowerCase(); // data name lowercase
        const searchValue = inputSearch.toLowerCase();
        if (countryName.includes(searchValue)) {
          // if the inputname includes search value push in the data
          filterCountries.push(d);
        }
      });

      // console.log("filtered", filterCountries);
      setCountries(filterCountries);
    } else {
      // console.log("data", data);
      setCountries(data);
    }

    // Filtering data
  };

  useEffect(() => {}, []); // fetch data once on load

  const inputHandler = (e) => {
    setInputSearch(e.target.value);
  };

  // For filtering continents section
  const dropdownHandler = (e) => {
    // Filter continent == e.target.value
    const continent = e.target.value;
    setSelectedContinent(continent);
    console.log("dropdown", e.target.value);
    // What I need to work on next
    let url = "";
    // Push to an array
    // setCoutnries(new array)
    if (continent === "all") {
      // Fetch all countries
      url = `https://restcountries.com/v3.1/all`; //    // Fetch
      fetchCountryData(url, false);
    } else {
      // Fetch countries by selected continent
      url = `https://restcountries.com/v3.1/region/${continent}`; //    // Fetch
      fetchCountryData(url);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault(); // Prevent form submission
    const url = `https://restcountries.com/v3.1/all`;

    if (inputSearch.trim() === "") {
      // Fetch all countries
      fetchCountryData(url), false;
    } else {
      // Fetch and filter based on input search
      fetchCountryData(`${url}?name=${inputSearch}`);
    }
  };

  return (
    <div className="Countries">
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
            <option value="-">-</option>
            <option value="all">All</option>
            <option value="africa">Africa</option>
            <option value="america">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div class="countryBox">
        {countries &&
          countries.map((country) => {
            return <CountryBox country={country} />;
          })}
      </div>
    </div>
  );
};

export default Countries;
