import React from "react";

// import logo from "./assets/logo.jpg";
import lady_search from "./assets/search_lady.png";
import CustomRouter from "./Router";
class Main extends React.Component {
  state = { timeToFade: false };
  componentDidMount() {
    console.log("loaded");
    window.setTimeout(() => {
      this.setState(ps => ({ timeToFade: !ps.timeToFade }));
    }, 1000);

    // console.log(hl.textContent);
  }
  render() {
    return (
      <div>
        <div className="form-container" id="form-container">
          <div className="banner">
            <h1
              id="headline"
              className={
                "mdl-color-text--primary " +
                (this.state.timeToFade ? "fadeIn" : "fadeOut")
              }
            >
              Looking for developers with impressive profiles?
            </h1>
            <span className="banner-line mdl-color--accent" />
            <h3>Take control of what you need</h3>
            <a href="signup">
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary">
                try now <i className="material-icons">arrow_forward</i>
              </button>
            </a>
          </div>
          <div className="landing-img">
            <img src={lady_search} alt="search professional profiles" />
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
