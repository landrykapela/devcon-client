import React from "react";
import Profile from "./Profile.js";
class Panel extends React.Component {
  constructor(props) {
    super(props);

    // this.handleNextClick = this.handleNextClick.bind(this);
    // this.handlePrevClick = this.handlePrevClick.bind(this);
    this.state = {};
    this.nextProfile = null;
    this.data = [];
  }

  componentDidMount() {
    let path = window.location.href.split("/");
    let id = this.path[this.path.length - 1];
    this.setState({ id: id }, () => {
      fetch("http://localhost:5000/api/v1/developers", {
        method: "get",
        headers: { "content-type": "application/json" }
      })
        .then(res => res.json())
        .then(result => {
          result.developers.map((dev, index) => {
            if (dev.uid === this.state.id) {
              this.setState({ index: index });
            }
          });
          this.setState({ data: result.developers });
        })
        .catch(e => {
          console.log(e);
        });
    });
  }

  render() {
    return (
      <div id="profile">
        <Profile data={this.data} index={this.state.index} />
      </div>
    );
  }
}
export default Panel;
