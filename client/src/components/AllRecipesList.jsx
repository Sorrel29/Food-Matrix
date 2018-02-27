import React from 'react';
import RecipeEntry from './RecipeEntry.jsx';

var AllRecipesList = (props) => {
  return (
    <div class="ui segment">
      <h3>All Recipes </h3>

      <div class="ui five link cards">
        {props.recipeList.map((recipe) =>
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

export default AllRecipesList;





// <div class="ui grid">
//         {console.log(props.recipeList)}
//           {props.recipeList.map((recipe) =>
//             <div class="four wide column">
//               <RecipeEntry recipe={recipe}
//               onRecipeClick = {props.onRecipeClick}
//               />
//             </div>
//           )}
//       </div>