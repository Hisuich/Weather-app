let getCountries = async function() {
    const api_countries = await fetch(`https://restcountries.eu/rest/v2/all`)
    const data = await api_countries.json();
    
    let temp = [];    
    
    for(let country in data) {
                temp.push(data[country]);
        }
    
    console.log(temp);
};

getCountries();

export const initialState = {
    weather: {},
    countries: {},
    cities: {},
    country: '',
    city: ''
}