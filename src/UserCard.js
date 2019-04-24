import React from 'react';


class UserCard extends React.Component {
  constructor(props){
    super(props);
    this.user = this.props.data;
  }
  render(){

    let {backgroundImage} = {backgroundImage:"url(" + this.user.pic + ")"};
    return(
      <div className="user-card">
        <div className="cardHead" style={{backgroundImage}}></div>

        <h3>{this.user.name}</h3>

      <a className="cardTitle" href={"/panel/" + this.user.id} >
        <div>
          <h4>{this.user.title}</h4>
        </div>
      </a>
      </div>
    );
  }
} export default UserCard;
