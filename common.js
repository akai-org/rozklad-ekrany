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

const createDivWithClass = function(klass) {
    let div = document.createElement("div");
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

    model.times.slice(0,10).forEach(function(item) {
        const new_row = document.createElement("tr");

        ["line", "direction", "departure"].forEach(property => {
            const el = document.createElement("td");
            el.className = property;
            let text = item[property];

            if(property === "departure") {
                let time = new Date(text.slice(0, text.length -1));
                let now = new Date();
                text = text.slice(11,16);
                if(time - now < 180000) {
                    new_row.style.color = '#DD0E0E';
                }
                else if (time - now < 420000) {
                    new_row.style.color = '#D49A11';
                }
            }

            const textNode = document.createTextNode(text);
            el.appendChild(textNode);
            new_row.appendChild(el);
        });
        table.appendChild(new_row);
    });

    return table;
};
