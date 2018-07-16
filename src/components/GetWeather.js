import React  from 'react';
import { connect } from 'react-redux';

class GetWeather extends React.Component {
    constructor(props) {
        super(props);
    }

    getWeather = async (event) => {
        event.preventDefault();
        const API_KEY = '2ac075017f0ce2dec851a88821c340f8';
        const city = this.props.city;
        console.log(city);
        const country = this.props.country;
    
        const my_api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
        const data = await my_api_call.json();
            console.log(data);
            if (city && country) {
                this.props.dispatch({
                    type: "SET_WEATHER",
                    weather: {
                        temperature: data.main.temp,
                        city: data.name,
                        country: data.sys.country,
                        humidity: data.main.humidity,
                        description: data.weather[0].description,
                        error: ""
                    }
                });
              } else {
                this.props.dispatch({
                    type: "SET_WEATHER",
                    weather: {
                        temperature: data.main.temp,
                        city: data.name,
                        country: data.sys.country,
                        humidity: data.main.humidity,
                        description: data.weather[0].description,
                        error: ""
                    }
                }); 
              }
      }


    render() {
        return (
            <button onClick={this.getWeather}>GetWeather</button>
        )
    }
}

export default connect(state => {
    return {
        city: state.city,
        country: state.country
    }
})(GetWeather);