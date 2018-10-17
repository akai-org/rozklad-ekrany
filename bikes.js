//Poznań ma ID 192, wysyłamy żeby nie pobierać wszystkich rowerów nextbike, a trochę ich mają ;)
const nextbikeApiUrl = 'https://api.nextbike.net/maps/nextbike-live.json?city=192';

const getBikeStation = (data, stopName) => {
    return data
        .countries.filter(country => country.name === "PRM Poznan Poland")[0]
        .cities.filter(city => city.name === "Poznań")[0]
        .places.filter(place => place.name === stopName)[0]
        .bikes;

};

function showBikes(bikeJSON, wrapper){
    const card = createDivWithClass('bikes card');
    const cardTop = createDivWithClass('bikes-top');
    const header = createDivWithClass('bikes-header');
    const bikeImg = document.createElement('img');

    bikeImg.setAttribute("src", "./images/bike.png");
    bikeImg.className = "bike-img";
    header.innerHTML = "Rowery miejskie";
    cardTop.appendChild(header);
    cardTop.appendChild(bikeImg);
    card.appendChild(cardTop);

    ["Politechnika Centrum Wykładowe", "Kórnicka"].forEach(station => {
        const bikes = getBikeStation(bikeJSON, station);
        console.log(`${station}: ${bikes} rowerów`);
        const box = createDivWithClass('bikes-box');
        const num = createDivWithClass('bikes-num');
        const name = createDivWithClass('bikes-name');
        name.innerHTML = `Stacja <br> ${station.split(" ")[0]}`;
        num.innerHTML = bikes;
        box.appendChild(num);
        box.appendChild(name);
        card.appendChild(box);
    });

    wrapper.appendChild(card);
}
