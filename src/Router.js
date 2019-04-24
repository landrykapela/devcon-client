import React from 'react';
import {BrowserRouter as Router, Route, NavLink,Switch } from 'react-router-dom';
import FormSignup from './FormSignup.js';
import FormLogin from './LoginForm.js';
import Main from './Main.js';
import Panel from './Panel.js';
import Pool from './Pool.js';
import Dashboard from './Dashboard.js';

class CustomRouter extends React.Component{
  constructor(props){
    super(props);
    this.showSignup = this.showSignup.bind(this);
    this.hideSignup = this.hideSignup.bind(this);
    this.loginText = "Login";
    this.index = 0;
    this.users = [
      {id:5,title:"Software Developer",pic:"https://pbs.twimg.com/profile_images/1081846316450439168/qEsbDKoN_400x400.jpg",name:"Landry Kapela",email:"landrykapela@gmail.com",phone:"+255784086726",web:"https://landrykapela.github.io/portfolio"},

      {id:6,title:"Web Developer",pic:"https://i.kinja-img.com/gawker-media/image/upload/s--vSY-o42Q--/c_scale,f_auto,fl_progressive,q_80,w_800/ecq5rsk3n1nolujedskk.jpg",name:"Avatar Matata",email:"avatar@gmail.com",phone:"+255784086726",web:"https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"},

      {id:7,title:"Software Engineer",pic:"https://www.gravatar.com/avatar/8283f4bb35589863b3b1e0f8ac0968a0?s=328&d=identicon&r=PG",name:"Michelle Tilley",email:"avatar@gmail.com",phone:"+255784086726",web:"https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"},

      {id:8,title:".NET Developer",pic:"https://www.gravatar.com/avatar/3e2a6a4bb5a88ce2b4805c4a3ca2e4ce?s=328&d=identicon&r=PG",name:"Stack Guy",email:"avatar@gmail.com",phone:"+255784086726",web:"https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"},

      {id:10,title:"iOS Developer",pic:"https://bcassetcdn.com/asset/logo/33e50f33-1151-4b9b-bcfc-4477283efda5/logo?v=4&text=Logo+Text+Here",name:"Mac OS",email:"avatar@gmail.com",phone:"+255784086726",web:"https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"},
      ];
  }
  hideSignup(){
      const signup = document.getElementById('signup');
      if(signup.classList.contains('visible')) signup.classList.remove('visible');
      signup.classList.add('hidden');
  }
  showSignup(){
    const signup = document.getElementById('signup');
    signup.classList.remove('hidden');
  }
  componentWillReceiveProps(){
    console.log("props.login: "+this.props.login);
    if(this.props.login){
      this.loginText = "Logout";
      this.hideSignup();
    }
    else{
      this.showSignup();
    }
  }
  render(){
    return(
      <Router>
        <div>
        <ul className="nav-menu">
          <li className="nav-menu-item"><NavLink exact to='/'>Home</NavLink></li>
          <li className="nav-menu-item"><NavLink to='/panel'>Panel</NavLink></li>
          <li className="nav-menu-item"><NavLink exact to='/pool'>Pool</NavLink></li>
          <li className="nav-menu-item"><NavLink exact to='/dashboard'>Dashboard</NavLink></li>
          <li className="nav-menu-item" id="signup"><NavLink exact to='/signup'>Signup</NavLink></li>
          <li className="nav-menu-item"><NavLink exact to='/login'>{this.loginText}</NavLink></li>
        </ul>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/signup" component={FormSignup} />
          <Route path="/login" component={FormLogin} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/pool" render={(props)=><Pool {...props} users={this.users} />} />
          <Route path="/panel" render={(props)=><Panel {...props} index={this.index} />} />
        </Switch>
        </div>
      </Router>
    )
  }

}
export default CustomRouter;
