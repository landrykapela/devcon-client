import React from "react";

import logo from "./assets/logo.jpg";
import lady_search from "./assets/search_lady.png";

class Main extends React.Component {
  state = { timeToFade: false };
  componentDidMount() {
    console.log("loaded");
    window.setTimeout(() => {
      this.setState(ps => ({ timeToFade: !ps.timeToFade }));
    }, 3000);

    // console.log(hl.textContent);
  }
  render() {
    return (
      <div className="form-container" id="form-container">
        <div className="banner">
          <h1
            id="headline"
            className={
              "mdl-color-text--primary " +
              (this.state.timeToFade ? "fadeIn" : "fadeOut")
            }
          >
            Looking for impressive developer profiles?
          </h1>
          <span className="banner-line mdl-color--accent" />
          <h3>Take control of what you need</h3>
          <a href="signup">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--primary">
              try now! <i className="material-icons">arrow_forward</i>
            </button>
          </a>
        </div>
        <div className="image-container">
          <img src={lady_search} alt="search professional profiles" />
        </div>
      </div>
    );
  }
}
export default Main;
