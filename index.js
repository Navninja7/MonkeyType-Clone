import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';

class Hello extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      input: '',
      pipePosition: 0
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

  handleText(){
    this.setState(({
      pipePosition: document.getElementById('text').getBoundingClientRect().left + 20
    }))
    document.getElementById('text').innerHTML = this.state.input + `<span id='pipe' className='yellow'>|</span>`;
    let pipe = document.getElementById('pipe');
    let newPosition = pipe.getBoundingClientRect().left;
    let offset = pipe.getBoundingClientRect().left - this.state.pipePosition;
    pipe.style.transform = "translateX("+(-offset)+"px)";
    this.setState({
      pipePosition:newPosition
    });
    setTimeout(() => {
      pipe.style.color = "yellow"
      pipe.style.transition = "transform 0.1s ease"
      pipe.style.transform = "translateX(0)"
    }, 25);
  }


  render(){
    return (
      <div className="wrapper">
        <div className ="header"></div>
        <div className="navigation-container">
        <div className='navbar'>
          <div>@ punctuation</div>
          <div># numbers</div>
          <div><i class="fa-solid fa-clock"></i> time</div>
          <div>words</div>
          <div><i class="fa-solid fa-quote-left"></i> quote</div>
          <div><i class="fa-solid fa-chart-pyramid"></i> Zen</div>
          <div>15</div>
          <div>30</div>
          <div>60</div>
          <div>120</div>
          <div><i class="fa fa-cog" aria-hidden="true"></i></div>
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
root.render(<Hello/>);
