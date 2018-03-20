/**
 *
 */
VM.VMList = Class.create({
    /*
     *
     */
    initialize: function(config) {
        this.config = Object.extend({
            top: 10,
            left: 10,
            zIndex: 1000,
            orientation: "vertical"			// moze byc tez horizontal
        }, config || {
            top: 10,
            left: 10,
            zIndex: 1000,
            orientation: "vertical"			// moze byc tez horizontal
        });

        this.render();
    },
    /**
     *
     */
    render: function() {
        var handler = this;

        this.bg = new Element("DIV", {
            class: "searchRow"
        });

        this.input = new Element("INPUT", {
            class: "searchInput",
            placeholder: handler.config.placeholder
        });

        this.title = new Element("DIV", {
            class: "searchTitle"
        });

        this.hint = new Element("DIV", {
            class: "searchHint"
        });

        this.title.update(handler.config.title);

        this.bg.insert(this.input);
        this.bg.insert(this.title);
        this.bg.insert(this.hint);

        if(handler.config.hint !== undefined) {
            this.questionmark = new Element("DIV", {
                class: "searchQuestionmark"
            });
            this.questionmark.update("?");
            this.hint.insert(this.questionmark);

            this.hintDetails = new Element("DIV", {
                class: "searchHintDetails"
            });

            this.hintDetails.update(handler.config.hint);

            this.bg.insert(this.hintDetails);

            this.questionmark.observe("mouseover", function(){
                handler.hintDetails.addClassName("displayBlock");
            });

            this.questionmark.observe("mouseout", function(){
                handler.hintDetails.removeClassName("displayBlock");
            });
        }

        this.config.parentHTML.insert(this.bg);

        this.input.observe("focus", function() {
            handler.config.find(handler.input.value);
        });

        this.input.observe("click", function() {
            handler.config.find(handler.input.value);

            $$('input.searchInput').each( function(input) {
                input.setValue("");
            });

        });

        this.input.observe("keyup", function() {
            handler.config.find(handler.input.value);
        });

        this.list = new Element("DIV", {
            class: "searchList",
            style: "z-index:" + handler.config.zIndex
        });

        this.list.observe("mouseover", function(e) {
            e.cancelBubble = true;
            return false;
        });
        this.list.observe("mouseup", function(e) {
            e.cancelBubble = true;
            return false;
        });

        this.sublist = new Element("DIV", {
            class: "searchSublist",
            style: "z-index:" + handler.config.zIndex
        });
        this.sublist.observe("mouseover", function(e) {
            e.cancelBubble = true;
            return false;
        });
        this.sublist.observe("mouseup", function(e) {
            e.cancelBubble = true;
            return false;
        });

        this.bg.insert(this.list);
        this.bg.insert(this.sublist);
    },
    /**
     *
     */
    fetchData: function(elements) {
        var handler = this;

        this.background = new Element("DIV", {
            style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; background-color:black; opacity:0.1"
        });

        this.list.update("");
        this.sublist.update("");

        this.list.setStyle({
            zIndex: 1000,
            border: "1px solid gray",
            backgroundColor: "white"
        });

        var i=0;
        for (i=0; i<elements.length; i++) {
            var row = new Element("DIV", {
                class: "listRow"
            });
            row.bean = elements[i];

            row.observe("click", function(e) {
                if (handler.config.onSelect !== undefined) {
                    handler.sublist.setStyle({
                        top: (e.element().positionedOffset().top + 24) + "px"
                    });

                    if (handler.config.subFind) {
                        handler.input.setValue(e.element().bean.name);
                        handler.config.subFind(e.element().bean);
                        handler.stopPointBean = e.element().bean;
                    }
                }
            });
            row.update(this.config.render(elements[i]));
            handler.list.insert(row);
        }
    },
    /**
     *
     */
    fetchSubData: function(model) {
        var handler = this;

        this.sublist.update("");

        this.sublist.setStyle({
            zIndex: 1000,
            border: "1px solid gray",
            backgroundColor: "white"
        });

        if (handler.config.orientation == "vertical") {
            var i=0;
            for (i=0; i<model.bollards.length; i++) {
                var row = new Element("DIV", {
                    class: "listRowHead"
                });

                row.update("<text style='color:black'>Nazwa: </text>" + model.bollards[i].bollard.name + "<br /><text style='color:black'>Symbol: </text>" + model.bollards[i].bollard.tag);

                handler.sublist.insert(row);

                var k=0;
                for (k=0; k<model.bollards[i].directions.length; k++) {
                    var rowdir = new Element("DIV", {
                        class: "subListRow",
                        style: "padding-left:20px; cursor:pointer;"
                    });

                    rowdir.bean = model.bollards[i].bollard;
                    var lineNo = model.bollards[i].directions[k].lineName;
                    if(lineNo.length == 2) {
                        lineNo = "0" + lineNo;
                    } else if (lineNo.length == 1) {
                        lineNo = "00" + lineNo;
                    }
                    rowdir.update(lineNo + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + model.bollards[i].directions[k].direction);

                    rowdir.observe("click", function(e) {
                        if (handler.config.onSelect !== undefined) {
                            handler.config.onSelect(e.element().bean);
                        }
                        handler.hide();
                    });

                    handler.sublist.insert(rowdir);
                }
            }
        } else {
            handler.sublist.style.width = "" + (model.directions.length * 244 + 20) + "px";

            var i=0;
            for (i=0; i<model.directions.length; i++) {

                var column = new Element("DIV", {
                    style: "width:244px; float:left; overflow:hidden"
                });

                handler.sublist.insert(column);

                var row = new Element("DIV", {
                    class: "listRowHead"
                });

                row.update("<text style='color:black'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linia : </text>" + model.directions[i].direction.lineName + "<br /><text style='color:black'>Kierunek : </text>" + model.directions[i].direction.direction);

                column.insert(row);

                var k=0;
                for (k=0; k<model.directions[i].bollards.length; k++) {
                    var rowdir = new Element("DIV", {
                        class: "listRow",
                        style: "color:gray; padding-left:3px"
                    });
                    rowdir.bean = model.directions[i].bollards[k];
                    rowdir.update(model.directions[i].bollards[k].name);

                    rowdir.observe("click", function(e) {
                        if (handler.config.onSelect !== undefined) {
                            handler.config.onSelect(e.element().bean);
                        }
                        handler.hide();
                    });
                    column.insert(rowdir);
                }
            }
        }
    },
    /**
     *
     */
    fetchSubDataAsString: function(model) {
        console.log(model);
        var handler = this;

        this.sublist.update("");

        this.sublist.setStyle({
            zIndex: 1000,
            border: "1px solid gray",
            backgroundColor: "white"
        });

        if (handler.config.orientation == "vertical") {
            if(handler.config.onAllSelect !== undefined) {
                var displayAll = new Element("DIV",{
                    class: "displayAll"
                }).update("Wszystkie linie");
                handler.sublist.insert(displayAll);

                displayAll.observe("click", function(e) {
                    if (handler.config.onAllSelect !== undefined) {
                        handler.config.onAllSelect(handler.stopPointBean);
                    }
                    handler.hide();
                });
            }

            var i=0;
            for (i=0; i<model.bollards.length; i++) {
                var row = new Element("DIV", {
                    class: "listRowHead"
                });

                row.update("<text style='color:black'>Nazwa: </text>" + model.bollards[i].bollard.name + "<br /><text style='color:black'>Symbol: </text>" + model.bollards[i].bollard.tag);

                handler.sublist.insert(row);

                var rowdir = new Element("DIV", {
                    class: "subListRow",
                    style: "padding-left:20px; cursor:pointer;"
                });

                rowdir.bean = model.bollards[i].bollard;

                var string = "";

                var k=0;
                for (k=0; k<model.bollards[i].directions.length; k++) {

                    string += model.bollards[i].directions[k].lineName;
                    string += " -> ";
                    string +=  model.bollards[i].directions[k].direction;

                    if(k < (model.bollards[i].directions.length - 1)) {
                        string += ", ";
                    }
                }

                rowdir.update(string);

                rowdir.observe("click", function(e) {
                    if (handler.config.onSelect !== undefined) {
                        handler.config.onSelect(e.element().bean);
                    }
                    handler.hide();
                });

                handler.sublist.insert(rowdir);
            }
        }
    },
    /**
     *
     */
    hide: function() {
        this.list.update("");
        this.list.setStyle({
            border: "1px solid transparent",
            backgroundColor: "transparent"
        });
        this.sublist.update("");
        this.sublist.setStyle({
            border: "1px solid transparent",
            backgroundColor: "transparent"
        });
    }
});