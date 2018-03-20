/**
 *
 */
VM.DAO = Class.create({
    /**
     *
     */
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

    /*
     * Metoda generyczna
     */
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

        new Ajax.Request('method.vm?ts=' + new Date().getTime(), {
            method: 'POST',
            parameters: params,
            onSuccess: function(transport) {
                var response = transport.responseText || "no response text";
                if (response.indexOf("Copyright AMG.net 2012 LOGIN PAGE") != -1) {
                    window.location.href = window.location.href;
                } else {
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
                }
            },
            onFailure: function(s) {
                progress.close();

                var response = transport.responseText || "no response text";

                if (response.indexOf("Copyright AMG.net 2012 LOGIN PAGE") != -1) {
                    window.location.href = window.location.href;

                    return;
                }
            }
        });
    }
});