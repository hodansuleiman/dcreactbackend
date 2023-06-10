import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // imports the createAsyncThunk and createSlice functions from the @reduxjs/toolkit package. These functions are utility functions provided by Redux Toolkit for creating async thunks and slices.



// Create Async Thunks:

//all countries 
export const fetchCountries = createAsyncThunk('country/all' , async() => { // defines an async thunk named fetchCountries. It takes no arguments 
  const response = await fetch('https://restcountries.com/v3.1/all') // makes an asynchronous request to fetch data from the endpoint 'https://restcountries.com/v3.1/all'.
  const data = await response.json(); // Once the data is retrieved, it is returned as the payload of the async thunk.
  return data
});


//by region 
export const fetchByRegion = createAsyncThunk('country/all' , async(query) => { //defines an async thunk named fetchByRegion. It takes a query argument 
    let url = `https://restcountries.com/v3.1/region/${query}`; //  makes an asynchronous request to fetch data from the endpoint 'https://restcountries.com/v3.1/region/${query}'. The query parameter is interpolated into the URL. 
    const response = await fetch(url)
    const data = await response.json(); // Once the data is retrieved, it is returned as the payload of the async thunk.
    return data
  });
  

  //funciton to clear country on all 
export const countryClear = createAsyncThunk('country/all' , async(query) => { // defines an async thunk named countryClear. It takes no arguments and returns an empty array as the payload of the async thunk.
   
    return []
  });
  

  //filter by countries 
export const filterCountries = createAsyncThunk('country/all' , async(query) => { // defines an async thunk named filterCountries. It takes a query argument

    //https://restcountries.com/v3.1/all?name=somalia
    let url = `https://restcountries.com/v3.1/name/${query}`; // makes an asynchronous request to fetch data from the endpoint 'https://restcountries.com/v3.1/name/${query}'
    console.log("url",url)
    const response = await fetch(url) // The query parameter is interpolated into the URL. 
    const data = await response.json(); // Once the data is retrieved, it is returned as the payload of the async thunk.
    console.log("??", data)
    return data
  });

export const countrySlice = createSlice({  //  uses the createSlice function to define a Redux slice named countrySlice. It takes an object as an argument, which specifies the name of the slice ('countries') 
  name: 'countries',
  initialState: [], // initialState of the slice (an empty array).
  

  // extraReducers property of the countrySlice object is used to define additional reducer logic for handling actions that are not defined explicitly in the reducers property. In this case, it adds a case for fetchCountries.fulfilled action, which updates the state with the payload received from the fetchCountries async thunk.
  extraReducers(builder) {
    builder.addCase(fetchCountries.fulfilled, (state, action) =>{
      return action.payload;
    });
  }
});

// allows us to read from this slice of state
export const selectCountries = state => { // defines a selector function named selectCountries. It takes the state as an argument and returns the state.countries value.

    return state.countries
};

export const {getCountries} = countrySlice.actions; // exports the getCountries action from the countrySlice.actions object.

export default countrySlice.reducer; // exported as the default export of the module. It represents the reducer function for the countries slice.