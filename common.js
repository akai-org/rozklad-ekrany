const getJSON = function(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        const status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
}

const createDivWithClass = function(klass) {
    const div = document.createElement("div");
    div.className = klass;
    return div;
};

const buildTable = function(model){
    const table = document.createElement("table");
    const top_row = document.createElement("tr");
    const tableHeaders = {'line' : 'Linia', 'direction': 'Kierunek', 'departure' : 'Odjazd'};

    Object.keys(tableHeaders).map(key => {
        const el = document.createElement('th');
        el.class = key;
        el.textContent = tableHeaders[key];
        top_row.appendChild(el);
    });
    table.appendChild(top_row);

    model.times.slice(0,9).forEach(function(item) {
        const new_row = document.createElement("tr");

        ["line", "direction", "departure"].forEach(property => {
            const el = document.createElement("td");
            el.className = property;
            let text = item[property];

            if(property === "departure") {
                const time = new Date(text.slice(0, text.length-1));
                const now = new Date();
                const diff = Math.floor((time-now) / 1000 / 60);
                text = text.slice(11,16);
                if(diff < 4) {
                    new_row.style.color = '#DD0E0E';
                    diff < 1 ? text = `< 1 min` : text = `${diff} min`;
                }
                else if (diff < 8) {
                    new_row.style.color = '#D49A11';
                    text = `${diff} min`
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
