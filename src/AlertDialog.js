import React from 'react';

class AlertDialog extends React.Component{
  constructor(props){
    super(props);

    this.handleButtonOK = this.handleButtonOK.bind(this);
    this.handleButtonYes= this.handleButtonYes.bind(this);
    this.handleButtonCancel = this.handleButtonCancel.bind(this);
  }

  handleButtonOK(){
    console.log("ok clicked...");
  }
  handleButtonYes(){
    console.log("yes clicked...");
    this.props.delete();
  }
  handleButtonCancel(){
    console.log("cancel clicked");
    this.props.unmount();
  }
  render(){
    if(this.props.yesNo){
      return(
        <div id="dialog" className="dialog shadow">
          <div className="title"><h3>{this.props.title}</h3></div>
          <p>{this.props.message}</p>
          <div className="dialog_buttons">
            <button onClick={this.handleButtonYes} id="btn-yes">Yes</button>
            <button onClick={this.handleButtonCancel} id="btn-cancel">No</button>
          </div>
        </div>
      );
    }
    else{
      return(
        <div className="dialog">
          <div className="title"><h3>{this.props.title}</h3></div>
          <p>{this.props.message}</p>
          <div className="dialog_buttons">
            <button onClick={this.handleButtonOK} id="btn-ok">OK</button>
          </div>
        </div>
      );
    }
  }
} export default AlertDialog;
