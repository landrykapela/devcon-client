import React from "react";
import queryString from "query-string";
import resume from "./assets/resume.png";
import { Spinner, FormLabel, FormGroup, FormControl } from "react-bootstrap";

class FormLogin extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: "",
      emailValid: false,
      clicked: false
    };
  }
  handleClick(e) {
    e.preventDefault();
    this.setState(ps => ({ clicked: !ps.clicked }));
  }
  getValidationState(email) {
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (expression.test(email)) return "success";
    else return "error";
  }

  handleChange(e) {
    let email = e.target.value;
    this.setState({ email: email });
  }

  render() {
    return (
      <div className="mdl-shadow--2dp form-container" id="form-container">
        <form action="#" className="mdl-card mdl-shadow--0dp">
          <div className="button-container">
            <div class="g-signin2" data-onsuccess="onSignIn">
              Signin with Google
            </div>
            <div>
              <a id="github-button" class="btn btn-block btn-social btn-github">
                <i class="fa fa-github" /> Sign in with Github
              </a>
            </div>
          </div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="email"
              id="email"
              name="email"
            />
            <label className="mdl-textfield__label" for="email">
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
            <label className="mdl-textfield__label" for="password">
              Password...
            </label>
          </div>
          <a href="signup">Forgot password?</a>
          <p />
          <div className="button-container">
            <button
              type="submit"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
              onClick={this.handleClick}
            >
              {this.state.clicked ? <Spinner animation="grow" /> : "Login"}
            </button>
            <a
              href="signup"
              className="mdl-button mdl-js-button mdl-button mdl-button--accent"
            >
              Signup
            </a>
          </div>
        </form>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-color--primary image-container">
          <img src={resume} alt="search professional profiles" />
        </div>
      </div>
    );
  }
}
export default FormLogin;
