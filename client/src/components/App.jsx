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
      recipeSearch: ''
    };
    this.onRecipeClick = this.onRecipeClick.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.onUserSearchClick = this.onUserSearchClick.bind(this);
    this.onUserSearch = this.onUserSearch.bind(this);
    this.onRecipeSearch = this.onRecipeSearch.bind(this);
    this.onRecipeSearchClick = this.onRecipeSearchClick.bind(this);
  }

  // componentDidMount() {
  //   $.ajax({
  //     method: 'GET',
  //     url: '/', 
  //     success: (res) => {
  //       this.setState({
  //         recipeList: res.recipeList,
  //         favoriteList: res.favoriteList,
  //         focalRecipe: res.recipeList[0]
  //       });
  //     },
  //     error: (err) => {
  //       console.log('get request failed');
  //     }
  //   });
  // }

  onRecipeClick (recipe) {
    this.setState({
      focalRecipe: recipe
    });
  }

  //get request for list of favorites
  //modify the existing favorites list
  onUserSearchClick() {
    console.log(this.state.userSearch + ' was searched');
    this.setState({
      currentUser : this.state.userSearch
    })
    //check if user is in database
    //on success:
    // this.setState({
    //   this.currentUser = this.state.userSearch
    //   this.favoritesList = res.favoriteList
    // })
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
  }


  //post request to store favorite in database with current user
  //need to account for case where there isn't a currentUser
  addFavorite (recipe) {
    console.log('added to favorites');
  //   $.ajax({
  //     method: 'POST',
  //     url: '/', 
  //     data: {
  //       username: this.state.currentUser,
  //       recipe: this.state.focalRecipe
  //     }
  //     success: (res) => {
  //       console.log('success')
  //     },
  //     error: (err) => {
  //       console.log('get request failed');
  //     }
  //   });
  // }
  }

  render() {
    return (
      <div>

      <div>
      Current user: {this.state.currentUser}
      </div>

      <FocalRecipe
      focalRecipe = {this.state.focalRecipe}
      recipeList = {this.state.recipeList}
      addFavorite = {this.addFavorite}
      />

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

      <FavoritesList
      favoriteList = {this.state.favoriteList}
      />

      <AllRecipesList
      onRecipeClick = {this.onRecipeClick}
      recipeList= {this.state.recipeList}
      />

      <RecipeEntry/>

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
  "ingredients": ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4', 'ingredient5','ingredient6', 'ingredient7', 'ingredient8']
}

export default App;