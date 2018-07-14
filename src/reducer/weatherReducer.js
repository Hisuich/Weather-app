const weatherReducer = (state = {weather: {}}, action) => {
    switch(action.type) {
        case "SET_WEATHER":
            return {
                ...state,
                weather: action.weather
            }
        default:
            return {
                ...state
            }
    }
}

export default weatherReducer;