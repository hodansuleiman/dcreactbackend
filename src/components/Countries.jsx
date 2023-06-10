// import statements are used to import necessary dependencies, components, and functions from various files and libraries.

import React, { useState, useEffect } from "react"; // React is imported from the react library. It is necessary to define and use React components. useState and useEffect are imported from the react library. They are React hooks used to manage state and perform side effects.
import { Link } from "react-router-dom"; // Link is imported from the react-router-dom library. It is used to create links and navigate between different routes in a React application.
import FullmapImg from "../Images/fullmap.jpeg"; //FullmapImg is imported from the ../Images/fullmap.jpeg file. It represents an image file used in the component.
import CountryBox from "./CountryBox"; // PROP CountryBox is imported from the ./CountryBox file. It represents a component that displays information about a country.

// REDUX IMPORTING PART BEGINS

import {
  selectCountries, // selectCountries is imported from the ../features/countrySlice file. It represent functions or constants related to managing country data in the Redux store.
  filterCountries, // filterCountries is imported from the ../features/countrySlice file. It represent functions or constants related to managing country data in the Redux store.
  fetchCountries, // fetchCountries is imported from the ../features/countrySlice file. It represent functions or constants related to managing country data in the Redux store.
  fetchByRegion, // fetchByRegion is imported from the ../features/countrySlice file. It represent functions or constants related to managing country data in the Redux store.
  countryClear, // countryClear is imported from the ../features/countrySlice file. It represent functions or constants related to managing country data in the Redux store.
} from "../features/countrySlice";
import { useDispatch, useSelector } from "react-redux"; // useDispatch and useSelector are imported from the react-redux library. They are React hooks used to interact with the Redux store in a functional component.

const Countries = () => {
  // functional component that represents a section of the application related to countries.
  const [countries, setCountries] = useState(); // hook to define state variable countries. setCountries is the corresponding function used to update these state variable.
  const [inputSearch, setInputSearch] = useState(""); // hook to define state variable inputSearch. SetInputSearch is the corresponding function used to update these state variable.
  const dispatch = useDispatch(); // dispatch is a function provided by Redux that allows you to dispatch actions to the Redux store.
  const [selectedContinent, setSelectedContinent] = useState("all"); // options //hook to define state variable selectedContinent. setSelectedContinent is the corresponding function to update the state variables.

  //get variable from redux
  const reduxCountries = useSelector(selectCountries); // is a variable that holds the value of countries selected from the Redux store using useSelector.

  // useEffect is a hook provided by React that allows you to perform side effects in functional components. It takes a function as its first argument, which will be executed after the component has rendered. The second argument is an array of dependencies, and when any of these dependencies change, the effect function will be re-executed. In this code, the effect function is dispatched using the dispatch function to clear the country data stored in the Redux store. The empty array [] as the second argument ensures that the effect is only executed once, when the component is initially rendered.
  useEffect(() => {
    dispatch(countryClear());
  }, []); // fetch data once on load

  // input handler for search bar section
  const inputHandler = (e) => {
    // function handles the input changes in the search bar section
    setInputSearch(e.target.value); //receives an event object e as a parameter, which contains information about the input event. The function sets the value of the input to the inputSearch state variable using setInputSearch.
  };

  // Dropdown For filtering continents section
  const dropdownHandler = (e) => {
    // function that handles the changes in the continent dropdown selection. I
    // Filter continent == e.target.value
    const continent = e.target.value; // It receives an event object e as a parameter, which contains information about the dropdown selection event. The function sets the selected continent to the selectedContinent state variable using setSelectedContinent.
    setSelectedContinent(continent); // setSelectedContinent is a function provided by the useState hook, and it is used to update the value of the selectedContinent state variable. By passing the continent value as an argument to setSelectedContinent, the state variable will be updated with the new value.
    //console.log("dropdown", e.target.value);
    // What I need to work on next
    let url = ""; // declares a variable url and initializes it with an empty string "". By initializing url with an empty string, it ensures that the variable exists and is ready to be updated with the appropriate URL when needed.
    if (continent === "all") {
      // If the selected continent is "all", it dispatches the fetchCountries action using dispatch to fetch all countries.
      dispatch(fetchCountries());
    } else {
      // or else dispatch the fetchByRegion action with the selected continent as an argument to fetch countries by the selected region.
      dispatch(fetchByRegion(continent));
    }
  };

  // submit handler
  const submitHandler = (e) => {
    //  defines a function named submitHandler that takes an event object e as a parameter. This function handles the form submission event.
    e.preventDefault(); // Prevent form submission
    const url = `https://restcountries.com/v3.1/all`; // efines a variable url that holds the URL for fetching all countries' data.

    if (inputSearch.trim() === "") {
      // condition checks if the inputSearch state variable, representing the search input value, is empty or contains only whitespace characters when trimmed. If it is empty, the code block inside this condition is executed.

      dispatch(fetchCountries()); // dispatches the fetchCountries action to the Redux store. It triggers the asynchronous fetching of all countries' data and updates the state with the fetched data.
    } else {
      // or else do this
      // Fetch and filter based on input search

      dispatch(filterCountries(`${inputSearch}`)); // dispatches the filterCountries action to the Redux store, passing the inputSearch value as an argument. It triggers the asynchronous fetching and filtering of countries based on the input search value and updates the state with the filtered data.
      //fetchCountryData(`${url}?name=${inputSearch}`);
    }
  };

  //RENDERING
  // everything we want to see on page jsx format which is conditional rendering

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
      <div className="countryBox">
        {reduxCountries &&
          reduxCountries.map((country, i) => {
            return <CountryBox key={i} country={country} />;
          })}
      </div>
    </div>
  );
};

export default Countries;
