import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  formatTime(countTime) {
    const minutes = Math.floor(countTime / 60);
    const seconds = Math.floor(countTime - (minutes * 60));
    return `${(minutes < 10? `0${minutes}`: minutes)}:${(seconds < 10? `0${seconds}`:seconds)}`;
  }

  step = () => {
    this.setState({
      time: this.state.time - 1
    });

    if(this.state.time == 0) {
      if(this.state.status === 'work'){
        this.setState ({
          status: 'rest',
          time: 20
        });
        this.playBell();
      }
      else if(this.state.status === 'rest'){
        this.setState ({
        status: 'work',
          time: 1200
        });
        this.playBell();
      }
    }
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work'
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      time: 0,
      status: 'off'
    });
  }

  closeApp = () => {
    window.close();
  }

  playBell = () => {
    const gong = new Audio('./sounds/metal_gong.wav');
    gong.play();
  }

  render() {
    const { status, time } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <div><p>According to optometrists in order to save your eyes, you should follow the 20/20/20. 
          It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p></div>}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
