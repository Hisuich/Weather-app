import React, { Component } from 'react';

import './App.css';

import Titles from './components/Titles.js';
import Form from './components/Form.js';
import Weather from './components/Weather.js';

class App extends Component {

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
                      <Form />
                      <Weather />
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
