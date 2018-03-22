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

VM.Scrollbox = Class.create({
    initialize: function(config) {
        this.config = Object.extend({}, config || {});
        this.offset = 0;
        this.render();
    },
    render: function() {
        var handler = this;
        this.contentDiv = new Element("DIV",{
            style: handler.config.style
        });

        this.renderMessages();
    },
    renderMessages: function() {
        var handler = this;
        this.msgDivWidth = 0;
        if(this.messages !== undefined) {
            var msgCount = this.messages.length;
            for(var i=0; i < msgCount; i++) {
                if(this.isMsgValid(handler.messages[i])) {
                    var msg = new Element("P",
                        {
                            style: "white-space: nowrap;" + this.config.textStyle
                        });
                    handler.msgDiv.insert(msg);
                    msg.update(handler.messages[i].content);
                    handler.msgDivWidth += (msg.getWidth() + 1);
                }
            }

            this.msgDiv.setStyle({
                width: (this.msgDivWidth) + 'px',
                marginLeft: this.offset + 'px'
            });

            this.animate();
        }
    },
    isMsgValid: function(msg) {
        var currentDate = new Date();
        var endDate = new Date(msg.endDate);
        var endDate = new Date(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate(),  endDate.getUTCHours(), endDate.getUTCMinutes(), endDate.getUTCSeconds());
        var startDate = new Date(msg.startDate);
        var startDate = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(),  startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds());

        if ((currentDate.getTime() < startDate.getTime()) || (currentDate.getTime() > endDate.getTime()) ) {
            return false;
        } else {
            return true
        }
    },
    setMessages: function(messages) {
        var handler = this;
        this.messages = messages;

        if(handler.animation !== undefined) {
            window.clearInterval(handler.animation);
            handler.offset = handler.contentDiv.getWidth();
            handler.msgDiv.descendants().each(function(elem) {
                Element.remove(elem);
            });
        }

        this.renderMessages();
    }
});

