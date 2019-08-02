import React from "react";
import bullet from "./assets/bullet.gif";

class CustomList extends React.Component {
  constructor(props) {
    super(props);

    this.types = props.types;
    this.state = {
      dataChanged: props.updated,
      items: props.items,
      deleteClicked: false,
      itemToDelete: null
    };
    this.myList = null;
    this.deleteMe = this.deleteMe.bind(this);
    this.generateList = this.generateList.bind(this);
    this.testDelete = this.testDelete.bind(this);
  }
  shouldComponentUpdate(props) {
    return this.state.dataChanged;
  }
  componentDidMount() {
    if (this.state.dataChanged) this.generateList();
  }
  componentWillMount() {
    this.generateList();
  }
  handleDelete(item) {
    this.setDeleteState(item);
    this.props.onClick(item);
  }
  setDeleteState(item) {
    console.log(this.state.deleteClicked);
    this.setState({ deleteClicked: true, itemToDelete: item }, () => {
      this.deleteMe();
    });
  }
  testDelete() {
    console.log("test..." + this.state.deleteClicked);
  }
  unsetDeleteState() {
    console.log("unsetting del state...prev: ");
    console.log(this.state.deleteClicked);
    this.setState({ deleteClicked: false }, () => {
      console.log("completed unsetting del state...new: ");
      console.log(this.state.deleteClicked);
    });
  }
  deleteMe() {
    console.log("complete setting del state...new: ");
    console.log(this.state.deleteClicked);
    if (this.state.deleteClicked) {
      console.log("Deleting item ..." + this.state.itemToDelete);
      this.unsetDeleteState();
    } else {
      console.log("NO item to delete");
    }
  }

  generateList() {
    console.log("generating list..." + this.state.deleteClicked);
    if (this.types === "languages") {
      let list = [];
      for (let i = 0; i < this.state.items.length; i++) {
        if (this.props.editable) {
          let msg =
            "Are you sure you want to delete " + this.state.items[i].name + "?";
          let t = "Confirm Delete";
          let lang2Del = {
            category: "professional",
            group: "languages",
            id: i,
            title: t,
            message: msg
          };
          list.push(
            <li key={i}>
              <b>{this.state.items[i].name}</b>
              <span>{this.state.items[i].level}</span>
              <span className="actions">
                <i className="material-icons mdl-color-text--primary">delete</i>
              </span>
            </li>
          );
        } else {
          list.push(
            <li key={i}>
              <b>{this.state.items[i].name}</b>
              <span className="actions">{this.state.items[i].level}</span>
            </li>
          );
        }
      }
      this.myList = list;
    } else {
      if (this.types === "frameworks") {
        let list = [];
        if (this.props.editable) {
          for (let i = 0; i < this.state.items.length; i++) {
            list.push(
              <li key={this.state.items[i].name}>
                <b>{this.state.items[i].name}</b>
                <span>{this.state.items[i].level}</span>

                <span className="actions">
                  <i className="material-icons mdl-color-text--primary">
                    delete
                  </i>
                </span>
              </li>
            );
          }
        } else {
          for (let i = 0; i < this.state.items.length; i++) {
            list.push(
              <li key={this.state.items[i].name}>
                <b>{this.state.items[i].name}</b>
                <span className="actions">{this.state.items[i].level}</span>
              </li>
            );
          }
        }
        this.myList = list;
      } else if (this.types === "work") {
        let list = [];
        if (this.props.editable) {
          for (let i = 0; i < this.state.items.length; i++) {
            list.push(
              <li key={this.state.items[i].name}>
                <b>{this.state.items[i].name}</b>
                <a
                  href={this.state.items[i].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.items[i].link.length > 50
                    ? this.state.items[i].link.substring(0, 49)
                    : this.state.items[i].link}
                </a>

                <span className="actions">
                  <i className="material-icons mdl-color-text--primary">
                    delete
                  </i>
                </span>
              </li>
            );
          }
        } else {
          for (let i = 0; i < this.state.items.length; i++) {
            list.push(
              <li key={i}>
                <a
                  href={this.state.items[i].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.items[i].project}
                </a>
              </li>
            );
          }
        }

        this.myList = list;
      } else {
        let list = [];
        if (this.props.editable) {
          if (this.state.items) {
            this.state.items.map(item => {
              list.push(
                <li key={item.name}>
                  <b>{item.name}</b>
                  <span>{item.level}</span>
                  <span className="actions">
                    <i className="material-icons mdl-color-text--primary">
                      delete
                    </i>
                  </span>
                </li>
              );
            });
          }
        } else {
          if (this.state.items) {
            console.log("items: ", this.state.items);
            this.state.items.map(item => {
              list.push(
                <li key={this.state.items.name}>
                  {item.name}&nbsp;&nbsp;&nbsp;<span>{item.level}</span>
                </li>
              );
            });
          }
        }

        this.myList = list;
      }
    }
  }
  render() {
    if (this.myList === null || this.myList.length < 1) {
      return (
        <ul className="card-list">
          <li>No information provided</li>
        </ul>
      );
    } else {
      return <ul className="card-list">{this.myList}</ul>;
    }
  }
}

export default CustomList;
