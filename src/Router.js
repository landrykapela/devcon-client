import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import FormSignup from "./FormSignup.js";
import FormLogin from "./LoginForm.js";
import Main from "./Main.js";
import Panel from "./Panel.js";
import Pool from "./Pool.js";
import Dashboard from "./Dashboard.js";
import ProtectedRoute from "./ProtectedRoute";
import Authentication from "./authentication";

class CustomRouter extends React.Component {
  constructor(props) {
    super(props);
    this.showSignup = this.showSignup.bind(this);
    this.hideSignup = this.hideSignup.bind(this);
    this.handleAuth = this.handleAuth.bind(this);

    this.index = 0;
    this.users = [
      {
        id: 5,
        title: "Software Developer",
        pic:
          "https://pbs.twimg.com/profile_images/1081846316450439168/qEsbDKoN_400x400.jpg",
        name: "Landry Kapela",
        email: "landrykapela@gmail.com",
        phone: "+255784086726",
        web: "https://landrykapela.github.io/portfolio"
      },

      {
        id: 6,
        title: "Web Developer",
        pic:
          "https://i.kinja-img.com/gawker-media/image/upload/s--vSY-o42Q--/c_scale,f_auto,fl_progressive,q_80,w_800/ecq5rsk3n1nolujedskk.jpg",
        name: "Avatar Matata",
        email: "avatar@gmail.com",
        phone: "+255784086726",
        web:
          "https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"
      },

      {
        id: 7,
        title: "Software Engineer",
        pic:
          "https://www.gravatar.com/avatar/8283f4bb35589863b3b1e0f8ac0968a0?s=328&d=identicon&r=PG",
        name: "Michelle Tilley",
        email: "avatar@gmail.com",
        phone: "+255784086726",
        web:
          "https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"
      },

      {
        id: 8,
        title: ".NET Developer",
        pic:
          "https://www.gravatar.com/avatar/3e2a6a4bb5a88ce2b4805c4a3ca2e4ce?s=328&d=identicon&r=PG",
        name: "Stack Guy",
        email: "avatar@gmail.com",
        phone: "+255784086726",
        web:
          "https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"
      },

      {
        id: 10,
        title: "iOS Developer",
        pic:
          "https://bcassetcdn.com/asset/logo/33e50f33-1151-4b9b-bcfc-4477283efda5/logo?v=4&text=Logo+Text+Here",
        name: "Mac OS",
        email: "avatar@gmail.com",
        phone: "+255784086726",
        web:
          "https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"
      }
    ];
    this.state = { isLoggedIn: false };
  }
  handleAuth() {
    this.setState(ps => ({ isLoggedIn: this.props.login }));
  }
  hideSignup() {
    const signup = document.getElementById("signup");
    if (signup.classList.contains("visible"))
      signup.classList.remove("visible");
    signup.classList.add("hidden");
  }
  showSignup() {
    const signup = document.getElementById("signup");
    signup.classList.remove("hidden");
  }
  componentDidMount() {
    this.handleAuth();
    console.log("Router: ", this.props.login);
  }

  render() {
    return (
      <Router>
        <div>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-menu-item">
              <NavLink to="/panel">Panel</NavLink>
            </li>
            <li className="nav-menu-item">
              <NavLink exact to="/pool">
                Pool
              </NavLink>
            </li>
            <li className="nav-menu-item">
              <NavLink exact to="/dashboard">
                Dashboard
              </NavLink>
            </li>

            <li className="nav-menu-item">
              <NavLink exact to="/login">
                {this.state.isLoggedIn ? "Logout" : "Login"}
              </NavLink>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/signup" component={FormSignup} />
            <Route
              path="/login"
              render={props => (
                <FormLogin
                  {...props}
                  target={this.state.isLoggedIn ? "out" : "in"}
                  onAuthentication={this.handleAuth}
                />
              )}
            />
            <Route
              path="/dashboard"
              render={props => (
                <Dashboard
                  {...props}
                  onAuthentication={this.handleAuth}
                  authenticated={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              path="/pool"
              render={props => (
                <Pool {...props} authenticated={this.state.isLoggedIn} />
              )}
            />
            <Route path="/panel" component={Panel} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default CustomRouter;
