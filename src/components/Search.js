import React from 'react';

const Search=(props)=> {
    const {searchText,onSearchChange,children}=props;
    return(
      <div>
          {children}<input name="searchText" value={searchText}onChange={onSearchChange} type="text"placeholder="search"></input>
      </div>
    )
  }


export default Search;
