import React from "react";
// import queryString from "query-string";
import { Spinner } from "react-bootstrap";
import Dashboard from "./Dashboard";
import { Redirect, withRouter } from "react-router-dom";

class FormLogin extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.state = props.location.state || {
      isLoggedIn: false,
      uid: null,
      type: 0,
      isError: false,
      error: null,
      clicked: false
    };
  }
  componentDidMount() {
    this.setState({ isLoggedIn: false });
    this.handleAuth(this.state.isLoggedIn);
  }
  sendLogin(email, password) {
    return fetch("http://localhost:5000/api/v1/auth/login", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => res.json())
      .then(response => {
        console.log("user found: ", response);
        if (response.e) {
          let msg =
            response.e.code === "unavailable"
              ? "Service not available"
              : response.e.message;
          this.setState(ps => ({
            clicked: !ps.clicked,
            isError: true,
            error: msg
          }));
        } else {
          const userinfo = response.userInfo;
          this.setState(
            ps => ({
              isLoggedIn: !ps.isLoggedIn,
              uid: userinfo.uid,
              type: userinfo.type,
              redirectToReferrer: !ps.redirectToReferrer
            }),
            () => {
              console.log("handleauth: ", this.state.isLoggedIn);
              this.handleAuth(this.state.isLoggedIn);
            }
          );
        }
      });
  }
  handleAuth(status) {
    this.props.onAuthentication(status);
  }
  handleSubmit(e) {
    e.preventDefault();
    const inputs = e.target;
    const email = inputs[1].value;
    const password = inputs[2].value;
    console.log("inputs: ", email);
    this.setState(
      ps => ({ clicked: !ps.clicked }),
      () => {
        this.sendLogin(email, password);
      }
    );
  }
  handleClick(e) {
    e.preventDefault();
    this.setState(ps => ({ clicked: !ps.clicked }));
  }
  // getValidationState(email) {
  //   const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   if (expression.test(email)) return "success";
  //   else return "error";
  // }

  handleChange(e) {
    let email = e.target.value;
    this.setState({ email: email });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: {
              authenticated: true,
              uid: this.state.uid,
              type: this.state.type
            }
          }}
        />
      );
    } else {
      return (
        <div className="dashboard mdl-color--white">
          <div
            className="mdl-shadow--0dp form-container mdl-shadow--2dp"
            id="form-container"
          >
            <form action="#" onSubmit={this.handleSubmit}>
              <input type="hidden" value="password" id="auth" name="auth" />
              {this.state.isError ? (
                <div className="error">{this.state.error}</div>
              ) : null}
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
              <a href="signup">Forgot password?</a>
              <p />
              <div className="button-container">
                {!this.state.clicked ? (
                  <button
                    type="submit"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
                  >
                    Login
                  </button>
                ) : (
                  <Spinner animation="grow" />
                )}
                <a
                  href="signup"
                  className="mdl-button mdl-js-button mdl-button mdl-button--accent"
                >
                  Signup
                </a>
              </div>
            </form>
            {/* <div className="image-container">
              <div
                data-width="300"
                data-redirecturi="http://localhost:3000/dashboard"
              >
                <button id="my-signin2">Sign in with Google</button>
              </div>
              </div> 
            </div> */}
          </div>
        </div>
      );
    }
  }
}
export default FormLogin;
