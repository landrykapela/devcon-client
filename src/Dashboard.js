import React from 'react';
import CustomList from './CustomList2.js';
import AlertDialog from './AlertDialog.js';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.handleSaveTitle = this.handleSaveTitle.bind(this);
    this.handleSaveName = this.handleSaveName.bind(this);
    this.handleSaveEmail = this.handleSaveEmail.bind(this);
    this.handleSaveWeb = this.handleSaveWeb.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateSource = this.updateSource.bind(this);
    this.showImageButton = this.showImageButton.bind(this);
    this.hideImageButton = this.hideImageButton.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.delete = this.delete.bind(this);
    this.source= {personal:{id:5,title:"Software Developer",pic:"https://pbs.twimg.com/profile_images/1081846316450439168/qEsbDKoN_400x400.jpg",name:"Landry Kapela",email:"landrykapela@gmail.com",phone:"+255784086726",web:"https://landrykapela.github.io/portfolio"},
    professional:{
      active:"1394496000000",
      languages:[{lang:"JavaScript",level:"Proficient"},{lang:"Java - Android",level:"Expert"},{lang:"NodeJS",level:"Expert"},{lang:"PHP",level:"Expert"},{lang:"Python",level:"Beginner"}],
      skills:["Graphics Design","Agile Development","Team Work","Automous"],
      frameworks:[{framework:"ExpressJS",level:"Proficient"},{framework:"Bootstrap",level:"Expect"},{framework:"ReactJS",level:"Expert"},{framework:"AngularJS",level:"Beginner"},{framework:"Laravel",level:"Proficient"}],
      work:[{title:"Kakobrands",link:"https://kakobrands.com"},{title:"ITM Training Registration",link:"https://registration.itmafrica.co.tz"},{title:"Jamirex Hotel",link:"https://jamirexhotel.co.tz"},{title:"ABC Dental Clinic",link:"https://abcdentalclinic.co.tz"}]
    }
  }
  this.state = {data:this.source,dataChanged:false,dialog:null};
}
delete(){
  if(this.state.dialog !== null){
    console.log("starting to delete...");
    let dialog = this.state.dialog;
    if(dialog.group === "languages"){
    //  let lang = this.source.professional.languages.splice(dialog.id);
      this.source.professional.languages[dialog.id] = "deleted language";

        console.log("delete: "+this.state.dataChanged);
      this.setState({data:this.source,dataChanged:true},()=>{
        console.log("Successfully "+this.state.dataChanged+" deleted "+this.state.data.professional.languages[dialog.id]);
        if(this.state.dataChanged){
          this.setState({dataChanged:false,dialog:null},()=>{
            console.log("dataChanged: "+this.state.dataChanged);

          });

        }
      });

    }
  //  this.source[dialog.category][dialog.group][dialog.id]
  }
  this.hideDialog();
}
showDialog(x){
  console.log("attempting to delete..."+x);
  if(x !== null){
    this.setState({dialog:x},()=>{
      console.log("dialog title: "+this.state.dialog.title);
    });
  }
}
hideDialog(){
  this.setState({dialog:null},()=>{
    console.log("Successfully unmounted dialog");
  });
}
showImageButton(){
  let buttonArea = document.getElementsByClassName('imageUploadIcon')[0];

    buttonArea.classList.remove('hidden');


}
hideImageButton(){
  let buttonArea = document.getElementsByClassName('imageUploadIcon')[0];
  setTimeout(()=>{
      buttonArea.classList.add('hidden');
  },3000);


}
updateSource(source){
  this.setState({data:source,dataChanged:true},()=>{
    console.log("update source callback: "+this.state.dataChanged);
  });

}


//handle save click events
handleSaveField(fieldName){

  let field = document.getElementById(fieldName);
  this.source.personal[fieldName] = (field.value === '' || field.value ===' ') ? this.source.personal[fieldName] : field.value;
  this.updateSource(this.source);
  if(this.state.dataChanged){
    this.setState((prev)=>({dataChanged:false}));
  }

  let target = document.getElementById('edit_'+fieldName);
  let targetDiv = document.getElementById(fieldName+"FormControl");
  field.value=null;
  targetDiv.classList.add('hidden');
  target.textContent = "edit";
}
// //handl save click event for title
handleSaveName(event){
event.preventDefault();
 //let name = document.getElementById('name');
  let name = document.getElementById('name');

  this.source.personal.name = (name.value === '' || name.value ===' ') ? this.source.personal.name : name.value;
  this.updateSource(this.source);
  if(this.state.dataChanged){
    this.setState((prev)=>({dataChanged:false}));
  }

  let target = document.getElementById('editName');
  let targetDiv = document.getElementById("nameFormControl");
  name.value=null;
  targetDiv.classList.add('hidden');
  target.textContent = "edit";
}


