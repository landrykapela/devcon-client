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

      if (this.props.editable) {
        for (let i = 0; i < this.items.length; i++) {
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
            <div key={i}>
              <img className="bullet" src={bullet} alt="bullet" />
              <b>{this.items[i].name}</b>&nbsp;&nbsp;
              <span className="actions">{this.items[i].level}</span>
              &nbsp;&nbsp;&nbsp;
              <span className="actions">
                <i
                  id="delete"
                  className="material-icons"
                  onClick={() => this.handleDelete(lang2Del)}
                >
                  delete
                </i>
              </span>
            </div>
          );
        }
      } else {
        for (let i = 0; i < this.items.length; i++) {
          list.push(
            <div key={i}>
              <img className="bullet" src={bullet} alt="bullet" />
              <b>{this.items[i].name}</b>&nbsp;&nbsp;
              <span className="actions">{this.items[i].level}</span>
            </div>
          );
        }
      }
      this.myList = list;
    } else {
      if (this.types === "frameworks") {
        let levels = [];
        let frameworks = [];
        if (this.items) {
          this.items.map(item => {
            levels.push(item.level);
            frameworks.push(item.framework);
          });
        }

        let list = [];
        if (this.props.editable) {
          for (let i = 0; i < levels.length; i++) {
            list.push(
              <div key={i}>
                <img className="bullet" src={bullet} alt="bullet" />
                <b>{frameworks[i]}</b>&nbsp;&nbsp;
                <span className="actions">{levels[i]}</span>&nbsp;&nbsp;&nbsp;
                <span className="actions">
                  <i className="material-icons">delete</i>
                </span>
              </div>
            );
          }
        } else {
          for (let i = 0; i < levels.length; i++) {
            list.push(
              <div key={i}>
                <img className="bullet" src={bullet} alt="bullet" />
                <b>{frameworks[i]}</b>&nbsp;&nbsp;
                <span className="actions">{levels[i]}</span>
              </div>
            );
          }
        }
        this.myList = list;
      } else if (this.types === "work") {
        let list = [];
        if (this.props.editable) {
          for (let i = 0; i < this.items.length; i++) {
            list.push(
              <div key={i}>
                <img className="bullet" src={bullet} alt="bullet" />
                <a
                  href={this.items[i].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.items[i].project}
                </a>
                &nbsp;&nbsp;&nbsp;
                <span className="actions">
                  <i className="material-icons">delete</i>
                </span>
              </div>
            );
          }
        } else {
          for (let i = 0; i < this.items.length; i++) {
            list.push(
              <div key={i}>
                <img className="bullet" src={bullet} alt="bullet" />
                <a
                  href={this.items[i].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.items[i].project}
                </a>
              </div>
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
                <div key={this.items.indexOf(item)}>
                  <img className="bullet" src={bullet} alt="bullet" />
                  {item}&nbsp;&nbsp;&nbsp;
                  <span className="actions">
                    <i className="material-icons">delete</i>
                  </span>
                </div>
              );
            });
          }
        } else {
          if (this.items) {
            console.log("items: ", this.items);
            this.items.map(item => {
              list.push(
                <div key={this.items.indexOf(item)}>
                  <img className="bullet" src={bullet} alt="bullet" />
                  {item}
                </div>
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
