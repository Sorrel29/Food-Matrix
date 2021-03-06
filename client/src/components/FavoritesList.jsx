import React from 'react';
import RecipeEntry from './RecipeEntry.jsx';

//add random favorites default
var FavoritesList = (props) => {
  if (props.favoriteList.length === 0) {
    return (
      <div class="ui segment">
        <h3>{props.currentUser} Favorites </h3>
        <div>No favorites yet.</div>
      </div>
    )
  } else {
    return (
      <div class="ui segment">
        <h3>{props.currentUser} Favorites </h3>

        <div class="ui five link cards">
          {props.favoriteList.map((recipe) =>

            <div class="card" onClick = {() => props.onRecipeClick(recipe)}>

              <div class="image">
                <img src={recipe.image}/>
              </div>

              <div class="content">
                <div class="header">{recipe.title}</div>
              </div>

            </div>
          )}
        </div>    
      </div>
    );
  }
}

export default FavoritesList;
