import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ErrorMessage from './Error.jsx';

const inputStyle = {
  width: 50
}

class FocalRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaCode: '',
      prefix: '',
      lineNum: '',
      phoneError: false
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

  sendNumber() {
    console.log('phoneclicked');
    var phoneNumber = '1' + this.state.areaCode + this.state.prefix + this.state.lineNum;
    if (phoneNumber.length !== 11) {
      this.setState({
        phoneError: true 
      });
    } else {
      this.setState({
        phoneError: false 
      });
      var ingredientsMessage = 'Could you please make me ' + this.props.focalRecipe.title + '? ' + 'The ingredients needed are: ' + this.props.focalRecipe.extendedIngredients.reduce((ingredients, ingredient) => ingredients + ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name + ', ', '');
      ingredientsMessage = ingredientsMessage.slice(0, -2);
      $.ajax({
        method: 'POST',
        url: '/sendText',
        data: JSON.stringify({
          number: phoneNumber,
          ingredients: ingredientsMessage
        }),
        contentType: 'application/json',
        success: (res) => {
          console.log('phone number sent!')
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

      <div class="ui link cards">
        <div class="card">
          <h3>{this.props.focalRecipe.title}</h3>
          <div class="image">
            <img src={this.props.focalRecipe.image}/>
          </div>

          <div class="content">
            <div class="header">Ingredients</div>
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
          <label>Text Ingredients</label>
          <div class="inline fields">
              <div class="field">
                <div class="ui mini input">
                  <input style={inputStyle} value={this.state.areaCode} onChange={this.onAreaCodeEntry} type="text" placeholder="(xxx)" />
                </div>
              </div>
              <div class="field">
                <div class="ui mini input">
                  <input style={inputStyle} value={this.state.prefix} onChange={this.onPrefixEntry} type="text" placeholder="xxx" />
                </div>
              </div>
              <div class="field">
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
          this.props.favoriteError ? 
            <ErrorMessage
              message = {"Enter a username before adding a favorite"}
            /> : null
        }
        <div>
          <button
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



   // <div>
   //        <h3>Main Recipe</h3>
   //          <ul>
   //            <div>{this.props.focalRecipe.title} </div>
   //            <div> <img src={this.props.focalRecipe.image}alt="" /> </div>
   //          </ul>
   //        <div>
   //          <h5>Ingredients</h5>
   //            {this.props.focalRecipe.extendedIngredients.map((ingredient) =>
   //              <ul key={ingredient}> {ingredient.originalString} </ul>
   //            )}
   //        </div>
   //      </div>