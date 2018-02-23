import React from 'react';

var SearchUser = (props) => {
  return (
    <div>
      <h5>Friend Search</h5>
      <input value={props.userSearch} onChange={props.onUserSearch}/>
      <button 
        onClick={props.onUserSearchClick}> 
        Search
      </button>
    </div>
  );
}

export default SearchUser;