//Adres API
const vmApiUrl = 'https://rozklady.akai.org.pl/';
// const vmApiUrl = 'https://www.peka.poznan.pl/vm/';


//Przystanki
//www.peka.poznan.pl/vm/?przystanek=PP72

const views = [
    {symbol: 'PP71', desc: "W stronę Rataj"},              //Politechnika w kierunku na Franowo/Starołękę
        {symbol: 'PP72', desc: 'W stronę Centrum'},        //Politechnika w kierunku miasta
    {symbol: 'BAKA41', desc: 'W stronę Ronda Rataje'},     //Baraniaka na północ - Wilczak, Ogrody
        {symbol: 'BAKA42', desc: 'W stronę Ronda Śródka'}, //Baraniaka na południe - Franowo, Starołęka
    {symbol: 'KORN41', desc: 'W stronę Ronda Rataje'},     //Kórnicka na północ
        {symbol: 'KORN42', desc: 'W stronę Malty'},        //Kórnicka na południe
    {symbol: 'KORN43', desc: 'W stronę Franowa'},          //Kórnicka na wschód
        {symbol: 'KORN44', desc: 'W stronę Centrum'},      //Kónicka na zachód
    {symbol: 'KORN45', desc: 'W stronę Malty'}          //Kórnicka na południe 2 (pojedynczy przystanek)
];

async function getTrams() {
    const promises = views.map(async function (item) {
        return await fetch(`${vmApiUrl}method.vm?ts=${new Date().getTime()}`, {
            method: 'POST',
            headers: {
                'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            // URL encoded: method=getTimes&p0={"symbol":"<item.symbol>"}
            body: `method=getTimes&p0=%7B%22symbol%22%3A%22${item.symbol}%22%7D`
        })
            .then(response => response.json())
            .catch(err => console.log(err))
    });
    const models = await Promise.all(promises);
    return models.map(model => model.success);
}

function buildTable(model){
    const table = document.createElement("table");
    const top_row = document.createElement("tr");
    const tableHeaders = {'line' : 'Linia', 'direction': 'Kierunek', 'departure' : 'Odjazd'};
    const rowsCount = 10;

    Object.keys(tableHeaders).map(key => {
        const el = document.createElement('th');
        el.class = key;
        el.textContent = tableHeaders[key];
        top_row.appendChild(el);
    });
    table.appendChild(top_row);

    model.times.slice(0, rowsCount).forEach(function(item) {
        const new_row = document.createElement("tr");

        ["line", "direction", "departure"].forEach(property => {
            const el = document.createElement("td");
            el.className = property;
            let text = item[property];

            if(property === "departure") {
                const departureTime = new Date(text.slice(0, text.length-1));
                text = text.slice(11,16);
                const now = new Date();
                const diff = Math.floor((departureTime-now) / 1000 / 60);
                if(diff < 4) {
                    new_row.style.color = '#d70010';
                    diff < 1 ? text = `< 1 min` : text = `${diff} min`;
                }
                else if (diff < 8) {
                    new_row.style.color = '#e1b20f';
                    text = `${diff} min`;
                }
            }

            const textNode = document.createTextNode(text);
            el.appendChild(textNode);
            new_row.appendChild(el);
        });
        table.appendChild(new_row);
    });

    return table;
}

function showTrams(models, wrapper) {
    models.forEach((model) => {
        console.log(model);
        const description = views.filter(view => view.symbol === model.bollard.symbol)[0].desc;
        const card = createDivWithClass('card');
        const cardTop = createDivWithClass('card-top');
        const stopName = createDivWithClass('stop-name');
        const pic = document.createElement('img');
        const stopInfo = createDivWithClass('stop-info');
        const descBox = createDivWithClass('stop-desc');

        const cardTable = buildTable(model);
        cardTable.className = 'card-table';
        stopName.innerHTML = model.bollard["name"];
        descBox.innerHTML = description;
        pic.setAttribute('src', `./images/maps/${model.bollard.symbol}_PP.png`);
        pic.className = 'stop-img';

        stopInfo.appendChild(stopName);
        stopInfo.appendChild(descBox);
        cardTop.appendChild(stopInfo);
        cardTop.appendChild(pic);
        card.appendChild(cardTop);
        card.appendChild(cardTable);
        wrapper.append(card);
    });
}
