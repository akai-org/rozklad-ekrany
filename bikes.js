//Poznań ma ID 192, wysyłamy żeby nie pobierać wszystkich rowerów nextbike, a trochę ich mają ;)
const nextbikeApiUrl = 'https://api.nextbike.net/maps/nextbike-live.json?city=192';

const getBikes = async function() {
    return await fetch(nextbikeApiUrl).then(response => response.json()).catch(err => console.log(err));
};

const getBikeStation = (data, stopName) => {
    return data
        .countries.filter(country => country.name === "PRM Poznan Poland")[0]
        .cities.filter(city => city.name === "Poznań")[0]
        .places.filter(place => place.name === stopName)[0]
        .bikes;

};

function buildBikesBox(bikesJSON, station, container) {
    const bikes = getBikeStation(bikesJSON, station);
    console.log(`${station}: ${bikes} rowerów`);
    const box = createDivWithClass('bikes-box');
    const num = createDivWithClass('bikes-num');
    const name = createDivWithClass('bikes-name');
    name.innerHTML = `Stacja <br> ${station === "Politechnika Centrum Wykładowe" ? station.split(" ")[0] : station}`;
    num.innerHTML = bikes;
    box.appendChild(num);
    box.appendChild(name);
    container.appendChild(box);
}

function showBikes(bikesJSON, wrapper){
    const card = createDivWithClass('bikes card');
    const cardTop = createDivWithClass('bikes-top');
    const header = createDivWithClass('bikes-header');
    const bikesImg = document.createElement('img');
    const bikesWrapper = createDivWithClass('bikes-wrapper');

    bikesImg.setAttribute("src", "./images/bike.png");
    bikesImg.className = "bikes-img";
    header.innerHTML = "Rowery miejskie";
    cardTop.appendChild(header);
    cardTop.appendChild(bikesImg);
    card.appendChild(cardTop);

    ["Politechnika Centrum Wykładowe", "Kórnicka", "Rondo Śródka", "Rondo Rataje"]
        .forEach(station => buildBikesBox(bikesJSON, station, bikesWrapper));

    card.appendChild(bikesWrapper);
    wrapper.appendChild(card);
}
