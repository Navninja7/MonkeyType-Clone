import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import {generate} from 'random-words';


function select(e){
  console.log(e.target);
  document.querySelectorAll('.menu-item').forEach((item)=>{
    if(item.classList.contains('select') && !item.classList.contains('multi')){
      item.classList.remove('select');
    }
  });
  if(e.target.classList.contains('multi')){
    if(e.target.classList.contains('select')){
      e.target.classList.remove('select');
    } else {
      e.target.classList.add('select');
    }
  } else {
    e.target.classList.add('select');
  }
}

class Menu extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='row-flex justify-space-around'>
        <div id='time' className='menu-item menu' onClick={select}>
      <div><i className="fa-solid fa-clock"></i> time</div>
        </div>
        <div id='words' className='menu-item menu' onClick={select}>
          <div><i className="fa-solid fa-a"></i> words</div>
        </div>

        <div id='quote' className='menu-item menu' onClick={select}>
        <div><i className="fa-solid fa-quote-left"></i> quote</div>
        </div>

        <div id='zen' className='menu-item menu' onClick={select}>
        <div><i className="fa-solid fa-leaf"></i> Zen</div>
        </div>

        <div id='custom' className='menu-item menu' onClick={select}>
        <div><i className="fa-solid fa-wrench"></i> Custom </div>
        </div>
        
        </div>
          
          
          
          
    );
  }
}

class PunctuationAndNumbers extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className='row-flex justify-space-around'>
        <div id='punctuation' className='menu-item multi' onClick={select}>
          <div><i className="fa-solid fa-at"></i> punctuation</div>
        </div>
        <div id='numbers' className='menu-item multi' onClick={select}>
          <div><i className="fa-solid fa-hashtag"></i> numbers</div>
        </div>
        
          <div className='pipeChar'></div>
      </div>
    )
  }
}


class Options extends React.Component{
  constructor(props){
    super(props);
    Options.defaultProps = {
      menu: "time"
    }
  }

  
  render(){
    return(

      <div className='row-flex justify-space-around'>
        <div className='pipeChar'></div>
    <div className='time' onClick={select}>15</div>
          <div className='menu-item time' onClick={select}>30</div>
          <div className='menu-item time' onClick={select}>60</div>
          <div className='menu-item time' onClick={select}>120</div>
          <div id='settings' className='menu-item time' onClick={select}><i className="fa fa-cog time" aria-hidden="true"></i></div>
    </div>
    )
  }
}

class Type extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.blink = this.blink.bind(this);
    this.handleText = this.handleText.bind(this);
    this.state = {
      input: '',
      pipePosition: 0,
      _blink: null,
      isFocus: true
    }
  }

  handleChange(event){
    this.setState((state,props)=>(
      {
        input: event.target.value
      }
    ))
    setTimeout(() => {
      this.handleText();
    }, 1);
  }

  blink(cursor,isBlink){
    console.log("blink bhai");
    if(isBlink){
      this.state._blink = setInterval(() => {
        cursor.classList.add('cursor-blink');
        setTimeout(() => {
          cursor.classList.remove('cursor-blink');
        }, 500);
      }, 1000);
    } else {
      clearInterval(this.state._blink);
    }
  }
  

  handleText(){
    console.log(this.state.input.length);
    this.setState(({
      pipePosition: document.getElementById('text').getBoundingClientRect().left + 20
    }));
    document.getElementById('text').innerHTML = this.state.input + `<span id='pipe' className='yellow cursor-blink'>|</span>`;
    let pipe = document.getElementById('pipe');
    if(this.state.input.length == 0){
      this.blink(pipe,true);
    } else {
      this.blink(pipe,false);
    }
    let newPosition = pipe.getBoundingClientRect().left;
    let offset = pipe.getBoundingClientRect().left - this.state.pipePosition;
    pipe.style.transform = "translateX("+(-offset)+"px)";
    this.setState({
      pipePosition:newPosition
    });
    setTimeout(() => {
      pipe.style.color = "yellow"
      pipe.style.transition = "transform 0.2s ease"
      pipe.style.transform = "translateX(0)"
    }, 25);
  }

  


  render(){
    return (
      <div className="wrapper">
        <div className ="header"></div>
        <div className="navigation-container">
        <div className='navbar'>
          <PunctuationAndNumbers />
          <Menu />
          <Options />
        </div>

        </div>
        <div className="type-container">
          <input className="input" onChange={this.handleChange}/>

        <div className="type-inner-container">
        <p className="typearea" id='text'><span className='yellow'>|</span></p>
          </div>
        </div>


        <div className='hotkeys-container'></div>
        <div className='footer'></div>
      
      </div>
      
    )
  }
}


document.body.addEventListener('keydown',(e)=>{
  let key = e.key;
  if(e.ctrlKey && e.key == 'a'){
    e.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Type/>);