// //handl save click event for title
handleSaveTitle(event){
event.preventDefault();
 //let name = document.getElementById('name');
  let title = document.getElementById('title');

  this.source.personal.title = (title.value === '' || title.value ===' ') ? this.source.personal.title : title.value;
  this.updateSource(this.source);
  if(this.state.dataChanged){
    this.setState((prev)=>({dataChanged:false}));
  }

  let target = document.getElementById('editTitle');
  let targetDiv = document.getElementById("titleFormControl");
  title.value=null;
  targetDiv.classList.add('hidden');
  target.textContent = "edit";
}

// //handl save click event for title
handleSaveEmail(event){
event.preventDefault();
 //let name = document.getElementById('name');
  let email = document.getElementById('email');

  this.source.personal.email = (email.value === '' || email.value ===' ') ? this.source.personal.email : email.value;
  this.updateSource(this.source);
  if(this.state.dataChanged){
    this.setState((prev)=>({dataChanged:false}));
  }

  let target = document.getElementById('editEmail');
  let targetDiv = document.getElementById("emailFormControl");
  email.value=null;
  targetDiv.classList.add('hidden');
  target.textContent = "edit";
}

// //handl save click event for title
handleSaveWeb(event){
event.preventDefault();
 //let name = document.getElementById('name');
  let web = document.getElementById('web');

  this.source.personal.web = (web.value === '' || web.value ===' ') ? this.source.personal.web : web.value;
  this.updateSource(this.source);
  if(this.state.dataChanged){
    this.setState((prev)=>({dataChanged:false}));
  }

  let target = document.getElementById('editWeb');
  let targetDiv = document.getElementById("webFormControl");
  web.value=null;
  targetDiv.classList.add('hidden');
  target.textContent = "edit";
}

componentWillMount(){
  this.setState((prev)=>({data:this.source}));

}

