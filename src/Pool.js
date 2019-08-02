import React from "react";
import UserCard from "./UserCard.js";
import SearchBox from "./SearchBox.js";

class Pool extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], filteredUsers: [] };

    this.filterData = this.filterData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/v1/developers", {
      method: "get",
      headers: { "content-type": "application/json" }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ users: result.developers }, () => {
          this.setState({ filteredUsers: this.state.users });
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  handleChange(event) {
    event.persist();
    this.filterData(event.target.value);
  }

  filterData(value) {
    let updatedList = this.state.users;
    updatedList = updatedList.filter(item => {
      return (
        item.name.toLowerCase().search(value.toLowerCase()) !== -1 ||
        item.profession.toLowerCase().search(value.toLowerCase()) !== -1
      );
    });
    this.setState(ps => {
      return { filteredUsers: updatedList };
    });
  }

  render() {
    let usersList = [];
    this.state.filteredUsers.forEach(user => {
      usersList.push(<UserCard data={user} key={user.uid} />);
    });

    if (usersList.length < 1) {
      return (
        <div>
          <SearchBox onChange={this.handleChange} />
          <p className="no-info">No records found</p>
        </div>
      );
    } else {
      return (
        <div>
          <SearchBox onChange={this.handleChange} />
          <div className="pool">{usersList}</div>
        </div>
      );
    }
  }
}
export default Pool;
