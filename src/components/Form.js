import React  from 'react';
import { connect } from 'react-redux';
import {v4} from 'node-uuid';

const API_KEY = '2ac075017f0ce2dec851a88821c340f8';
const userName = 'Hisuich';

class Form extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                countryValue: '',
                cityValue: '',
                countryes: [],
                cities: [],
            }
            this.getCountryes();
            this.setCity('AD')

        }

        onCountryChange = (event) => {
            console.log(event.target.value);
            this.setState({countryValue: event.target.value});
            this.setCity(event.target.value);
        }

        onCityChange = (event) => {
            this.setState({cityValue: event.target.value});
        }
        
        getWeather = async (event) => {
        event.preventDefault();
        const city = event.target.elements.cities.value;
        const country = event.target.elements.countryes.value;
        console.log(country);
    
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

    getCountryes = async () => {
    const api_country = await fetch(`https://api.geonames.org/countryInfoJSON?&username=${userName}`)
    const data = await api_country.json();
    let temp = [];    
    for(let country in data.geonames) {
                temp.push(data.geonames[country]);
        }
    this.setState({countryes: temp});
    }

    setCity = async (country) => {
        const api_cites= await fetch(`https://api.geonames.org/searchJSON?q=&country=${country}&lang=de&username=${userName} `)
        const data = await api_cites.json();
        let temp = [];    
        for(let city in data.geonames) {
                    temp.push(data.geonames[city].name);
            }
        console.log(temp);
        this.setState({cities: temp});
    }
        render() {
            return (
                <form onSubmit={this.getWeather}>
                    <select type="text" name="cities" value={this.state.cityValue} onChange={this.onCityChange}>
                        {this.state.cities.map((value) => {
                            return (
                            <option key={v4()} value={value}>{value}</option>
                        )})}
                    </select>
                    <select type="text" name="countryes" value={this.state.countryValue} onChange={this.onCountryChange}>
                        {this.state.countryes.map((value) => {
                            return (
                                <option key={v4()} value={value.countryCode}>{value.countryName}</option>
                            )
                        })}
                    </select>
                    <button>Get Weather</button>
                </form>            
        );
    }
    }
    

export default connect()(Form);