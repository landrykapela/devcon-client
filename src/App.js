import React, { Component } from "react";
import "./App.css";
import Main from "./Main.js";
import CustomRouter from "./Router";

class App extends Component {
  constructor(props) {
    super(props);
    this.getLogin = this.getLogin.bind(this);
    this.state = { isLoggedIn: false };
  }

  componentDidMount() {
    console.log("state: ", this.state);
  }
  getLogin() {
    this.route = window.location.href.split("/");
    console.log("current route: " + this.route[this.route.length - 1]);
    if (this.route[this.route.length - 1] === "panel") {
      this.setState(prevState => {
        return { isLoggedIn: !prevState.isLoggedIn };
      });
    } else {
      this.setState(prevState => {
        return { isLoggedIn: prevState.isLoggedIn };
      });
    }

    console.log("login: " + this.getLogin());
  }
  render() {
    return (
      <div className="App">
        <CustomRouter login={this.state.isLoggedIn} />
      </div>
    );
  }
}

export default App;
