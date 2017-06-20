import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()

    // data provinsi disimpan di state.provinces
    this.state = {
      filter: '',
      provinces: []
    }
  }

  componentDidMount() {
    // ajax call
    fetch('https://habibridho.gq:4000/api/all')
    .then(response => response.json())
    .then((json) => {
      this.setState({
        provinces: json.data
      })
    })
  }

  filter = () => {
    fetch('https://habibridho.gq:4000/api/get?filter=' + this.state.filter)
    .then(response => response.json())
    .then((json) => {
      this.setState({
        provinces: json.data
      })
    })
  }

  onChangeText = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  renderProvinces(item, index) {
    return <li key={index}>{item.name}</li>
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Filter
        </p>
        <input type="text" value={this.state.filter} onChange={this.onChangeText} style={{marginBottom: 8}}/><br/>
        <button onClick={this.filter}>Saring</button>

        <div style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}>
          <ol>
            { this.state.provinces.map(this.renderProvinces) }
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
