import React from 'react';

var ErrorMessage = (props) => {
  return (
    <div class="ui compact negative message">
      <p>{props.message}</p>
    </div>
  );
}

export default ErrorMessage;