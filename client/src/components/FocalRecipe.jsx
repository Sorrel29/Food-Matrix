import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ErrorMessage from './Error.jsx';
import SuccessMessage from './Success.jsx';


const inputStyle = {
  width: 50
}

const style = {
  backgroundColor: "#88C057"
}

class FocalRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaCode: '',
      prefix: '',
      lineNum: '',
      phoneError: false,
      phoneSuccess: false
    };
    this.sendNumber = this.sendNumber.bind(this);
    this.onAreaCodeEntry = this.onAreaCodeEntry.bind(this);
    this.onPrefixEntry = this.onPrefixEntry.bind(this);
    this.onLineNumEntry = this.onLineNumEntry.bind(this);
  }

  onAreaCodeEntry(e) {
    this.setState({
      areaCode: e.target.value
    })
  }

  onPrefixEntry(e) {
    this.setState({
      prefix: e.target.value
    })
  }

  onLineNumEntry(e) {
    this.setState({
      lineNum: e.target.value
    })
  }


  //send text message to user-inputted phone number, containing ingredients from recipe data loaded into the focal recipe component
  sendNumber() {
    var phoneNumber = '1' + this.state.areaCode + this.state.prefix + this.state.lineNum;
    if (phoneNumber.length !== 11) {
      this.setState({
        phoneError: true,
        phoneSuccess: false
      });
    } else {
      this.setState({
        phoneError: false
      });
      //Overly complex algorithm for creating ingredients string to send through text
      var ingredientsMessage = 'Could you please make me ' + this.props.focalRecipe.title + '? ' + 'The ingredients needed are: ' + this.props.focalRecipe.extendedIngredients.reduce((ingredients, ingredient) => ingredients + ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name + ', ', '');
      ingredientsMessage = ingredientsMessage.slice(0, -2);
      var component = this;
      $.ajax({
        method: 'POST',
        url: '/sendText',
        data: JSON.stringify({
          number: phoneNumber,
          ingredients: ingredientsMessage
        }),
        contentType: 'application/json',
        success: (res) => {
          component.setState({
            phoneSuccess: true
          })
        },
        error: (err) => {
          console.log('phone number failed to send');
        }
      });
    }
  }

  render() {
    return (
      <div>

      <div class="ui two column stackable grid">
        <div class="10 wide column">
          <h3>{this.props.focalRecipe.title}</h3>
          <div>
            <a href={this.props.focalRecipe.sourceUrl} target="_blank">
              <img
                class="ui centered rounded image" src={this.props.focalRecipe.image}
              />
            </a>
          </div>
        </div>
        <div class="6 wide column">
          <div class="content">
            <div class="ui centered header small">Ingredients</div>
          </div>

          <div class="extra content">
            <span>
              {this.props.focalRecipe.extendedIngredients.map((ingredient) =>
              <ul> <input type="checkbox"/> {ingredient.originalString} </ul>
              )}
            </span>
          </div>
          </div>

      </div>

        <form class="ui form">
          <div class="ui header small">Text Ingredients</div>
          <div class="inline fields">
              <div class="five wide field">
                <div class="ui mini input">
                  <input style={inputStyle} value={this.state.areaCode} onChange={this.onAreaCodeEntry} type="text" placeholder="(xxx)" />
                </div>
              </div>
              <div class="five wide field">
                <div class="ui mini input">
                  <input style={inputStyle} value={this.state.prefix} onChange={this.onPrefixEntry} type="text" placeholder="xxx" />
                </div>
              </div>
              <div class="six wide field">
                <div class="ui mini input">
                  <input style={inputStyle} value={this.state.lineNum} onChange={this.onLineNumEntry} type="text" placeholder="xxxx" />
                </div>
              </div>
          </div>
        </form>
        {
          this.state.phoneError ?
            <ErrorMessage
              message = {"Invalid Phone Number"}
            /> : null
        }
        {
          this.state.phoneSuccess ?
            <SuccessMessage
              message = {"Text Sent!"}
            /> : null
        }
        {
          this.props.favoriteError ?
            <ErrorMessage
              message = {"Enter a username before adding a favorite"}
            /> : null
        }
        {
          this.props.favoriteSuccess ?
            <SuccessMessage
              message = {"Added to Favorites!"}
            /> : null
        }
        <div class="two ui buttons">
          <button
              style = {style}
              class="ui button"
              onClick={this.sendNumber}>
              Send Text
          </button>
          <button
              class="ui red button"
              onClick={this.props.addFavorite}>
              <i class="heart icon"></i>
              Favorite
          </button>
        </div>
      </div>
    );
  }
}

export default FocalRecipe;
