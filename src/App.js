import React, { Component } from 'react';

import './App.css';

import Titles from './components/Titles.js';
import Form from './components/Form.js';
import Weather from './components/Weather.js';

const API_KEY = '2ac075017f0ce2dec851a88821c340f8';

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;

    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country} &appid=${API_KEY}`);

    const data = await api_call.json();
    if (city && country) {
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
  } else {
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Please Enter the value"
    });
    
  }
    
  }

  render() {
    return (
      <div>
          <div className="wrapper">
            <div className="main">
              <div className="container">
                <div className="row">
                  <div className="col-xs-5 title-container"> 
                    <Titles />
                  </div>
                  <div className="col-xs-7 form-container">
                      <Form getWeather={this.getWeather} />
                      <Weather 
                        temperature={this.state.temperature} 
                        city       ={this.state.city}
                        coutry     ={this.state.coutry}
                        humidity   ={this.state.humidity}
                        description={this.state.description} 
                        error      ={this.state.error}
                      />
                  </div>
                </div>
              </div>
            </div>  
          </div>
      </div>
    );
  }
}

export default App;
