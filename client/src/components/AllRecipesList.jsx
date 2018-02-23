import React from 'react';
import RecipeEntry from './RecipeEntry.jsx';
import recipeObj from '../../../database-mongo/RecipeListData.js';

var AllRecipesList = (props) => {
  return (
    <div>
      <h3>All Recipes </h3>
        {props.recipeList.map((recipe) =>
          <ul>
            <div>{recipe.title} </div>
            <div> <img src={recipe.image}alt="" /> </div>
          </ul>   
        )}
    </div>
  );
}

export default AllRecipesList;