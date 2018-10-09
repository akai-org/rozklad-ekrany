//Adres API
// const vmApiUrl = 'https://rozklad.akai.org.pl/';
const vmApiUrl = 'https://www.peka.poznan.pl/vm/';

//Przystanki
//www.peka.poznan.pl/vm/?przystanek=PP72

const views = [
    {symbol: 'PP71', desc: "W stronę Rataj"},              //Politechnika w kierunku na Franowo/Starołękę
        {symbol: 'PP72', desc: 'W stronę Centrum'},        //Politechnika w kierunku miasta
    {symbol: 'BAKA41', desc: 'W stronę Ronda Rataje'},     //Baraniaka na północ - Wilczak, Ogrody
        {symbol: 'BAKA42', desc: 'W stronę Ronda Śródka'}, //Baraniaka na południe - Franowo, Starołęka
    {symbol: 'KORN41', desc: 'W stronę Ronda Rataje'},     //Kórnicka na północ
        {symbol: 'KORN42', desc: 'W stronę Malty'},        //Kórnicka na południe
    // {symbol: 'KORN43', desc: 'W stronę Franowa'},          //Kórnicka na wschód
    //     {symbol: 'KORN44', desc: 'W stronę Centrum'},      //Kónicka na zachód
    {symbol: 'KORN45', desc: 'W stronę Malty'}          //Kórnicka na południe 2 (pojedynczy przystanek)
];


var VM = {
    ver: 1.0
};

VM.DateUtils = Class.create({
    initialize: function() {
        this.months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    }
});

VM.Progress = Class.create({
    initialize: function(config) {
        this.config = Object.extend({

        }, config || {});

        this.topOffset = 0;
        this.render();
    },
    render: function() {
        var handler = this;

        handler.bg = new Element("DIV", {
            style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; background-color:transparent; z-index:10000000"
        });
        window.document.body.insert(handler.bg);

        handler.img = new Element("IMG", {
            src: "",//img/ajax-loader.gif
            style: "position:absolute; top:50%; left:50%; margin-left:-100px;"
        });

        handler.bg.insert(handler.img);
    },
    close: function() {
        this.bg.remove();
    }
});

VM.Coordinator = Class.create({
    initialize: function(config) {
        this.config = Object.extend({

        }, config || {});

        this.du = new VM.DateUtils();
        this.debug = false;

        this.serverTimeStore = '';
        this.updateTime();
        this.render();
    },
    render: function() {
        var handler = this;
        var refreshFun = function() {
            handler.loadTimes(handler.selectedSymbol);
        };
        handler.intervalRefresh = setInterval(refreshFun, 20000);
    },
    loadTimes: function(symbol) {
        var handler = this;

        if(handler.selectedStopPoint !== undefined) {
            delete handler.selectedStopPoint;
        }

        handler.selectedSymbol = symbol;

        var dao = new VM.DAO({
            onSuccess: function(model) {
                handler.config.title.update(model.bollard.name);

                var symbol = new Element("P",{
                    class: "bollardSymbol"
                }).update("Symbol: " + model.bollard.symbol);
                handler.config.title.insert(symbol);

                for (var i=0; i<model.times.length; i++) {
                    handler.addRow(i, model.times[i]);
                }

                if(handler.link === undefined) {
                    handler.link = new Element("A", {
                        href: "",
                        class: "bollardLink"
                    }).update("Bezpośredni link do przystanku");
                } else {
                    handler.link.update("Bezposredni link do przystanku");
                }

                handler.config.search.insert(handler.link);

                handler.config.times.scrollTop = handler.topOffset;
            }
        });
        dao.getTimes({
            symbol: handler.selectedSymbol
        });
    },
    updateTime: function() {
        var handler = this;
        handler.clock = handler.config.clock;

        handler.clockTime = new Element("P", {
            class: "clockTime"
        });

        handler.clock.insert(handler.clockTime);
        if (handler.serverTime === undefined) {
            handler.serverTime = new Date();
        }

        var timeDao = new VM.DAO({
            onSuccess: function(mils) {
                handler.serverTime.setTime(mils);
                handler.clockTimer = setInterval(function(){
                    var hh = handler.serverTime.getHours();
                    if (hh < 10) {
                        hh = "0" + String(hh);
                    }
                    var mm = handler.serverTime.getMinutes();
                    if (mm < 10) {
                        mm = "0" + String(mm);
                    }
                    var ss = handler.serverTime.getSeconds();
                    if (ss < 10) {
                        ss = "0" + String(ss);
                    }
                    var timeStr = hh + ":" + mm; // + ":" + ss;
                    handler.clockTime.update(timeStr);
                    this.serverTimeStore = timeStr;
                    handler.serverTime.setTime( handler.serverTime.getTime() + 1000 );
                },1000);
            }
        });
        timeDao.getServerTime();
    }
});

//Wysyłanie żądań
VM.DAO = Class.create({
    initialize: function(config) {
        this.config = Object.extend({

        }, config);

        this.du = new VM.DateUtils();
    },
    getStopPoints: function getStopPoints() {
        this.genericCall(arguments);
    },
    getBollards: function getBollards() {
        this.genericCall(arguments);
    },
    getLines: function getLines() {
        this.genericCall(arguments);
    },
    getStreets: function getStreets() {
        this.genericCall(arguments);
    },
    getTimes: function getTimes() {
        this.genericCall(arguments);
    },
    getBollardsByStopPoint: function getBollardsByStopPoint() {
        this.genericCall(arguments);
    },
    getBollardsByStreet: function getBollardsByStreet() {
        this.genericCall(arguments);
    },
    getBollardsByLine: function getBollardsByLine() {
        this.genericCall(arguments);
    },
    findMessagesForBollard: function findMessagesForBollard() {
        this.genericCall(arguments);
    },
    getTimesForAllBollards: function getTimesForAllBollards() {
        this.genericCall(arguments);
    },
    getServerTime: function getServerTime() {
        this.genericCall(arguments);
    },

    genericCall: function() {
        var args = arguments[0];

        var methodName = arguments.callee.caller.name;

        if(!methodName) {
            var funcNameRegex = /function\s([^(]{1,})\(/;
            var results = (funcNameRegex).exec((arguments.callee.caller).toString());
            methodName = (results && results.length > 1) ? results[1].trim() : "";
        }

        var params = {
            method: methodName
        };
        var i=0;
        for (i=0; i<args.length; i++) {
            eval("params.p" + i + " = Object.toJSON(args[i]);")
        }

        var handler = this;

        var progress = new VM.Progress();

        console.log('POST', vmApiUrl+'method.vm?ts=' + new Date().getTime(), params);
        new Ajax.Request(vmApiUrl+'method.vm?ts=' + new Date().getTime(), {
            method: 'POST',
            parameters: params,
            onSuccess: function(transport) {
                var response = transport.responseText || "no response text";
                try {
                    var resp = response.evalJSON();
                    if (resp.success !== undefined) {

                        if (handler.config.onSuccess) {
                            handler.config.onSuccess(resp.success);
                        }
                    } else if (resp.failure !== undefined) {
                        if (handler.config.onFailure) {
                            handler.config.onFailure(resp.failure);
                        } else {
                            //new UI.AlertDialog({message: methodName + " " + $MSG(resp.failure)});
                        }
                    }
                    progress.close();
                } catch (e) {
                    var response = transport.responseText || "no response text";
                    if ("no response text" == response) {
                    }
                    progress.close();
                }
            },
            onFailure: function(s) {
                progress.close();
            }
        });
    }
});