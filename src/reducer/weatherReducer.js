import initialState from './initialState.js';

const weatherReducer = (state = {...initialState}, action) => {
    switch(action.type) {
        case "SET_WEATHER":
        console.log(initialState.cities);
        console.log(state.countries);
            return {
                ...state,
                weather: action.weather
            }
        case "SET_CITY":
        return {
            ...state,
            city: action.city
        }
        case "SET_COUNTRY":
        return {
            ...state,
            country: action.country
        }
        case "SET_CITIES":
        return {
            ...state,
            cities: action.cities
        }
        case "SET_COUNTRIES":
        return {
            ...state,
            countries: action.countries
        }
        default:
            return {
                ...state
            }
    }
}

export default weatherReducer;