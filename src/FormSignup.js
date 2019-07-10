import React from "react";
import { Spinner } from "react-bootstrap";
import Dashboard from "./Dashboard";
import { Redirect } from "react-router-dom";

class FormSignup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendSignup = this.sendSignup.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.state = {
      clicked: false,
      isError: null,
      error: "",
      uid: null,
      type: 0,
      checked: false
    };
  }
  handleCheck(e) {
    if (e.target.checked) {
      this.setState(ps => ({ type: 0 }));
    } else {
      this.setState(ps => ({ type: 1 }));
    }
  }
  sendSignup(_email, _name, _password, _type) {
    return fetch("http://localhost:5000/api/v1/auth/signup", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: _email,
        type: _type,
        name: _name,
        password: _password
      })
    })
      .then(res => res.json())
      .then(userinfo => {
        console.log("sendsignup: ", userinfo);
        let r = userinfo.response;
        if (r.code) {
          this.setState(ps => ({
            clicked: !ps.clicked,
            isError: true,
            error: r.message
          }));
        } else {
          this.setState(ps => ({
            clicked: !ps.clicked,
            isError: false,
            uid: r.user.uid,
            type: r.user.type
          }));
        }
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState(ps => ({ clicked: !ps.clicked }));
    const inputs = e.target;
    const name = inputs[0].value;
    const email = inputs[1].value;
    const password = inputs[2].value;
    const type = inputs[3].value;
    for (let i = 0; i < inputs.length; i++) {
      console.log(inputs[i].name, inputs[i].value);
    }
    this.sendSignup(email, name, password, this.state.type);
  }
  componentWillReceiveProps(props) {
    this.heading = this.props.target;
  }
  componentDidMount(props) {}
  render() {
    if (this.state.isError === false) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: {
              authenticated: true,
              uid: this.state.uid,
              type: this.state.type,
              isRedirect: true
            }
          }}
        />
      );
    } else {
      return (
        <div className="dashboard">
          <div className="banner-1">
            <h1>Over 15000 developer profiles</h1>
            <h3 className="mdl-color-text--primary">
              Over 2000 profile viewers daily
            </h3>
            <p />
          </div>
          <div
            className="mdl-shadow--0dp form-container mdl-shadow--2dp"
            id="form-container"
          >
            <form action="#" onSubmit={this.handleSubmit}>
              {this.state.isError ? (
                <div className="error">{this.state.error}</div>
              ) : null}
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id="name"
                  name="name"
                />
                <label className="mdl-textfield__label" htmlFor="name">
                  Name...
                </label>
              </div>

              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  className="mdl-textfield__input"
                  type="email"
                  id="email"
                  name="email"
                />
                <label className="mdl-textfield__label" htmlFor="email">
                  E-mail...
                </label>
                <span className="mdl-textfield__error">
                  Invalid e-mail address!
                </span>
              </div>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  className="mdl-textfield__input"
                  type="password"
                  id="password"
                  name="password"
                />
                <label className="mdl-textfield__label" htmlFor="password">
                  Password...
                </label>
              </div>
              <div className="mdl-checkbox mdl-js-checkbox left">
                <label className="mdl-checkbox__label" htmlFor="type">
                  I'm a developer
                </label>
                <input
                  className="mdl-checkbox__input"
                  type="checkbox"
                  id="type"
                  name="type"
                  onChange={this.handleCheck}
                />
              </div>

              <p />
              <div className="button-container">
                {!this.state.clicked ? (
                  <button
                    type="submit"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
                  >
                    Signup
                  </button>
                ) : (
                  <Spinner animation="grow" />
                )}
                <a
                  href="signup"
                  className="mdl-button mdl-js-button mdl-button mdl-button--accent"
                >
                  Login here
                </a>
              </div>
            </form>
            <div className="image-container">
              <div data-width="300" data-backgground>
                <button id="my-signin2">Sign in with Google</button>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      );
    }
  }
}
export default FormSignup;
