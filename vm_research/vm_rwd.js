var VM = {
    ver: 1.0
}

/**
 *
 */
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
    /**
     *
     */
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
    /**
     *
     */
    initialize: function(config) {
        this.config = Object.extend({

        }, config || {});

        this.topOffset = 0;
        this.render();
    },
    /**
     *
     */
    render: function() {
        var handler = this;

        handler.bg = new Element("DIV", {
            style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; background-color:transparent; z-index:10000000"
        });
        window.document.body.insert(handler.bg);

        handler.img = new Element("IMG", {
            src: "img/ajax-loader.gif",
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

        this.config.parentHTML.insert(this.contentDiv);

        this.msgDiv = new Element("DIV",{
            style: "width:10000px"
        });
        this.contentDiv.insert(this.msgDiv);
        this.offset = this.contentDiv.getWidth();

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

    animate: function() {
        var handler = this;

        handler.animation = setInterval(function () {
            handler.offset -= 1;
            handler.msgDiv.setStyle({
                marginLeft: handler.offset + 'px'
            });

            if (handler.offset < (0 - handler.msgDivWidth)) {
                window.clearInterval(handler.animation);
                handler.offset = handler.contentDiv.getWidth();
                handler.msgDiv.descendants().each(function(elem) {
                    Element.remove(elem);
                });
                handler.renderMessages();
            };

        }, 25);
    },

    isMsgValid:function(msg) {
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
    /**
     *
     */
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

        window.document.body.observe("mouseup", function() {
            handler.hideEverything();
        });

        this.bollards = new VM.VMList({
            title: "Przystanki",
            parentHTML: handler.config.search,
            top: 20,
            zIndex: 1000,
            placeholder: "wpisz nazwę przystanku",
            render: function(bean) {
                var result = "";
                result = bean.name;
                return result;
            },
            find: function(pattern) {
                var dao = new VM.DAO({
                    onSuccess: function(bollards) {
                        handler.bollards.fetchData(bollards);
                    }
                });
                dao.getStopPoints({
                    pattern: pattern
                });
            },
            subFind: function(bean) {
                var dao = new VM.DAO({
                    onSuccess: function(model) {
                        handler.bollards.fetchSubDataAsString(model);
                    }
                });
                dao.getBollardsByStopPoint({
                    name: bean.name
                });
            },
            onAllSelect: function(bean) {
                handler.topOffset = 0;
                handler.loadTimesForAllBollards(bean);
            },
            onSelect: function(bean) {
                handler.topOffset = 0;
                handler.loadTimes(bean.tag);

                handler.loadMessages(bean.tag);
            },
            hint: handler.config.hints.stopPoint
        });

        this.streets = new VM.VMList({
            title: "Ulice",
            parentHTML: handler.config.search,
            top: 55,
            zIndex: 2000,
            placeholder: "wpisz ulicę lub miejscowość",
            render: function(bean) {
                var result = "";
                result = "" + bean.name;
                return result;
            },
            find: function(pattern) {
                var dao = new VM.DAO({
                    onSuccess: function(bollards) {
                        handler.streets.fetchData(bollards);
                    }
                });
                dao.getStreets({
                    pattern: pattern
                });
            },
            subFind: function(bean) {
                var dao = new VM.DAO({
                    onSuccess: function(model) {
                        handler.streets.fetchSubDataAsString(model);
                    }
                });
                dao.getBollardsByStreet({
                    name: bean.name
                });
            },
            onSelect: function(bean) {
                handler.topOffset = 0;
                handler.loadTimes(bean.tag);

                handler.loadMessages(bean.tag);
            },
            hint: handler.config.hints.street
        });

        this.lines = new VM.VMList({
            title: "Linie",
            parentHTML: handler.config.search,
            placeholder: "wpisz numer linii",
            top: 90,
            zIndex: 3000,
            orientation: "horizontal",
            render: function(bean) {
                var result = "";
                result = "" + bean.name;
                return result;
            },
            find: function(pattern) {
                var dao = new VM.DAO({
                    onSuccess: function(bollards) {
                        handler.lines.fetchData(bollards);
                    }
                });
                dao.getLines({
                    pattern: pattern
                });
            },
            subFind: function(bean) {
                var dao = new VM.DAO({
                    onSuccess: function(model) {
                        handler.lines.fetchSubData(model);
                    }
                });
                dao.getBollardsByLine({
                    name: bean.name
                });
            },
            onSelect: function(bean) {
                handler.topOffset = 0;
                handler.loadTimes(bean.tag);

                handler.loadMessages(bean.tag);
            },
            hint: handler.config.hints.line
        });

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
    /**
     *
     */
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
    /**
     *
     */
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
    /**
     *
     */
    loadMessages: function (symbol) {
        var handler = this;

        var messageDao = new VM.DAO({
            onSuccess: function(model) {
                handler.messages.setMessages(model);
            }
        });
        messageDao.findMessagesForBollard({
            symbol: symbol
        });
    },
    /**
     *
     */
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
    /**
     *
     */
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
    /**
     *
     */
    addRow: function(index, time) {
        var handler = this;
        var html = new Element("DIV", {
            class: "row"
        });

//        	Definiowanie nr lini
        var lineHTML = new Element("DIV", {
            class: "line"
        });
        lineHTML.update(time.line);
        html.insert(lineHTML);

//        	Definiowanie czasu odjazdu
        var timeHTML = new Element("DIV", {
            class: "time"
        });

        if (time.realTime === undefined || time.realTime === false) {
            timeHTML.update(handler.du.formatTime(handler.du.parseDate(time.departure)));
        } else {
            timeHTML.update(time.minutes + " min ");
        }

        html.insert(timeHTML);

        if (time.realTime === true && time.minutes == 0) {
            timeHTML.update("<1 min");
            timeHTML.addClassName("blink");
        }

//          Definiowanie dodatkowych informacji
        var additionalInfoHTML = new Element("DIV", {
            class: "additional-info"
        });

        html.insert(additionalInfoHTML);

        // autobus niskopodłogowy
        if (time.lowFloorBus !== undefined && time.lowFloorBus == true) {
            var lowFloor = new Element("SPAN", {
                class: "border-5"
            });
            lowFloor.update("NP");
            additionalInfoHTML.insert(lowFloor);
        }

        // biletomat
        if (time.ticketMachine !== undefined && time.ticketMachine == true) {
            var ticketMachine = new Element("SPAN", {
                class: "border-5"
            });
            ticketMachine.update("BM");
            additionalInfoHTML.insert(ticketMachine);
        }

        // bileterka
        if (time.driversTicketMachine !== undefined && time.driversTicketMachine == true) {
            var driverTicketMachine = new Element("SPAN", {
                class: "border-5"
            });
            driverTicketMachine.update("B");
            additionalInfoHTML.insert(driverTicketMachine);
        }


//          Definiowanie kierunku
        var directionHTML = new Element("DIV", {
            class: "direction"
        });
        directionHTML.update(time.direction);
        html.insert(directionHTML);

        handler.config.times.insert(html);

        if (handler.debug == true) {
            var debugDetails = new Element("DIV",{
                class: "debugDetails"
            });

            var dbg = time.debug;

            var debugStr = "Linia:&emsp;" + dbg.line +
                "<br/>Kierunek:&emsp;" + dbg.destination +
                "<br/>Nr boczny:&emsp;" + dbg.vehicle +
                "<br/>Nr kursu:&emsp;" + dbg.courseId +
                "<br/>Opóźnienie:&emsp;" + dbg.deviation + " min" +
                "<br/>Planowy przyjazd:&emsp;" + dbg.scheduledExitTime +
                "<br/>Prognozowany przyjazd:&emsp;" + dbg.estimatedExitTime ;

            debugDetails.update(debugStr);
            html.insert(debugDetails);
        }


    },
    /**
     *
     */
    copyToClipboard: function(text) {
        var response = prompt("Naciśnij Ctrl+C aby skopiować link.", text);
        if (response !== undefined && response == text) {
            var state = {
                "canBeAnything": true
            };
            history.pushState(state, document.title, "/vm/?przystanek=" + text.substring(text.indexOf("=") + 1));
        }
    },
    /**
     *
     */
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
                console.log(mils);
                handler.serverTime.setTime(mils);
                console.log(handler.serverTime);
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
    },

    showFaq: function() {
        var handler = this;

        this.faqDiv = new Element("DIV", {
            class: "faqDiv"
        });

        window.document.body.insert(handler.faqDiv);

        var close = new Element("DIV", {
            class: "faqClose"
        }) ;

        close.update("X");

        this.faqDiv.insert(close);

        close.observe("click", function(){
            handler.faqDiv.remove();
        });

        var faqContent = new Element("DIV",{
            class: "faqContent"
        });

        this.faqDiv.insert(faqContent);

        faqContent.update("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae velit ac lacus rhoncus efficitur. Ut imperdiet lorem ac diam tincidunt mattis. Donec facilisis, nunc in eleifend laoreet, est turpis laoreet turpis, euismod varius tellus lacus id est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris vel orci ac elit venenatis aliquam. Vestibulum libero metus, bibendum id massa rutrum, cursus iaculis massa. Phasellus ipsum est, posuere et blandit ut, pulvinar vitae nibh. Aliquam consectetur arcu id ante vestibulum, eget iaculis est placerat. Pellentesque placerat nisl quis aliquam euismod. Integer arcu justo, sollicitudin eget augue non, dapibus luctus metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec feugiat semper metus egestas congue. Pellentesque vel auctor leo. Quisque diam sem, tempus non dui nec, placerat cursus arcu. Vestibulum libero velit, vehicula in erat non, scelerisque convallis turpis. Sed sodales risus at urna consectetur feugiat.Phasellus ligula nunc, luctus ac felis eu, consectetur luctus dui. Curabitur vehicula erat ac interdum tincidunt. Nulla pellentesque massa odio, quis ultrices odio fringilla non. Vivamus venenatis sapien nec arcu mattis, a hendrerit dolor rhoncus. Integer tristique mauris in lorem eleifend tempor. Cras odio mi, suscipit vel ullamcorper fermentum, blandit id ipsum. Phasellus suscipit lacus risus, vel porta ex viverra efficitur.Fusce sollicitudin egestas nisi, rutrum sodales ligula tempor sed. Vestibulum eget mi eget tortor rutrum mattis. Praesent eget ipsum sagittis, faucibus lectus ut, pharetra ex. Phasellus ex ipsum, rutrum quis rhoncus nec, ornare eu purus. Aenean non iaculis mauris. Curabitur vulputate magna at bibendum ornare. Proin blandit et orci id pretium. Aliquam urna nulla, fringilla vitae justo nec, porta posuere ligula. In rhoncus elit sed felis commodo, non facilisis magna vestibulum. Suspendisse sit amet dolor gravida nisl placerat lacinia sit amet a lectus. Etiam tempus semper erat blandit euismod. Proin auctor dignissim sem, eget feugiat sem ullamcorper non. Fusce at libero aliquam, lacinia velit posuere, vehicula diam.Nunc nulla nisl, vestibulum ac ultricies gravida, efficitur eget magna. In suscipit pellentesque tortor, ut auctor diam pharetra a. Sed egestas justo quis ante lacinia, sit amet tristique libero convallis. In hac habitasse platea dictumst. Praesent et elit urna. Sed molestie, tortor ut lacinia sodales, velit diam ornare nunc, ut fringilla velit purus a mauris. Suspendisse potenti. Donec sed nisl tincidunt, auctor ligula et, dapibus justo. Aenean aliquet efficitur dui, at tristique sem tincidunt quis. Duis finibus nulla sem, eget dictum ex viverra a.Mauris commodo efficitur erat et egestas. Nunc vestibulum tristique diam non sollicitudin. Nunc nec tellus eu ex iaculis iaculis eu eu felis. Nulla eleifend scelerisque ultrices. In cursus porttitor mi, quis feugiat neque bibendum vestibulum. Vivamus sed pharetra tortor. Quisque blandit vulputate risus, ac blandit leo finibus cursus. Nunc urna elit, euismod sed urna non, facilisis mollis ante. In quis dui ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae velit ac lacus rhoncus efficitur. Ut imperdiet lorem ac diam tincidunt mattis. Donec facilisis, nunc in eleifend laoreet, est turpis laoreet turpis, euismod varius tellus lacus id est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris vel orci ac elit venenatis aliquam. Vestibulum libero metus, bibendum id massa rutrum, cursus iaculis massa. Phasellus ipsum est, posuere et blandit ut, pulvinar vitae nibh. Aliquam consectetur arcu id ante vestibulum, eget iaculis est placerat. Pellentesque placerat nisl quis aliquam euismod. Integer arcu justo, sollicitudin eget augue non, dapibus luctus metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec feugiat semper metus egestas congue. Pellentesque vel auctor leo. Quisque diam sem, tempus non dui nec, placerat cursus arcu. Vestibulum libero velit, vehicula in erat non, scelerisque convallis turpis. Sed sodales risus at urna consectetur feugiat.Phasellus ligula nunc, luctus ac felis eu, consectetur luctus dui. Curabitur vehicula erat ac interdum tincidunt. Nulla pellentesque massa odio, quis ultrices odio fringilla non. Vivamus venenatis sapien nec arcu mattis, a hendrerit dolor rhoncus. Integer tristique mauris in lorem eleifend tempor. Cras odio mi, suscipit vel ullamcorper fermentum, blandit id ipsum. Phasellus suscipit lacus risus, vel porta ex viverra efficitur.Fusce sollicitudin egestas nisi, rutrum sodales ligula tempor sed. Vestibulum eget mi eget tortor rutrum mattis. Praesent eget ipsum sagittis, faucibus lectus ut, pharetra ex. Phasellus ex ipsum, rutrum quis rhoncus nec, ornare eu purus. Aenean non iaculis mauris. Curabitur vulputate magna at bibendum ornare. Proin blandit et orci id pretium. Aliquam urna nulla, fringilla vitae justo nec, porta posuere ligula. In rhoncus elit sed felis commodo, non facilisis magna vestibulum. Suspendisse sit amet dolor gravida nisl placerat lacinia sit amet a lectus. Etiam tempus semper erat blandit euismod. Proin auctor dignissim sem, eget feugiat sem ullamcorper non. Fusce at libero aliquam, lacinia velit posuere, vehicula diam.Nunc nulla nisl, vestibulum ac ultricies gravida, efficitur eget magna. In suscipit pellentesque tortor, ut auctor diam pharetra a. Sed egestas justo quis ante lacinia, sit amet tristique libero convallis. In hac habitasse platea dictumst. Praesent et elit urna. Sed molestie, tortor ut lacinia sodales, velit diam ornare nunc, ut fringilla velit purus a mauris. Suspendisse potenti. Donec sed nisl tincidunt, auctor ligula et, dapibus justo. Aenean aliquet efficitur dui, at tristique sem tincidunt quis. Duis finibus nulla sem, eget dictum ex viverra a.Mauris commodo efficitur erat et egestas. Nunc vestibulum tristique diam non sollicitudin. Nunc nec tellus eu ex iaculis iaculis eu eu felis. Nulla eleifend scelerisque ultrices. In cursus porttitor mi, quis feugiat neque bibendum vestibulum. Vivamus sed pharetra tortor. Quisque blandit vulputate risus, ac blandit leo finibus cursus. Nunc urna elit, euismod sed urna non, facilisis mollis ante. In quis dui ante. ");
    },
    /**
     *
     */
    debugMode: function() {
        var handler = this;
        handler.debug = true;
    }


});