componentDidMount(){
  this.setState((prev)=>{
    return {data:this.source};

  });
}
// componentWillReceiveProps(){
//   this.setState(()=>({data:this.source}));
// }
//function to handle edit click buttons
handleEditClick(event){
  event.preventDefault();
  let target = event.target;
  let id = target.id.split("edit")[1].toLowerCase();
  console.log("clicked: "+id);

  let targetDiv = null;
  switch(id){
    case 'name':
      targetDiv = document.getElementById("nameFormControl");
      break;
    case 'email':
      targetDiv = document.getElementById("emailFormControl");
      break;
    case 'title':
      targetDiv = document.getElementById("titleFormControl");
      break;
    case 'web':
      targetDiv = document.getElementById("webFormControl");
      break;
    default:
      targetDiv = document.getElementById("nameFormControl");
  }

  if(targetDiv === null){
    console.log("No target div...");
  }
  if(targetDiv.classList.contains('hidden')){
    targetDiv.classList.remove('hidden');
    target.textContent = "close";
  }
  else{
    targetDiv.classList.add('hidden');
    target.textContent = "edit";
  }
}
handleClick(){
  console.log("clicked image: "+this.state.data.personal.pic);
  const imageUpload = document.getElementById('profileImageUpload');
  const uploadedImage = document.getElementById('profileImage');
  imageUpload.click();
  imageUpload.onchange = ()=>{

    let file = imageUpload.files[0];
    let imageUrl = (file) ? URL.createObjectURL(file) : uploadedImage.src;
    uploadedImage.onload = ()=>{URL.revokeObjectURL(imageUrl)};
    uploadedImage.src=imageUrl;
  }
}
  render(){
    if(this.state.dialog === null){
      return(
        <div className="dashboard">
          <div className="personal-details">
            <div className="info">
              <h1>User Profile</h1>
              <input type="file" className="hidden" id="profileImageUpload" accept="image/*" />
              <img id="profileImage" className="profileImage" src={this.state.data.personal.pic} alt={this.state.data.personal.name} onMouseOver={this.showImageButton} onMouseOut={this.hideImageButton}/>
              <div className="imageUploadIcon hidden">
                <i className="material-icons" onClick={this.handleClick} >camera_alt</i>
              </div>
            </div>
            <div className="info right">
              <p>{this.state.data.personal.name} &nbsp;&nbsp;&nbsp;&nbsp;<i id="editName" className="material-icons" onClick={this.handleEditClick}>edit</i></p>
              <div className="editFormControl hidden" id="nameFormControl">
                <input type="text" id="name" placeholder={this.state.data.personal.name}/><button className="fieldButton" id="btnName" onClick={this.handleSaveName}><i className="material-icons">check</i></button>
              </div>
              <p>{this.state.data.personal.title} &nbsp;&nbsp;&nbsp;&nbsp;<i id="editTitle"  className="material-icons" onClick={this.handleEditClick}>edit</i></p>
              <div id="titleFormControl" className="editFormControl hidden">
                <input type="text" id="title" placeholder={this.state.data.personal.title}/><button className="fieldButton"  id="btnTitle" onClick={this.handleSaveTitle}><i className="material-icons">check</i></button>
              </div>
              <p>{this.state.data.personal.email} &nbsp;&nbsp;&nbsp;&nbsp;<i id="editEmail"  className="material-icons" onClick={this.handleEditClick}>edit</i></p>
              <div id="emailFormControl" className="editFormControl hidden">
                <input type="email" id="email" placeholder={this.state.data.personal.email}/><button className="fieldButton"  id="btnEmail" onClick={this.handleSaveEmail}><i className="material-icons">check</i></button>
              </div>
              <p>{this.state.data.personal.web} &nbsp;&nbsp;&nbsp;&nbsp;<i id="editWeb"  className="material-icons" onClick={this.handleEditClick}>edit</i></p>
              <div id="webFormControl" className="editFormControl hidden">
                <input type="text" id="web" placeholder={this.state.data.personal.web}/><button className="fieldButton"  id="btnWeb" onClick={this.handleSaveWeb}><i className="material-icons">check</i></button>
              </div>
            </div>

          </div>
          <div className="professional-details">
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Skills</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.data.professional.skills} types="skills" editable={true}/>
            </div>
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Languages</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.data.professional.languages} types="languages" editable={true} onClick={this.showDialog}/>
            </div>
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Frameworks/Libraries</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.data.professional.frameworks} types="frameworks" editable={true}/>
            </div>
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Accomplished Work</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.data.professional.work} types="work" editable={true}/>
            </div>
          </div>
        </div>
      )
    }
    else{
      return(
        <div className="dashboard">
          <div className="personal-details">
            <div className="info">
              <h1>User Profile</h1>
              <input type="file" className="hidden" id="profileImageUpload" accept="image/*" />
              <img id="profileImage" className="profileImage" src={this.state.data.personal.pic} alt={this.state.data.personal.name} onMouseOver={this.showImageButton} onMouseOut={this.hideImageButton}/>
              <div className="imageUploadIcon hidden">
                <i className="material-icons" onClick={this.handleClick} >camera_alt</i>
              </div>
            </div>
            <div className="info right">
              <p>{this.state.data.personal.name} &nbsp;&nbsp;&nbsp;&nbsp;<i id="editName" className="material-icons" onClick={this.handleEditClick}>edit</i></p>
              <div className="editFormControl hidden" id="nameFormControl">
                <input type="text" id="name" placeholder={this.state.data.personal.name}/><button className="fieldButton" id="btnName" onClick={this.handleSaveName}><i className="material-icons">check</i></button>
              </div>
              <p>{this.state.data.personal.title} &nbsp;&nbsp;&nbsp;&nbsp;<i id="editTitle"  className="material-icons" onClick={this.handleEditClick}>edit</i></p>
              <div id="titleFormControl" className="editFormControl hidden">
                <input type="text" id="title" placeholder={this.state.data.personal.title}/><button className="fieldButton"  id="btnTitle" onClick={this.handleSaveTitle}><i className="material-icons">check</i></button>
              </div>
              <p>{this.state.data.personal.email} &nbsp;&nbsp;&nbsp;&nbsp;<i id="editEmail"  className="material-icons" onClick={this.handleEditClick}>edit</i></p>
              <div id="emailFormControl" className="editFormControl hidden">
                <input type="email" id="email" placeholder={this.state.data.personal.email}/><button className="fieldButton"  id="btnEmail" onClick={this.handleSaveEmail}><i className="material-icons">check</i></button>
              </div>
              <p>{this.state.data.personal.web} &nbsp;&nbsp;&nbsp;&nbsp;<i id="editWeb"  className="material-icons" onClick={this.handleEditClick}>edit</i></p>
              <div id="webFormControl" className="editFormControl hidden">
                <input type="text" id="web" placeholder={this.state.data.personal.web}/><button className="fieldButton"  id="btnWeb" onClick={this.handleSaveWeb}><i className="material-icons">check</i></button>
              </div>
            </div>

          </div>
          <div className="professional-details">
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Skills</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.data.professional.skills} types="skills" editable={false}/>
            </div>
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Languages</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.data.professional.languages} types="languages" editable={false} onClick={this.showDialog}/>
            </div>
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Frameworks/Libraries</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.data.professional.frameworks} types="frameworks" editable={false}/>
            </div>
            <div className="pro-info card border-primary">
              <div className="card-title">
                <h3>Accomplished Work</h3>
              </div>
              <CustomList cssClass="card-list" items={this.state.data.professional.work} types="work" editable={true}/>
            </div>
          </div>

            <AlertDialog yesNo={true} title={this.state.dialog.title} message={this.state.dialog.message}  unmount={this.hideDialog} delete={this.delete}/>
        </div>
      )
    }

  }
} export default Dashboard;
