import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getInitialFlightData } from './DataProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.eventSource = new EventSource('http://localhost:5000/events');
    this.state = {
      data: getInitialFlightData()
    };
  }
  componentDidMount() {
    this.eventSource.onmessage = (e) => {
      if (e.origin != 'http://127.0.0.1:5000' && e.origin != 'http://localhost:5000') {
        alert('Origin was not http://example.com : ' + e.origin);
        return;
      }
      this.updateFlightState(JSON.parse(e.data));
    }
  }
  updateFlightState(flightState) {
    console.log(flightState)
    let find = false;
    let newData = this.state.data.map((item) => {
      if (item.flight === flightState.flight) {
        find = true;
        item.state = flightState.state;
      }
      return item;
    });
    if(!find) {
      newData = [...newData, flightState]
    }

    this.setState(Object.assign({}, {data: newData}));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.data.map((flight, index) => {
          return (
            <div key={index}>
              Flight: {flight.flight}<br />
              Origin: {flight.origin}<br />
              Arrival: {flight.arrival}<br />
              State: {flight.state}
            <hr />
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
