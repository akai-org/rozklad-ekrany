//Poznań ma ID 192, wysyłamy żeby nie pobierać wszystkich rowerów nextbike, a trochę ich mają ;)
const apiUrl = 'https://api.nextbike.net/maps/nextbike-live.json?city=192'
//ID stacji
const POLITECHNIKA = 6167
const KORNICKA = 2189

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

var getBikeStation = function(data, uid) {
    return data.countries[0].cities[0].places.filter( function (value) {
        return value.number === uid
    })[0]
}

