import {store} from '../index';

const userName = "hisuich";


const initialState = {
    weather: {},
    countries: [],
    cities: [],
    country: '',
    city: ''
}   
getCountries()
setCityByCoords();

function getCountries() {
    fetch(`https://restcountries.eu/rest/v2/all`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        store.dispatch({
            type: "SET_COUNTRIES",
            countries: data
        }) 
    });
};

function setCityByCoords() {
    navigator.geolocation.getCurrentPosition(pos => {
        fetch(`http://secure.geonames.org/findNearbyJSON?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}&lang=en&username=${userName}&radius=5`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const city = data.geonames[0].name;
            console.log(city);
            store.dispatch({
                type: "SET_CITY",
                city: city
            }) 
            fetch(`https://secure.geonames.org/searchJSON?q=${city}&username=${userName}`)
            .then(countryRes => {
                return countryRes.json();
            })
            .then(countryData => {
                const country = countryData.geonames[0];
                store.dispatch({
                    type: "SET_COUNTRY",
                    country: country.countryName
                }) 
                setCity(country.countryCode);
            })
        });
    })
}

function setCity(country) {
    fetch(`https://secure.geonames.org/searchJSON?q=&country=${country}&username=${userName}`)
    .then(response => {
        return response.json();
    })
    .then(data => {

        store.dispatch({
            type: "SET_CITIES",
            cities: data.geonames.map(value => value.name)
        })
    })
}

export default initialState;