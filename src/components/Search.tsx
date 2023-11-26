import { useState } from "react";

const Search = ()=>{
 
  
    return (
      <div className="wrapper">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="sr-only">Search countries here</span>
          </label>
        </div>
      </div>
    );
}
export default Search;