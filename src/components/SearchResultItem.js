import React from 'react';
import './SearchResultItem.css'

const SearchResultItem = (props) => {

  const { title, author, thumbnail, description, addBookCallback } = props;

  return (
    <div className="search-results">
      <div className="search-results-image-and-button">
        <img src={thumbnail} alt={title} className="search-result-thumbnail"></img>
        <span className="add-button"  onClick={() => { addBookCallback(props) }}>Add to Library</span>
      </div>
      <span className="search-result-title">{title}</span>
      <span className="search-result-author"> {author}</span>
      <span className="search-result-description">{description}</span>
    </div>
  )
}

export default SearchResultItem;