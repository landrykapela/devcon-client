import React from 'react';
import Profile from './Profile.js';
class Panel extends React.Component {
  constructor(props){
    super(props);
    
    // this.handleNextClick = this.handleNextClick.bind(this);
    // this.handlePrevClick = this.handlePrevClick.bind(this);
    this.state = {};
    this.nextProfile = null;
    this.data = [{
      personal:{id:5,title:"Software Developer",pic:"https://pbs.twimg.com/profile_images/1081846316450439168/qEsbDKoN_400x400.jpg",name:"Landry Kapela",email:"landrykapela@gmail.com",phone:"+255784086726",web:"https://landrykapela.github.io/portfolio"},
      professional:{
        active:"1394496000000",
        languages:[{lang:"JavaScript",level:"Proficient"},{lang:"Java - Android",level:"Expert"},{lang:"NodeJS",level:"Expert"},{lang:"PHP",level:"Expert"},{lang:"Python",level:"Beginner"}],
        skills:["Graphics Design","Agile Development","Team Work","Automous"],
        frameworks:[{framework:"ExpressJS",level:"Proficient"},{framework:"Bootstrap",level:"Expect"},{framework:"ReactJS",level:"Expert"},{framework:"AngularJS",level:"Beginner"},{framework:"Laravel",level:"Proficient"}],
        work:[{title:"Kakobrands",link:"https://kakobrands.com"},{title:"ITM Training Registration",link:"https://registration.itmafrica.co.tz"},{title:"Jamirex Hotel",link:"https://jamirexhotel.co.tz"},{title:"ABC Dental Clinic",link:"https://abcdentalclinic.co.tz"}]
      }
    },
    {
      personal:{id:6,title:"Web Developer",pic:"https://i.kinja-img.com/gawker-media/image/upload/s--vSY-o42Q--/c_scale,f_auto,fl_progressive,q_80,w_800/ecq5rsk3n1nolujedskk.jpg",name:"Avatar Matata",email:"avatar@gmail.com",phone:"+255784086726",web:"https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"},
      professional:{
        active:"1471775400000",
        languages:[{lang:"JavaScript",level:"Expert"},{lang:"NodeJS",level:"Expert"},{lang:"PHP",level:"Proficient"}],
        skills:["UI Design","Agile Development","Team Work"],
        frameworks:[{framework:"ExpressJS",level:"Expert"},{framework:"Bootstrap",level:"Expect"},{framework:"ReactJS",level:"Expert"},{framework:"Material Design Lite",level:"Proficient"}],
        work:[{title:"Kakobrands",link:"https://kakobrands.com"},{title:"ITM Training Registration",link:"https://registration.itmafrica.co.tz"},{title:"Jamirex Hotel",link:"https://jamirexhotel.co.tz"},{title:"ABC Dental Clinic",link:"https://abcdentalclinic.co.tz"}]
      }
    },
    {
      personal:{id:7,title:"Software Engineer",pic:"https://www.gravatar.com/avatar/8283f4bb35589863b3b1e0f8ac0968a0?s=328&d=identicon&r=PG",name:"Michelle Tilley",email:"avatar@gmail.com",phone:"+255784086726",web:"https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"},
      professional:{
        active:"1471775400000",
        languages:[{lang:"JavaScript",level:"Expert"},{lang:"NodeJS",level:"Expert"},{lang:"PHP",level:"Proficient"},{lang:"Ruby",level:"Expert"}],
        skills:["UI Design","Agile Development","Team Work"],
        frameworks:[{framework:"ExpressJS",level:"Expert"},{framework:"Bootstrap",level:"Expect"},{framework:"ReactJS",level:"Expert"},{framework:"Material Design Lite",level:"Proficient"}],
        work:[{title:"Kakobrands",link:"https://kakobrands.com"},{title:"ITM Training Registration",link:"https://registration.itmafrica.co.tz"},{title:"Jamirex Hotel",link:"https://jamirexhotel.co.tz"},{title:"ABC Dental Clinic",link:"https://abcdentalclinic.co.tz"}]
      }
    },
    {
      personal:{id:8,title:".NET Developer",pic:"https://www.gravatar.com/avatar/3e2a6a4bb5a88ce2b4805c4a3ca2e4ce?s=328&d=identicon&r=PG",name:"Stack Guy",email:"avatar@gmail.com",phone:"+255784086726",web:"https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"},
      professional:{
        active:"1471775400000",
        languages:[{lang:"C#",level:"Expert"},{lang:"Visual Basic",level:"Expert"},{lang:"SQL",level:"Proficient"}],
        skills:["Unit Testing","Agile Development","Team Work","Automous"],
        frameworks:[{framework:"ExpressJS",level:"Expert"},{framework:"Bootstrap",level:"Expect"},{framework:"ReactJS",level:"Expert"},{framework:"Material Design Lite",level:"Proficient"}],
        work:[{title:"Kakobrands",link:"https://kakobrands.com"},{title:"ITM Training Registration",link:"https://registration.itmafrica.co.tz"},{title:"Jamirex Hotel",link:"https://jamirexhotel.co.tz"},{title:"ABC Dental Clinic",link:"https://abcdentalclinic.co.tz"}]
      }
    },
    {
      personal:{id:10,title:"iOS Developer",pic:"https://bcassetcdn.com/asset/logo/33e50f33-1151-4b9b-bcfc-4477283efda5/logo?v=4&text=Logo+Text+Here",name:"Mac OS",email:"avatar@gmail.com",phone:"+255784086726",web:"https://www.google.com/search?q=avatar&rlz=1C5CHFA_enTZ789TZ789&source=lnms&sa=X&ved=0ahUKEwiP7M6u98_hAhUHzYUKHePWADUQ_AUICSgA&biw=2560&bih=1361&dpr=1"},
      professional:{
        active:"1471775400000",
        languages:[{lang:"JavaScript",level:"Expert"},{lang:"NodeJS",level:"Proficient"},{lang:"Switft",level:"Expert"}],
        skills:["UI Design","Agile Development","Team Work"],
        frameworks:[{framework:"ExpressJS",level:"Expert"},{framework:"Bootstrap",level:"Expect"},{framework:"ReactJS",level:"Expert"},{framework:"Material Design Lite",level:"Proficient"}],
        work:[{title:"Kakobrands",link:"https://kakobrands.com"},{title:"ITM Training Registration",link:"https://registration.itmafrica.co.tz"},{title:"Jamirex Hotel",link:"https://jamirexhotel.co.tz"},{title:"ABC Dental Clinic",link:"https://abcdentalclinic.co.tz"}]
      }
    }];


    this.detail = this.data[this.props.index];
    console.log("detail: "+this.detail.personal.name);
    this.path = window.location.href.split("/");
    this.id = this.path[this.path.length - 1];
    this.state = {id:this.id,index:this.props.index};

    this.data.forEach((item)=>{

      if(Number(this.state.id) === Number(item.personal.id)){
        this.state = {index:this.data.indexOf(item),id:this.state.id};

        this.detail = this.data[this.state.index];
      }

    });

    console.log("detail: "+this.detail.personal.name);
  }


  render(){
    return(
      <div id="profile">
        <Profile data={this.data} index={this.state.index}/>
      </div>
    )
  }
} export default Panel;
