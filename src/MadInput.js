import React, {Component} from 'react';
import './App.css';

class MadInput extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    const{ mad } = this.props 
    const letters2 = /[^a-zA-Z]/gi;
    let wordString = e.target.value.replace(letters2,'');
    mad.userInput = wordString
    this.setState({mad})
    //this.props.inputChange(this.props.id)
  }
  render(){
    const {mad} = this.props
    const {userInput, type} = mad
    return (
      <div>
        <label>{type}</label>
        <input
          onChange={this.handleChange}
          value = {userInput}
          />
      </div>
    );
  }
}

export default MadInput;
