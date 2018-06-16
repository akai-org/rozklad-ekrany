//Poznań ma ID 192, wysyłamy żeby nie pobierać wszystkich rowerów nextbike, a trochę ich mają ;)
const nextbikeApiUrl = 'https://api.nextbike.net/maps/nextbike-live.json?city=192';
//ID stacji
const POLITECHNIKA = 6167;
const KORNICKA = 2189;

const getBikeStation = function(data, uid) {
    let country_id = 0;
    while(data.countries[country_id].name !== "PRM Poznan Poland") {
        country_id++;
    }
    return data.countries[country_id].cities[0].places.filter( function (value) {
        return value.number === uid;
    })[0];
};

