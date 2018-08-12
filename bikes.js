//Poznań ma ID 192, wysyłamy żeby nie pobierać wszystkich rowerów nextbike, a trochę ich mają ;)
const nextbikeApiUrl = 'https://api.nextbike.net/maps/nextbike-live.json?city=192';

const getBikeStation = (data, stopName) => {
    return data
        .countries.filter(country => country.name === "PRM Poznan Poland")[0]
        .cities.filter(city => city.name === "Poznań")[0]
        .places.filter(place => place.name === stopName)[0]
        .bikes;

};
