import React from "react";
import bullet from "./assets/bullet.gif";

class CustomList extends React.Component {
  constructor(props) {
    super(props);
    this.cssClass = props.cssClass;
    this.items = props.items;
    this.types = props.types;
    this.state = { deleteClicked: false, itemToDelete: null };
    this.myList = null;
    this.deleteMe = this.deleteMe.bind(this);
    this.generateList = this.generateList.bind(this);
    this.testDelete = this.testDelete.bind(this);
  }
  componentDidMount() {
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
      for (let i = 0; i < this.items.length; i++) {
        if (this.props.editable) {
          let msg =
            "Are you sure you want to delete " + this.items[i].name + "?";
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
              <b>{this.items[i].name}</b>
              <span>{this.items[i].level}</span>
              <span className="actions">
                <i className="material-icons mdl-color-text--primary">delete</i>
              </span>
            </li>
          );
        } else {
          list.push(
            <li key={i}>
              <b>{this.items[i].name}</b>
              <span className="actions">{this.items[i].level}</span>
            </li>
          );
        }
      }
      this.myList = list;
    } else {
      if (this.types === "frameworks") {
        let list = [];
        if (this.props.editable) {
          for (let i = 0; i < this.items.length; i++) {
            list.push(
              <li key={this.items[i].name}>
                <b>{this.items[i].name}</b>
                <span>{this.items[i].level}</span>

                <span className="actions">
                  <i className="material-icons mdl-color-text--primary">
                    delete
                  </i>
                </span>
              </li>
            );
          }
        } else {
          for (let i = 0; i < this.items.length; i++) {
            list.push(
              <li key={this.items[i].name}>
                <b>{this.items[i].name}</b>
                <span className="actions">{this.items[i].level}</span>
              </li>
            );
          }
        }
        this.myList = list;
      } else if (this.types === "work") {
        let list = [];
        if (this.props.editable) {
          for (let i = 0; i < this.items.length; i++) {
            list.push(
              <li key={this.items[i].name}>
                <b>{this.items[i].name}</b>
                <a
                  href={this.items[i].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.items[i].link.length > 30
                    ? this.items[i].link.substring(0, 29)
                    : this.items[i].link}
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
          for (let i = 0; i < this.items.length; i++) {
            list.push(
              <li key={i}>
                <a
                  href={this.items[i].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.items[i].project}
                </a>
              </li>
            );
          }
        }

        this.myList = list;
      } else {
        let list = [];
        if (this.props.editable) {
          if (this.items) {
            this.items.map(item => {
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
          if (this.items) {
            console.log("items: ", this.items);
            this.items.map(item => {
              list.push(
                <li key={this.items.name}>
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
      return <p>No information provided</p>;
    } else {
      return <ul className={this.cssClass}>{this.myList}</ul>;
    }
  }
}

export default CustomList;
