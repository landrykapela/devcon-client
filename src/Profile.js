import React from 'react';
import CustomList from './CustomList.js';
import SlideButton from './SlideButton.js';

class Profile extends React.Component{
  constructor(props){
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.loadPrev = this.loadPrev.bind(this);
    this.loadNext = this.loadNext.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.switchToMobile = this.switchToMobile.bind(this);
    this.state = {details:this.props.data[this.props.index],leftClick:false,rightClick:false,isMobile:false,windowSize:window.innerWidth};
  }
  handleResize(){
    this.setState(()=>({windowSize:window.innerWidth}));
    this.switchToMobile();
  }

  //handles next click button
  handleNext(){

    this.setState((ps)=>{return {rightClick:true}});
    this.loadNext();
  }

  //handles previous click button
  handlePrev(){

    this.setState((ps)=>{return {leftClick:true}});
    this.loadPrev();
  }
  //loads the next profile
  loadNext(){

    let index = (this.props.index < this.props.data.length -1) ? (this.props.index + 1) : 0;
    window.location.href="/panel/"+(this.props.data[index].personal.id);
  };

  //loads the previous profile
  loadPrev(){
    
    let index = (this.props.index >= 1) ? (this.props.index - 1) : this.props.data.length-1;
    window.location.href="/panel/"+(this.props.data[index].personal.id);
  };
switchToMobile(){
  if(this.state.windowSize < 992){
    this.setState(()=>({isMobile:true}));
  }
  else{
      this.setState(()=>({isMobile:false}));
  }
}
componentDidMount(){

  if(this.state.rightClick){
    this.loadNext();
    this.setState((p)=>({rightClick:!p.rightClick}));
  }
  if(this.state.leftClick){
    this.loadPrev();
    this.setState((p)=>({leftClick:!p.leftClick}));
  }
  window.addEventListener('resize',this.handleResize);
  this.switchToMobile();
}
componentWillUnmount(){
    window.removeEventListener('resize',this.handleResize);
}
  render(){
    let date = new Date(Number(this.state.details.professional.active)).getFullYear();

    let today = new Date().getFullYear();
    let experience = today - date;

    if(this.state.isMobile){
      return(
        <div className="profile">
          <div className="personal-details">
          <div className="slideButton">
            <SlideButton target="left" profileId={this.state.details.personal.id} onClick={this.handlePrev}/>
          </div>
          <div className="slideButton">
            <SlideButton target="right" profileId={this.state.details.personal.id} onClick={this.handleNext}/>
          </div>
          </div>

        <div className="personal-details">

          <div className="info center">
            <img className="profilePic border-white--2t" src={this.state.details.personal.pic} alt={this.state.details.personal.name}/>
            <h2>{this.state.details.personal.name}</h2>
            <h3>{this.state.details.personal.title}</h3>
            <h3>{experience} years of experience</h3>
          </div>
          <div className="info left">
            <h2>Contacts</h2>
            <p><i className="material-icons">email</i>&nbsp;&nbsp;{this.state.details.personal.email}</p>
            <p><i className="material-icons">phone</i>&nbsp;&nbsp;{this.state.details.personal.phone}</p>
            <p><i className="material-icons">public</i>&nbsp;&nbsp;<a href={this.state.details.personal.web} target="_blank" rel="noopener noreferrer">{(this.state.details.personal.web.length > 25) ? this.state.details.personal.web.substr(0,24)+"..." : this.state.details.personal.web}</a></p>
          </div>

        </div>
        <div className="professional-details">
          <div className="pro-info card border-primary">
            <div className="card-title">
              <h3>Skills</h3>
            </div>
            <CustomList cssClass="card-list" items={this.state.details.professional.skills} types="skills"/>
          </div>
          <div className="pro-info card border-primary">
            <div className="card-title">
              <h3>Languages</h3>
            </div>
            <CustomList cssClass="card-list" items={this.state.details.professional.languages} types="languages"/>
          </div>
          <div className="pro-info card border-primary">
            <div className="card-title">
              <h3>Frameworks/Libraries</h3>
            </div>
            <CustomList cssClass="card-list" items={this.state.details.professional.frameworks} types="frameworks"/>
          </div>
          <div className="pro-info card border-primary">
            <div className="card-title">
              <h3>Accomplished Work</h3>
            </div>
            <CustomList cssClass="card-list" items={this.state.details.professional.work} types="work"/>
          </div>
        </div>
        </div>
      );

    }
    else{
      return(
        <div className="profile">

          <div className="personal-details">
            <div className="slideButton">
              <SlideButton target="left" profileId={this.state.details.personal.id} onClick={this.handlePrev}/>
            </div>
            <div className="info center">
              <img className="profilePic border-white--2t" src={this.state.details.personal.pic} alt={this.state.details.personal.name}/>
              <h2>{this.state.details.personal.name}</h2>
              <h3>{this.state.details.personal.title}</h3>
              <h3>{experience} years of experience</h3>
            </div>
            <div className="info left">
              <h2>Contacts</h2>
              <p><i className="material-icons">email</i>&nbsp;&nbsp;{this.state.details.personal.email}</p>
              <p><i className="material-icons">phone</i>&nbsp;&nbsp;{this.state.details.personal.phone}</p>
              <p><i className="material-icons">public</i>&nbsp;&nbsp;<a href={this.state.details.personal.web} target="_blank" rel="noopener noreferrer">{(this.state.details.personal.web.length > 25) ? this.state.details.personal.web.substr(0,24)+"..." : this.state.details.personal.web}</a></p>
            </div>
            <div className="slideButton">
              <SlideButton target="right" profileId={this.state.details.personal.id} onClick={this.handleNext}/>
            </div>
          </div>
          <div className="professional-details">
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Skills</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.details.professional.skills} types="skills"/>
            </div>
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Languages</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.details.professional.languages} types="languages"/>
            </div>
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Frameworks/Libraries</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.details.professional.frameworks} types="frameworks"/>
            </div>
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Accomplished Work</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.details.professional.work} types="work"/>
            </div>
          </div>
        </div>
      )
    }

  }
} export default Profile;
