import React from 'react';
import $ from 'jquery';

import AllRecipesList from './AllRecipesList.jsx';
import FavoritesList from './FavoritesList.jsx';
import SearchRecipe from './SearchRecipe.jsx';
import FocalRecipe from './FocalRecipe.jsx';
import RecipeEntry from './RecipeEntry.jsx';
import SearchUser from './SearchUser.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      recipeList: recipeObj.fakeRecipes,
      favoriteList: favoriteRecipes.fakeRecipes,
      focalRecipe: sampleRecipe,
      userSearch: '',
      recipeSearch: '',
      favoriteError: false
    };
    this.onRecipeClick = this.onRecipeClick.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.onUserSearchClick = this.onUserSearchClick.bind(this);
    this.onUserSearch = this.onUserSearch.bind(this);
    this.onRecipeSearch = this.onRecipeSearch.bind(this);
    this.onRecipeSearchClick = this.onRecipeSearchClick.bind(this);
  }

  componentDidMount() {
    var component = this;
    $.ajax({
      type: 'GET',
      url: '/recipe/197109',
      success: function(recipe) {
        console.log(recipe);
        component.setState({
          focalRecipe: recipe
        });
      }
    });
  }

  onRecipeClick (recipe) {
    console.log('recipeClicked!');
    var component = this;
    $.ajax({
      type: 'GET',
      url: '/recipe/' + recipe.id,
      success: function(recipe) {
        console.log(recipe);
        component.setState({
          focalRecipe: recipe
        });
      }
    });
  }

  onUserSearchClick() {
    console.log(this.state.userSearch, 'was clicked')
    this.setState({
      currentUser: this.state.userSearch
    })
    let component = this;
    $.ajax({
      type: 'GET',
      url: '/db/fetch',
      data: 'username=' + component.state.userSearch,
      success: function(favRecipesData) {
        console.log('success!')
        component.setState({
          favoriteList: favRecipesData,
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  onUserSearch(e) {
    this.setState({
      userSearch: e.target.value
    });
    console.log(this.state.userSearch);
  }

  onRecipeSearch(e) {
    this.setState({
      recipeSearch: e.target.value
    });
    console.log(this.state.recipeSearch);
  }

  //add get request for new recipes from server
  onRecipeSearchClick() {
    console.log(this.state.recipeSearch + ' was searched');
    var component = this;
    $.ajax({
      type: 'GET',
      url: '/recipes?ingredients=' + component.state.recipeSearch,
      success:function(recipesData) {
        component.setState({
          recipeList: recipesData
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  //post request to store favorite in database with current user
  //need to account for case where there isn't a currentUser
  addFavorite (recipe) {
    console.log('clicked')
    var component = this;
    if (component.state.userSearch === '') {
      this.setState({
        favoriteError: true
      })
      console.log(this.state.favoriteError, 'error')
    } else {
      this.setState({
        favoriteError: false
      })
      $.ajax({
        method: 'POST',
        url: '/db/save',
        data: {
          username: component.state.userSearch,
          recipeID: component.state.focalRecipe.id,
          title: component.state.focalRecipe.title,
          image: component.state.focalRecipe.image,
          likes: component.state.focalRecipe.likes
        },
        success: (res) => {
          component.onUserSearchClick();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  render() {
    return (
      <div>

      <div class="ui segment">
        <div >
          <FocalRecipe
          focalRecipe = {this.state.focalRecipe}
          recipeList = {this.state.recipeList}
          addFavorite = {this.addFavorite}
          favoriteError = {this.state.favoriteError}
          />
        </div>
      </div>

      <div class="ui segment">
        <div>
          <SearchRecipe
          onRecipeSearch = {this.onRecipeSearch}
          onRecipeSearchClick = {this.onRecipeSearchClick}
          recipeSearch = {this.state.recipeSearch}
          />

          <SearchUser
          onUserSearchClick = {this.onUserSearchClick}
          userSearch = {this.state.userSearch}
          onUserSearch = {this.onUserSearch}
          />
        </div>
      </div>

      <FavoritesList
      favoriteList = {this.state.favoriteList}
      onRecipeClick = {this.onRecipeClick}
      currentUser = {this.state.currentUser}
      />

      <AllRecipesList
      onRecipeClick = {this.onRecipeClick}
      recipeList= {this.state.recipeList}
      />

      </div>
    );
  }
}


//sample data to render

var favoriteRecipes = {fakeRecipes: [
    {
        "id": 933310,
        "title": "2 Ingredient Instant Pot Applesauce",
        "image": "https://spoonacular.com/recipeImages/933310-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 0,
        "likes": 0
    },
    {
        "id": 936707,
        "title": "Dried Apples",
        "image": "https://spoonacular.com/recipeImages/936707-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 1,
        "likes": 265
    },
]}

var recipeObj = {fakeRecipes: [
    {
        "id": 933310,
        "title": "2 Ingredient Instant Pot Applesauce",
        "image": "https://spoonacular.com/recipeImages/933310-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 0,
        "likes": 0
    },
    {
        "id": 936707,
        "title": "Dried Apples",
        "image": "https://spoonacular.com/recipeImages/936707-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 1,
        "likes": 265
    },
    {
        "id": 721001,
        "title": "Apple Fruit Baskets",
        "image": "https://spoonacular.com/recipeImages/721001-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 45
    },
    {
        "id": 65597,
        "title": "Cinnamon Streusel Muffins",
        "image": "https://spoonacular.com/recipeImages/65597-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 0
    },
    {
        "id": 163949,
        "title": "Pork Chops with Apples and Sage",
        "image": "https://spoonacular.com/recipeImages/163949-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 0
    }
]}


var sampleRecipe = {
  "id": 65597,
  "title": "Cinnamon Streusel Muffins",
  "image": "https://spoonacular.com/recipeImages/65597-312x231.jpg",
  "likes": 0,
  "extendedIngredients": ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4', 'ingredient5','ingredient6', 'ingredient7', 'ingredient8']
}

export default App;