import React from 'react';
import './Search.css'


const SearchForm = props => {

    const { searchTerm, handleSearchInputChange, handleSearchFormSubmit } = props;

    return (
        <form className="search-form" onSubmit={handleSearchFormSubmit}>
            <input
                type="text" 
                placeholder="Type in username you'd like to search" 
                name="todo" 
                value={searchTerm} 
                onChange={handleSearchInputChange}
            />
        </form>
    )
}

export default SearchForm;

