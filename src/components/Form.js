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
            this.setCityByCoords();
        }

        onCountryChange = (event) => {
            this.setState({countryValue: event.target.value});
            for (let i = 0; i < this.state.countryes.length; i++) {
                if (this.state.countryes[i].name === event.target.value) {
                    this.setCity(this.state.countryes[i].alpha2Code);
                    i = this.state.countryes.length;
                }
            }
        }

        onCityChange = (event) => {
            this.setState({cityValue: event.target.value});
        }
        
        getWeather = async (event) => {
        event.preventDefault();
        const city = event.target.elements.cities.value;
        const country = event.target.elements.countryes.value;
    
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
    const api_country = await fetch(`https://restcountries.eu/rest/v2/all`)
    const data = await api_country.json();
    console.log(data);
    let temp = [];    
    for(let country in data) {
                temp.push(data[country]);
        }

    this.setState({countryes: temp});
    }

    setCityByCoords = async () => {
        navigator.geolocation.getCurrentPosition(pos => {
            console.log(pos.coords);
            fetch(`json?key=AIzaSyCAr4oGVoe2A4PtksWMdU509Wzc8l-WDrM&language=en&location=${pos.coords.latitude}, ${pos.coords.longitude}&radius=5`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const city = data.results[0].name;
                fetch(`https://secure.geonames.org/searchJSON?q=${city}&username=${userName}`)
                .then(countryRes => {
                    return countryRes.json();
                })
                .then(countryData => {
                    const country = countryData.geonames[0].countryName;
                    this.setState({
                        cityValue: city,
                        countryValue: country
                    })
                    for (let i = 0; i < this.state.countryes.length; i++) {
                        if (this.state.countryes[i].name === country) {
                            this.setCity(this.state.countryes[i].alpha2Code);
                            i = this.state.countryes.length;
                        }
                    }
                })
            });
        })
    }

    setCity = async (country) => {
        console.log(country);
        const api_cites= await fetch(`https://secure.geonames.org/searchJSON?q=&country=${country}&username=${userName} `)
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
                            <option key={v4()} valuwe={value}>{value}</option>
                        )})}
                    </select>
                    <select type="text" name="countryes" value={this.state.countryValue} onChange={this.onCountryChange}>
                        {this.state.countryes.map((value) => {
                            return (
                                <option key={v4()} value={value.name}>{value.name}</option>
                            )
                        })}
                    </select>
                    <button>Get Weather</button>
                </form>            
        );
    }
    }
    

export default connect(state => {
    return {
        city: state.city,
        country: state.country
    }
})(Form);