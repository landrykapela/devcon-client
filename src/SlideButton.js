import React from 'react';

class SlideButton extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.onClick();
  }
  componentDidMount(){

  }
  render(){

    if(this.props.target === "left"){
      return(<span><i className="material-icons" onClick={this.handleClick}>arrow_backward</i></span>);
    }
    else{
      return(<span><i className="material-icons" onClick={this.handleClick}>arrow_forward</i></span>);
    }
  }

};
export default SlideButton;
