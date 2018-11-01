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
};

const createDivWithClass = function(klass) {
    const div = document.createElement("div");
    div.className = klass;
    return div;
};

function getTime() {
    const time = new Date();
    const hh = `0${time.getHours()}`.slice(-2);
    const mm = `0${time.getMinutes()}`.slice(-2);
    const ss = `0${time.getSeconds()}`.slice(-2);
    const clock = `${hh}:${mm}:${ss}`;
    const clockElement = document.getElementById("clockTime");
    clockElement.innerText = clock;
}
