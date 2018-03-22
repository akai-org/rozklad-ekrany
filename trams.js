//Adres API
const vmApiUrl = 'https://www.peka.poznan.pl/vm/'

//Przystanki
//www.peka.poznan.pl/vm/?przystanek=PP72
//Politechnika w kierunku miasta
const POLITECHNIKA_WEST = 'PP72'
//Politechnika w kierunku na Franowo/Starołękę
const POLITECHNIKA_EAST = 'PP71'


const KORNICKA_NORTH = ''
//Kórnicka na południe -
const KORNICKA_SOUTH = ''

//Baraniaka na północ - Wilczak, Ogrody
const BARANIAKA_NORTH = 'BAKA41'
//Baraniaka na południe - Franowo, Starołęka
const BARANIAKA_SOUTH = 'BAKA42'


var VM = {
    ver: 1.0
}

VM.DateUtils = Class.create({
    initialize: function() {
        this.months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    },
    formatDate: function(date) {
        var result = "";
        if (!date) {
            return result;
        }
        try {
            result = this.formatNumber(date.getDate(), 2) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getFullYear(), 4);
        } catch (e) {

        }
        return result;
    },
    formatDateYYYYMMDD: function(date) {
        var result = "";
        if (!date) {
            return result;
        }
        try {
            result = this.formatNumber(date.getFullYear(), 4) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2);
        } catch (e) {

        }
        return result;
    },
    formatFullDate: function(date) {
        var result = "";
        if (!date) {
            return result;
        }
        try {
            result = this.formatNumber(date.getFullYear(), 4) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2) + "T" + this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2) + ":" + this.formatNumber(date.getSeconds(), 2) + "." + this.formatNumber(date.getMilliseconds(), 3) + "Z";
        } catch (e) {

        }
        return result;
    },
    formatDateTime: function(date) {
        var result = "";
        if (!date) {
            return result;
        }
        try {
            result = this.formatNumber(date.getFullYear(), 4) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2) + " " + this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2) + ":" + this.formatNumber(date.getSeconds(), 2);
        } catch (e) {

        }
        return result;
    },
    formatDateTimeNoSec: function(date) {
        var result = "";
        if (!date) {
            return result;
        }
        try {
            result = this.formatNumber(date.getFullYear(), 4) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2) + " " + this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
        } catch (e) {

        }
        return result;
    },
    formatDateMonthDayTimeNoSec: function(date) {
        var result = "";
        if (!date) {
            return result;
        }
        try {
            result = this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2) + " " + this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
        } catch (e) {

        }
        return result;
    },
    formatTime: function(date) {
        var result = "";
        try {
            result = this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
        } catch (e) {

        }
        return result;
    },
    formatTimeSec: function(date) {
        return this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2) + ":" + this.formatNumber(date.getSeconds(), 2);
    },
    formatNumberToTime: function(num) {
        var hours = (num - (num % 60)) / 60;
        var minutes = num % 60;

        return this.formatNumber(hours, 2) + ":" + this.formatNumber(minutes, 2);
    },
    formatNumber: function(num, len) {
        var result = null;
        try {
            result = "" + parseInt(num);
            while (result.length < len) {
                result = "0" + result;
            }
        } catch (e) {

        }

        if (isNaN(parseInt(num))) {
            result = "";
        }

        return result;
    },
    parseNumber: function(number) {
    },
    parseDate: function(dateStr) {

        if (!dateStr) {
            return "";
        }

        var parser = new DateParser("yyyy-MM-ddTHH:mm:ss.SSSZ");
        result = parser.parse(dateStr);

        return result;
    },
    getMonthName: function(zeroBasedNo) {
        return this.months[zeroBasedNo];
    },
    rollDays: function(pDate, pDays) {
        var result = pDate;
        result.setDate(result.getDate() + pDays);
        return result;
    },
    rollHours: function(pDate, pHours) {
        var result = new Date();
        result.setTime(pDate.getTime() + (pHours * 60 * 60 *1000));
        return result;
    },
    dayDiff: function(startDate, endDate) {
        var result = 0;
        var sDate = new Date();
        sDate.setFullYear(startDate.getFullYear());
        sDate.setMonth(startDate.getMonth());
        sDate.setDate(startDate.getDate());
        sDate.setHours(0);
        sDate.setMinutes(0);
        sDate.setSeconds(0);
        sDate.setMilliseconds(0);

        var eDate = new Date();
        eDate.setFullYear(endDate.getFullYear());
        eDate.setMonth(endDate.getMonth());
        eDate.setDate(endDate.getDate());
        eDate.setHours(0);
        eDate.setMinutes(0);
        eDate.setSeconds(0);
        eDate.setMilliseconds(0);

        result = (eDate.getTime() - sDate.getTime()) / 1000 / 60 / 60 / 24;

        return result;
    },
    hoursDiff: function(startDate, endDate) {
        var result = 0;
        var sDate = new Date();
        sDate.setFullYear(startDate.getFullYear());
        sDate.setMonth(startDate.getMonth());
        sDate.setDate(startDate.getDate());
        sDate.setHours(startDate.getHours());
        sDate.setMinutes(0);
        sDate.setSeconds(0);
        sDate.setMilliseconds(0);

        var eDate = new Date();
        eDate.setFullYear(endDate.getFullYear());
        eDate.setMonth(endDate.getMonth());
        eDate.setDate(endDate.getDate());
        eDate.setHours(endDate.getHours());
        eDate.setMinutes(0);
        eDate.setSeconds(0);
        eDate.setMilliseconds(0);

        result = (eDate.getTime() - sDate.getTime()) / 1000 / 60 / 60;

        return result;
    },
    yearDiff18: function(birthDate, currDate) {

        var result = false;

        var currDate = new Date (currDate);
        var birthDate = new Date (birthDate);

        var currYear = new Date(currDate);
        var currMonth = new Date(currDate);
        var currDay = new Date(currDate);

        var birthYear = new Date(birthDate);
        var birthMonth = new Date(birthDate);
        var birthDay = new Date(birthDate);

        currYear = currYear.getFullYear();
        currMonth = currMonth.getMonth() + 1;
        currDay = currDay.getDate();

        birthYear = birthYear.getFullYear(birthDate);
        birthMonth = birthMonth.getMonth(birthDate) + 1;
        birthDay = birthDay.getDate(birthDate);

        if ( (currYear - birthYear > 18)   || ((currYear - birthYear >= 18) && (currMonth - birthMonth >= 0) && (currDay - birthDay >= 0))) {
            result = true;
        } else {
            result = false;
        }
        return result;
    },
    roundToDay: function(date) {
        if(date === undefined || date ==""){
            date = new Date();
        }
        var eDate = new Date();
        eDate.setFullYear(date.getFullYear());
        eDate.setMonth(date.getMonth());
        eDate.setDate(date.getDate());
        eDate.setHours(0);
        eDate.setMinutes(0);
        eDate.setSeconds(0);
        eDate.setMilliseconds(0);

        return eDate;
    },
    getNowMinutes: function() {
        var result = 0;
        var d = new Date();
        result = (d.getHours() * 60) + d.getMinutes();
        return result;
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
        }
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
                        class: "bollardLink",
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
            console.log(handler.serverTime);
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
                    var timeStr = hh + ":" + mm + ":" + ss;
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

        new Ajax.Request('https://www.peka.poznan.pl/vm/method.vm?ts=' + new Date().getTime(), {
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