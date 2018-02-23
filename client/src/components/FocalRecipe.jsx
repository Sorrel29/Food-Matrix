import React from 'react';
import ReactDOM from 'react-dom';

class FocalRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: ''
    };
    this.onPhoneEntry = this.onPhoneEntry.bind(this);
    this.sendNumber = this.sendNumber.bind(this);
  }

  onPhoneEntry(e) {
    this.setState({
      phoneNumber: e.target.value
    })
    console.log(e.target.value);
  }

  sendNumber() {
    console.log('sending phone number');
    //console.log(props.recipeList);
    //POST request to send number
    //{number: ''}
    var component = this;
      $.ajax({
        method: 'POST',
        url: '/sendText', 
        data: {number: component.state.phoneNumber},
        success: (res) => {
          console.log('phone number sent!')
        },
        error: (err) => {
          console.log('phone number failed to send');
        }
    });
  }

  render() {
    return (
      <div>
        <h3>Focal Recipe</h3>
          <ul>
            <div>{this.props.focalRecipe.title} </div>
            <div> <img src={this.props.focalRecipe.image}alt="" /> </div>
          </ul>   
        <div>
          <h5>Ingredients List</h5>
            {this.props.focalRecipe.ingredients.map((ingredient) =>
              <ul key={ingredient}> {ingredient} </ul>
            )}
        </div>
        Add phone number: <input value={this.state.phoneNumber} onChange={this.onPhoneEntry}/>
        <button 
          onClick={this.sendNumber}> 
          Send
        </button>
        <button 
          onClick={this.props.addFavorite}> 
          Favorite 
        </button>
      </div>
    );
  }
}

export default FocalRecipe;