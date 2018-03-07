# Food Matrix

> A web app that allows you to search ingredients to find matching recipes and text the ingredients to yourself or a friend.

## Contributors

  - [Greg Kolb - Software Engineer](https://github.com/gkolb)
  - [John Blaine - Software Engineer](https://github.com/john-blaine)
  - [Paula Obler - Software Engineer](https://github.com/paula-o)

## Technologies

  - [Nodejs](https://nodejs.org/en/)
  - [React](https://reactjs.org/)
  - [MongoDB](https://www.mongodb.com/)
  - [Twilio API](https://www.twilio.com/docs/api/rest)
  - [Spoonacular API](https://spoonacular.com/food-api)
  - [Axios](https://www.npmjs.com/package/axios)
  - [Semantic UI](https://semantic-ui.com/)

## Getting Started

- App deployed on Heroku at https://foodmatrix.herokuapp.com/

- Spoonacular API
  -Register for a [Spoonacular API key](https://rapidapi.com/user/spoonacular/package/Recipe%20-%20Food%20-%20Nutrition/pricing)
  - Add API key to X_MASHAPE_KEY variable in .env file

- Twilio API
  - Register for a [Twilio account](https://www.twilio.com/docs/api/rest/account) and [Twilio API key](https://www.twilio.com/docs/api/rest/keys)
  - Add Twilio SID and Auth Token to TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN variables and MONGO=mongodb://localhost/foodmatrix in your .env file

- Database Installation
  - [Install mongoDB](https://docs.mongodb.com/getting-started/shell/tutorial/install-mongodb-on-os-x/)

- Terminal Commands
  - Install dependencies:
  ```sh
  npm install
  ```
  - Start React:
  ```sh
  npm run react-dev
  ```
  - Start Server:
  ```sh
  npm run server-dev
  ```
  - Start Mongo Database: (may vary based on install location)
  ```sh
  mongod
  ```

- Run app in browser at localhost:3000
