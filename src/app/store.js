import { configureStore } from '@reduxjs/toolkit'; // imports the configureStore function from the @reduxjs/toolkit package. The configureStore function is used to create a Redux store with predefined middleware and configuration options.
import countriesReducer from '../features/countrySlice'; // imports the countriesReducer from the countrySlice.js file located in the ../features directory. This reducer will handle the state updates for the 'countries' slice of the Redux store.



export default configureStore({ //  //exports a default value from the module, which is the result of calling the configureStore function.The configureStore function is called with an object argument that contains a reducer property.
  reducer: {
    countries: countriesReducer, 
  }
}); // assigns the countriesReducer to the countries key in the reducer object. This means that the countriesReducer will handle the state updates for the 'countries' slice of the Redux store.
