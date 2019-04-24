import React from 'react';

import logo from './assets/logo.jpg';

class Main extends React.Component{

  handleClick(e){
    e.preventDefault();
    let id = e.target.id;
    if(id === 'btn-dev'){
      window.location.href="/signup";
    }
    else{
      window.location.href="/panel";
    }
  }
  render(){
    return(
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Join the largest developer directory or find the best developer profiles
        </p>
        <div className="home-buttons">

          <button id="btn-dev" className="button-large primary" onClick={this.handleClick}>I'm a Developer</button>

          <button id="btn-need-dev" className="button-large clear" onClick={this.handleClick}>Need a Developer</button>

        </div>

        <a className="App-link" href="/login">Login here</a>
      </header>
    );
  }
} export default Main;
