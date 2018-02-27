import React from 'react';
import RecipeEntry from './RecipeEntry.jsx';

//add random favorites default
var FavoritesList = (props) => {
  return (
    <div class="ui segment">
      <h3>Favorites </h3>

      <div class="ui five link cards">
        {props.favoriteList.map((recipe) =>
          <div class="card" onClick = {() => props.onRecipeClick(recipe)}>

            <div class="image">
              <img src={recipe.image}/>
            </div>

            <div class="content">
              <div class="header">{recipe.title}</div>
            </div>

            <div class="extra content">
              <span class="right floated">
                <i class="heart outline icon"></i>
              </span>
              <span>
                Likes: {recipe.likes}
              </span>
            </div>

          </div>
        )}
      </div>    


    </div>
  );
}

export default FavoritesList;






    // <div class="ui segment">
    //   <h3 class="ui header">{props.currentUser} Favorites</h3>
    //   <div class="ui grid">
    //     {props.favoriteList.map((recipe) =>
    //       <ul>
    //         <RecipeEntry recipe={recipe}
    //         onRecipeClick = {props.onRecipeClick}
    //         />
    //       </ul>
    //     )}
    //   </div>
    // </div>