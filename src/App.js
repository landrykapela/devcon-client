import React, { Component } from 'react';
import './App.css';
import Router from './Router.js';

class App extends Component {
  constructor(props){
    super(props);
    this.getLogin = this.getLogin.bind(this);
    this.state = {isLoggedIn:false};
  }

componentDidMount(){

}
getLogin(){
  this.route = window.location.href.split('/');
  console.log("current route: "+this.route[this.route.length-1]);
  if(this.route[this.route.length-1] === "panel") {
    this.setState((prevState)=>
    {
      return {isLoggedIn:!prevState.isLoggedIn};
    });
  }
  else{
    this.setState((prevState)=>
    {
      return {isLoggedIn:prevState.isLoggedIn};
    });
  }

  console.log("login: "+this.getLogin());

}
  render() {

    return (
      <div className="App">
        <Router login={this.state.isLoggedIn}/>

      </div>
    );
  }
}

export default App;
