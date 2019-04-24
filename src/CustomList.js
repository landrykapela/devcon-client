import React from 'react';
import bullet from './assets/bullet.gif';

function CustomList(props){


    const cssClass = props.cssClass;
    const items = props.items;
    const types = props.types;
    let myList= null;

const handleDelete = (pos)=>{
  let b= document.getElementById('delete');
  if(b){
    b.addEventListener('click',()=>{
      deleteMe(pos);
    });
  }
};
    const deleteMe = (pos)=>{

        console.log("Deleting item ..."+pos);

    };

    if(types === "languages"){
      let levels = [];
      let langs= [];
      items.forEach((item)=>{
        levels.push(item.level);
        langs.push(item.lang);
      });
      let list = [];

      if(props.editable){

        for(let i=0; i< levels.length;i++){
          list.push(<div key={i}><img className="bullet" src={bullet} alt="bullet" /><b>{langs[i]}</b>&nbsp;&nbsp;<span className="actions">{levels[i]}</span>&nbsp;&nbsp;&nbsp;<span className="actions"><i id="delete" className="material-icons" onClick={handleDelete(i)}>delete</i></span></div>);
        }
      }
      else{
        for(let i=0; i< levels.length;i++){
          list.push(<div key={i}><img className="bullet" src={bullet} alt="bullet" /><b>{langs[i]}</b>&nbsp;&nbsp;<span className="actions">{levels[i]}</span></div>);
        }
      }
      myList = list;
    }
    else{
      if(types === "frameworks"){
        let levels = [];
        let frameworks= [];
        if(items){
          items.forEach((item)=>{
            levels.push(item.level);
            frameworks.push(item.framework);
          });

        }

        let list = [];
        if(props.editable){
          for(let i=0; i< levels.length;i++){
            list.push(<div key={i}><img className="bullet" src={bullet} alt="bullet" /><b>{frameworks[i]}</b>&nbsp;&nbsp;<span className="actions">{levels[i]}</span>&nbsp;&nbsp;&nbsp;<span className="actions"><i className="material-icons">delete</i></span></div>);
          }
        }
        else{
          for(let i=0; i< levels.length;i++){
          list.push(<div key={i}><img className="bullet" src={bullet} alt="bullet" /><b>{frameworks[i]}</b>&nbsp;&nbsp;<span className="actions">{levels[i]}</span></div>);
          }
      }
        myList = list;
    }
    else if(types === "work"){
      let links = [];
      let titles= [];
      if(items){
        items.forEach((item)=>{
          links.push(item.link);
          titles.push(item.title);
        });
      }


      let list = [];
      if(props.editable){
        for(let i=0; i< links.length;i++){
          list.push(<div key={i}><img className="bullet" src={bullet} alt="bullet" /><a href={links[i]} target="_blank"  rel="noopener noreferrer">{titles[i]}</a>&nbsp;&nbsp;&nbsp;<span className="actions"><i className="material-icons">delete</i></span></div>);
        }
      }
      else{
        for(let i=0; i< links.length;i++){
          list.push(<div key={i}><img className="bullet" src={bullet} alt="bullet" /><a href={links[i]} target="_blank"  rel="noopener noreferrer">{titles[i]}</a></div>);
        }
      }

      myList = list;
    }
    else{
      let list = [];
      if(props.editable){
        if(items){
          items.forEach((item)=>{
            list.push(<div key={items.indexOf(item)}><img className="bullet" src={bullet} alt="bullet" />{item}&nbsp;&nbsp;&nbsp;<span className="actions"><i className="material-icons">delete</i></span></div>);
          });

        }
      }
      else{
        if(items){
          items.forEach((item)=>{
            list.push(<div key={items.indexOf(item)}><img className="bullet" src={bullet} alt="bullet" />{item}</div>);
          });

        }
      }


      myList = list;
    }
  }

  if(myList === null || myList.length < 1){
    return(<p>No information provided</p>);
  }
  else{
    return(
      <ul className={cssClass}>
        {myList}
      </ul>
    );
  }

  }
export default CustomList;