VM.Coordinator = Class.create({
    initialize: function(config) {
        this.config = Object.extend({

        }, config || {});

        this.du = new VM.DateUtils();
        this.debug = false;

        this.updateTime();
        this.render();
    },
    hideEverything: function() {
        this.bollards.hide();
        this.streets.hide();
        this.lines.hide();
    },
    render: function() {
        var handler = this;
        var refreshFun = function() {

            handler.topOffset = handler.config.times.scrollTop;

            if (handler.selectedStopPoint !== undefined)  {
                handler.loadTimesForAllBollards(handler.selectedStopPoint);
            } else if (handler.selectedSymbol !== undefined) {
                handler.loadTimes(handler.selectedSymbol);
            }
        }

        handler.intervalRefresh = setInterval(refreshFun, 20000);

        this.messages = new VM.Scrollbox({
            parentHTML: handler.config.messages,
            style: "width: 100%; height: 35px; overflow:hidden;",
            textStyle: "diplay:block; float:left; margin:5px 0 0 0; padding-left:20px; text-transform:uppercase; color:red; font-weight:bold; font-size:1.2em;"
        }) ;

        if (this.config.faq !== undefined) {
            var faq = this.config.faq;
            faq.update("F.A.Q.");
            faq.observe("click", function(){
                handler.showFaq();
            });
        }
    },
    loadTimes: function(symbol) {
        var handler = this;

        if(handler.selectedStopPoint !== undefined) {
            delete handler.selectedStopPoint;
        }

        handler.selectedSymbol = symbol;

        handler.config.times.update("");

        this.renderHeader();

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

                handler.link.stopObserving('click');
                handler.link.observe("click", function(event) {
                    Event.stop(event);
                    handler.copyToClipboard(location.host + location.pathname + "?przystanek=" + model.bollard.symbol.replace(/ /g,"_"));

                });

                handler.config.search.insert(handler.link);

                handler.config.times.scrollTop = handler.topOffset;
            }
        });
        dao.getTimes({
            symbol: handler.selectedSymbol
        });
    },
    loadTimesForAllBollards: function(stopPoint) {
        var handler = this;

        if(handler.selectedSymbol !== undefined) {
            delete handler.selectedSymbol;
        }

        handler.selectedStopPoint = stopPoint;

        handler.config.times.update("");
        handler.config.title.update("");
        if(handler.link !== undefined) {
            handler.link.update("");
        }

        var dao = new VM.DAO({
            onSuccess: function(model) {
                var bollards = model.bollardsWithTimes;
                handler.config.title.update(bollards[0].bollard.name);
                for(var i=0; i<bollards.length; i++) {
                    handler.renderAllBollardsHeader(bollards[i].bollard)
                    for(var j=0; j<bollards[i].times.length; j++) {
                        handler.addRow(j,bollards[i].times[j]);
                    }
                }
                handler.config.times.scrollTop = handler.topOffset;
            }
        });

        dao.getTimesForAllBollards({
            name: stopPoint.name
        });
    },
    renderAllBollardsHeader: function (bollard) {
        var handler = this;

        var row = new Element("DIV", {
            class: "listRowAllBollardsHead"
        });

        row.update("<text style='color:black'>Nazwa: </text>" + bollard.name + "<br /><text style='color:black'>Symbol: </text>" + bollard.tag);
        handler.config.times.insert(row);

        var html = new Element("DIV", {
            class: "timesHeader",
            style: "margin-top:0"
        });
        var lineHTML = new Element("DIV", {
            class: "line"
        });
        lineHTML.update("Linia");
        html.insert(lineHTML);

        var timeHTML = new Element("DIV", {
            class: "time"
        });
        timeHTML.update("Odjazd");

        var questionmark = new Element("IMG",{
            src: "img/question-blue_question_mark_clip_art.jpg",
            class: "blueQuestionmark"
        });
        timeHTML.insert(questionmark);

        var hintDetails = new Element("DIV", {
            class: "blueQuestionmarkHintDetails"
        });

        hintDetails.update(handler.config.hints.departure);

        timeHTML.insert(hintDetails);

        questionmark.observe("mouseover", function(){
            hintDetails.addClassName("displayBlock");
        });

        questionmark.observe("mouseout", function(){
            hintDetails.removeClassName("displayBlock");
        });

        html.insert(timeHTML);

        var directionHTML = new Element("DIV", {
            class: "direction"
        });
        directionHTML.update("Kierunek");
        html.insert(directionHTML);

        handler.config.times.insert(html);
    },
    renderHeader: function () {
        var handler = this;

        var html = new Element("DIV", {
            class: "timesHeader"
        });
        var lineHTML = new Element("DIV", {
            class: "line"
        });
        lineHTML.update("Linia");
        html.insert(lineHTML);

        var timeHTML = new Element("DIV", {
            class: "time"
        });
        timeHTML.update("Odjazd");

        var questionmark = new Element("IMG",{
            src: "img/question-blue_question_mark_clip_art.jpg",
            class: "blueQuestionmark"
        });
        timeHTML.insert(questionmark);

        this.hintDetails = new Element("DIV", {
            class: "blueQuestionmarkHintDetails"
        });

        this.hintDetails.update(handler.config.hints.departure);

        timeHTML.insert(this.hintDetails);

        questionmark.observe("mouseover", function(){
            handler.hintDetails.addClassName("displayBlock");
        });

        questionmark.observe("mouseout", function(){
            handler.hintDetails.removeClassName("displayBlock");
        });

        html.insert(timeHTML);

        var directionHTML = new Element("DIV", {
            class: "direction"
        });
        directionHTML.update("Kierunek");
        html.insert(directionHTML);

        handler.config.times.insert(html);
    },
    updateTime: function() {
        var handler = this;
        handler.clock = handler.config.clock;

        handler.clockTime = new Element("P", {
            class: "clockTime"
        });

        handler.clockDate = new Element("P", {
            class: "clockDate"
        });

        handler.clock.insert(handler.clockTime);
        handler.clock.insert(handler.clockDate);

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

                    var month = handler.serverTime.getMonth() + 1;
                    if (month < 10) {
                        month = "0" + String(month);
                    }
                    var day = handler.serverTime.getDate();
                    if (day < 10) {
                        day = "0" + String(day);
                    }
                    var year = handler.serverTime.getFullYear();

                    var dateStr = day + "." + month + "." + year;
                    handler.clockDate.update(dateStr);

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