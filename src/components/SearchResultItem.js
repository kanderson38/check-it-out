import React from 'react';

const SearchResultItem = (props) => {

  const { title, author, thumbnail, publishedDate, publisher } = props;

  return(
    <div>
      <img src={thumbnail} alt={title}></img>{title} {author} {publishedDate} {publisher}
    </div>
  )
}

export default SearchResultItem;