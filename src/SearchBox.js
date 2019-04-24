import React from 'react';


function SearchBox(props){

  return(
    <div className="form-search">
      <input type="text" name="search" id="search" placeholder="Search..." onChange={props.onChange}/>

    </div>
  )
}
export default SearchBox;
