import React from 'react';

var SearchRecipe = (props) => {
  return (
    <div>
      <h5>Search Recipe</h5>
      <input value={props.recipeSearch} onChange={props.onRecipeSearch}/>
      <button 
        onClick={props.onRecipeSearchClick}> 
        Search
      </button>
    </div>
  );
}

export default SearchRecipe;