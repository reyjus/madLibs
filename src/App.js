import React, {Component} from 'react';
import MadInput from "./MadInput.js";
import madStates from "./madStates.js";
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      mads : [],
      firstLoad: true,
      madLibFinished: false,
      madLibStrang: "",
      index : 0
    }
  }
  
  showMadLib = () => {
    let {mads} = this.state;
    for(let i = 0; i < mads.length; i++){
      if(mads[i].userInput === ""){
        console.log("not ready");
        return;
      }
    }
    this.setState({madLibFinished: true})
    this.getMadLib();
    console.log("ready");
  }
  
  getMadLib = () => {
    let str = "";
    let {mads, index} = this.state;
    for(let i = 0; i < madStates.length; i++){
      str += madStates[index][i].string + mads[i].userInput;
    }
    this.setState({madLibStrang: str});
  }
  
  resetMadLib = () => {
    let {madLibFinished} = this.state;
    if(!madLibFinished){
      console.log("not finished");
      return;
    }
    
    let dexVar = Math.floor(Math.random() * madStates.length);
    while(dexVar === this.state.index){
      dexVar = Math.floor(Math.random() * madStates.length);
    }
    
    let m = [];
    for(let i = 0; i < madStates[dexVar].length; i++){
      const mad = {
        location: i,
        type: madStates[dexVar][i].type,
        userInput: ""
      }
      m.push(mad);
    }
    
    this.setState({mads: m});
    this.setState({index: dexVar});
    this.setState({madLibStrang: ""});
    this.setState({madLibFinished: false});
  }
  
  render(){
    let {mads, madLibStrang, firstLoad} = this.state;
    if(firstLoad){
      let dexVar = Math.floor(Math.random() * madStates.length);
      let m = [];
      for(let i = 0; i < madStates[dexVar].length; i++){
        const mad = {
          location: i,
          type: madStates[dexVar][i].type,
          userInput: ""
        }
        m.push(mad);
      }
      this.setState({mads: m});
      this.setState({firstLoad: false});
      this.setState({index: dexVar});
    }
    return (
      <div>
        {mads.map(mad => {
          return <MadInput 
                      key={mad.location}
                      mad = {mad}
                      //inputChange = {this.inputChange}
                   />
        })}
        <button onClick = {this.showMadLib}>Show Madlib</button>
        <button onClick = {this.resetMadLib}>Reset</button>
        <p>{madLibStrang}</p>
      </div>
    );
  }
}

export default App;
