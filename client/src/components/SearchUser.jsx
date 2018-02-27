import React from 'react';

var SearchUser = (props) => {
  return (
    <div>
      <form class="ui form">
        <div class="ui field">
          <label>Friend Search</label>
          <input value={props.userSearch} onChange={props.onUserSearch}/>
        </div>
        <button class="ui button"
          onClick={props.onUserSearchClick}>
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchUser;