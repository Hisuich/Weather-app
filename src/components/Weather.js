import React from 'react';
import {connect} from 'react-redux';

class Weather extends React.Component {

        render() {
            const { weather } = this.props;
        return (
            <div className="weather__info">             
                { 
                    weather.temperature && <p className="weather__key">Temperature: 
                        <span className="weather__value">{weather.temperature}</span></p>
                }

                { 
                    weather.city        && <p className="weather__key">Location:    
                        <span className="weather__value">{weather.city}</span></p>
                }

                {
                    weather.humidity    && <p className="weather__key">Humidity:    
                        <span className="weather__value">{weather.humidity}</span></p>
                }

                { 
                    weather.description && <p className="weather__key">Condition:   
                        <span className="weather__value">{weather.description}</span></p>
                }
                
                { 
                    weather.error       && <p className="weather__error">             
                        {weather.error}</p>
                }

            </div>
        );
    }
}


const mapWeatherToProps = (state) => {
    return {
        weather: state.weather
    }
}
export default connect(mapWeatherToProps)(Weather);
