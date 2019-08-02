import React from "react";

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.data;
  }
  render() {
    let { backgroundImage } = { backgroundImage: "url(" + this.user.pic + ")" };
    return (
      <div className="user-card mdl-color--white">
        <div className="cardHead" style={{ backgroundImage }} />

        <h5>{this.user.name}</h5>

        <a
          className="cardTitle mdl-color--primary mdl-color-text--white"
          href={"/panel/" + this.user.uid}
        >
          <div>
            <h6>{this.user.profession}</h6>
          </div>
        </a>
      </div>
    );
  }
}
export default UserCard;
