import React  from 'react';
import { connect } from 'react-redux';
import {v4} from 'node-uuid';

const userName = "hisuich";

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: []
        }
    }

    onCountryChange = (event) => {
        this.props.dispatch(
            {
                type: "SET_COUNTRY",
                country: event.target.value
            });

        this.setCity();
    }

    onCityChange = (event) => {
        this.props.dispatch(
            {
                type: "SET_CITY",
                city: event.target.value
            });
    }

    setCity = async function() {
        const api_cites= await fetch(`https://secure.geonames.org/searchJSON?q=&country=${this.props.country}&username=${userName} `)
        const data = await api_cites.json();
        
        this.store.dispatch({
            type: "SET_CITIES",
            cities: data.geonames.map(value => value.name)
        }) 
    }


    render() {
        console.log(this.props);
        return (
            <div>
                    <select type="text" name="cities" value={this.props.city} onChange={this.onCityChange}>
                        {this.props.cities.map((value) => {
                            return (
                            <option key={v4()} valuwe={value}>{value}</option>
                        )})}
                    </select>
                    <select type="text" name="countryes" value={this.props.country} onChange={this.onCountryChange}>
                        {this.props.countries.map((value) => {
                            return (
                                <option key={v4()} value={value.name}>{value.name}</option>
                            )
                        })}
                    </select>
                </div>
        )
    }
}

export default connect(state => {
    return ({
        country: state.country,
        city: state.city,
        countries: state.countries,
        cities: state.cities
    })
})(Select);