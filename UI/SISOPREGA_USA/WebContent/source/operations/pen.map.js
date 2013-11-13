enyo
	.kind({
	    name : "pen.map",
	    arrOptions : [ {
		caption : "Mover Ganado",
		value : 1
	    }, {
		caption : "Alimento",
		value : 2
	    }, {
		caption : "Merma",
		value : 3
	    } ],
	    arrMovingPen : [ {
		caption : "Mover aqui",
		value : 4
	    }, ],
	    style : "background-color:#DABD8B;",
	    kind : enyo.VFlexBox,
	    last : null,
	    flex : 1,
	    arrByMOver : {},
	    objSelected : null,
	    arrSelected : {},
	    arrSelectedOccupied : {},
	    arrBYbyRancherSelected : {},
	    sColorOccupied : "#ff7200",
	    sColorFree : "white",
	    sColorSelect : "lightgreen",
	    sColorSelectOccupied : "#9b7eb1",
	    movingPen : false,
	    movingFrom : null,
	    movingTo : null,
	    className : "mapBG",
	    sColorToolbarFont:"#FFFF00",
	    create : function() {
		this.inherited(arguments);
	    },

	    components : [ {
		kind : enyo.Popup,
		name : "popup_movePen",
		width : "50%;",
		height : "300px;",
		dismissWithClick : false,
		layoutKind : "VFlexLayout",
		style : "overflow : hiddin; border-with:8px;",
		scrim : true,
		components : [ {
		    kind : "movePen",
		    name : "movePen_kind",
		    onCancel : "cancelMoving",
		    onGuardar : "saveMoving",
		    flex : 1
		} ]
	    }, {
		kind : enyo.Popup,
		name : "popup_alimentoUS",
		width : "50%;",
		height : "140px;",
		dismissWithClick : false,
		layoutKind : "VFlexLayout",
		style : "overflow : hiddin; border-with:8px;",
		scrim : true,
		components : [ {
		    kind : "alimentoUS",
		    name : "alimento_kind",
		    onCancel : "cancelFeed",
		    onGuardar : "saveFeed",
		    flex : 1
		} ]
	    }, {
		kind : enyo.Popup,
		name : "popup_corte",
		width : "50%;",
		height : "225px;",
		dismissWithClick : false,
		layoutKind : "VFlexLayout",
		style : "overflow : hiddin; border-with:8px;",
		scrim : true,
		components : [ {
		    kind : "corte",
		    name : "corte_kind",
		    onCancel : "cancelCorte",
		    onGuardar : "saveCorte",
		    flex : 1
		} ]
	    },

	    {
		kind : enyo.BasicScroller,
		flex : 1,
		components : [ {
		    name : "options",
		    kind : enyo.PopupSelect,
		    onSelect : "actionSelected",
		    items : []
		}, {

		    name : "cells",
		    kind : "VFlexBox",
		    align : "center",
		    pack : "center"

		} ],
	    }, {
		kind : enyo.Toolbar,
		name : "toolbar",
		pack : "center",
		align : "center",
		components : [ {
		    kind : "HFlexBox",
		    name : "lblInfo",
		    style : "color : white;",
		    pack : "center",
		    align : "center",
		    allowHtml : true,
		    flex : 1,
		    components:[
                        
                        {
                            content : "Seleccione el corral destino",                            
                            name:"lblMovingComment",
                            style : "text-align: right;margin-right:10px;"
                        },
                        {
                            content : "Ganado:",
                            name:"lblCattle",
                            style : "text-align: right;margin-right:10px;"
                        }, {
                            kind : "ToolInput",                            
                            name : "txtQuality",
                            hint : '',
                            width: "170px",
                            disabled:true ,
                            style:"text-align:center"
                            
                        },
                        {
                            kind : "ToolInput",                            
                            name : "txtQuantity",                            
                            hint : '',
                            width: "90px",
                            disabled:true,
                            style:"text-align:right"
                        },
                         {
                            kind : "ToolInput",                            
                            name : "txtWeight",
                            hint : '',
                            width: "110px",
                            disabled:true,
                            style:"text-align:right"
                        },                         
                        {
                            content : "Ultimo Alimento:",
                            name:"lblLastFeed",
                            width : "110px",
                            style : "text-align: right;margin-right:10px;"
                        }, 
                        {
                            kind : "ToolInput",                            
                            name : "txtLastFeedDate",                            
                            hint : '',
                            width: "160px",
                            disabled:true,
                            style:"text-align:right"
                        },{
                            kind : "ToolInput",                            
                            name : "txtLastFeed",                            
                            hint : '',
                            width: "90px",
                            disabled:true,
                            style:"text-align:center"
                        },{
                            content : "Total Alimento:",
                            name:"lblTotalFeed",
                            width : "100px",
                            style : "text-align: right;margin-right:10px;"
                        }, {
                            kind : "ToolInput",                            
                            name : "txtTotalFeed",                            
                            hint : '',
                            width: "90px",
                            disabled:true,
                            style:"text-align:right"
                        },
		                
		                ],		    
		}, {
		    kind : enyo.Button,
		    onclick : "cancelMoving",
		    name : "btnCancelMoving",
		    caption : "Cancelar",
		    showing : false

		} ],

	    }

	    ],	    
	    initializeCells:function(){
		this.last = this.$.cells;
		// this.addRow(true);
		this.addRow();
		this.addRowHeader();
		this.createCells("3A", 1, 4, "50px", "50px", 1);
		this.splitRow();
		this.createCells("4A", 1, 8, "50px", "50px", 1);
		this.splitRow();
		this.createCells("4A", 9, 6, "50px", "50px", 1);
		this.createCells("4A", 15, 1, "100px", "50px", 1);

		this.addRow(true);
		this.createCells("3B", 1, 2, "100px", "50px", 2);
		this.splitRow();
		this.createCells("4B", 1, 4, "100px", "50px", 6);
		this.splitRow();
		this.createCells("4B", 25, 1, "100px", "50px", 2);
		this.createCells("4B", 27, 3, "100px", "50px", 2);

		this.addRow();
		this.createCells("3B", -12, 6, "33.33px", "25px");
		this.splitRow();
		this.createCells("4B", 2, 12, "33.33px", "25px");
		this.splitRow();
		this.createCells("4B", 26, 4, "100px", "25px");

		this.addRow(true);
		this.createCells("3C", 1, 6, "33.33px", "25px");
		this.splitRow();
		this.createCells("4C", 1, 12, "33.33px", "25px");
		this.splitRow();
		this.createCells("4C", 25, 3, "100px", "25px");
		this.createCells("4C", 31, 2, "50px", "25px");

		this.addRow();
		this.createCells("3C", 2, 4, "50px", "50px");
		this.splitRow();
		this.createCells("4C", 2, 2, "50px", "50px");
		this.createCells("4C", 8, 2, "50px", "50px");
		this.createCells("4C", 14, 3, "50px", "50px");
		this.createCells("4C", 22, 1, "50px", "50px");
		this.splitRow();
		this.createCells("4C", 26, 3, "100px", "50px");
		this.createCells("4C", 32, 2, "50px", "50px");

		this.addRow(true);
		this.createCells("3D", 1, 4, "50px", "50px");
		this.splitRow();

		this.createCells("4D", 1, 8, "50px", "50px");
		this.splitRow();
		this.createCells("4D", 17, 8, "50px", "50px");

		this.addRow();
		this.createCells("3D", 2, 4, "50px", "50px");
		this.splitRow();
		this.createCells("4D", 2, 8, "50px", "50px");
		this.splitRow();
		this.createCells("4D", 18, 4, "100px", "50px");
	    },
	    addRow : function(bDiv) {
		if (bDiv) {
		    this.$.cells.createComponent({
			kind : "Divider",
			caption : "",
			style : "margin-left:-15px;width: 1040px;"
		    });
		} else {
		    this.$.cells.createComponent({
			kind : "HFlexBox",
			style : "height:5px;"
		    });
		}
		this.last = objBarn = this.$.cells.createComponent({
		    kind : "HFlexBox"
		});
	    },
	    addRowHeader : function() {
		this.last = objBarn = this.$.cells.createComponent({
		    kind : "HFlexBox"
		});
		this.addCustomCell("alatwo", "<strong>WEST</strong>", "200px",
			"30px", "customBYcellZone");
		this.splitRow();
		this.addCustomCell("alaone", "<strong>EAST</strong>", "765px",
			"30px", "customBYcellZone");
		this.addRefreshButton();
		this.addRow();
	    },
	    addCustomCell : function(sName, sCaption, sWidth, sHeight, sClass) {
		if (!sClass) {
		    sClass = "customBYcell";
		}
		objBarn.createComponent({
		    kind : enyo.Control,
		    className : sClass,
		    allowHtml : true,
		    style : "width:" + sWidth + ";height:" + sHeight + ";"
			    + "text-align: center;" + "vertical-align: middle;"
			    + "background-color:#DABD8B;"
			    + "display: table-cell;",
		    name : sName,
		    content : sCaption,
		}, {
		    owner : this
		});
	    },
	    splitRow : function(sHeight) {
		objBarn = this.last;
		objBarn.createComponent({
		    kind : enyo.Control,
		    style : "width:15px; height:" + sHeight + ";align:center"
		});
	    },
	    addRefreshButton : function(sName, sCaption, sWidth, sHeight,
		    sClass) {
		if (!sClass) {
		    sClass = "customBYcell";
		}
		objBarn
			.createComponent(
				{
				    kind : "IconButton",
				    onclick : "updateView",
				    icon : "../SISOPREGA_WEB_LIB/images/command-menu/menu-icon-music-repeat.png",
				    style : "height:23px; width:45px; padding:0;margin:0px",
				}, {
				    owner : this
				});
	    },	    
	    cellOut : function() {
		for (sKey in this.arrByMOver) {
		    this.$[sKey].removeClass("selectCell");
		}
		this.arrByMOver = {};
	    },
	    cellClick : function(inSender, inEvent) {
		this.objSelected = inSender;
		switch (inSender.occupied) {
		case 0: // Seleccionar corral disponible, 0= corral sin
		    // recepcion y sin seleccion
		    if (this.movingPen) {
			this.movingTo = inSender;
			if (this.movingFrom.name != this.movingTo.name) {
			    this.$.options.setItems(this.arrMovingPen);
			    this.$.options.render();
			    this.$.options.openAtEvent(inEvent);
			}
		    } else {
			this.clearDesc();
			inSender.occupied = 2;
		    }
		    break;
		case 1: // Seleccionar corral ocupado, 1= corral con recepcion y
		    // sin seleccion.
		    if (this.movingPen) {
			this.movingTo = inSender;
			if (this.movingFrom.name != this.movingTo.name) {
			    this.$.options.setItems(this.arrMovingPen);
			    this.$.options.render();
			    this.$.options.openAtEvent(inEvent);
			}
		    } else {
			this.setDesc(inSender.name);
		    }
		    break;
		case 2: // Deseleccionar corral libre, 2= corral sin recepcion
		    // pero seleccionado.

		    delete this.arrSelected[this.objSelected.name];
		    this.objSelected.occupied = 0;
		    this.objSelected.applyStyle("background-color",
			    this.sColorFree);
		    break;

		case 3:// Deseleccionar corral ocupado, 3= corral con recepcion
		    // y seleccionado.
		    delete this.arrSelectedOccupied[this.objSelected.name];
		    this.objSelected.occupied = 1;
		    // this.objSelected
		    // .applyStyle(
		    // "background-color",
		    // cacheReceptions
		    // .getByID(crudPen
		    // .getRecIDbyBY(this.objSelected.name)).color);
		    break;

		}
	    },	    
	    cellHold : function(inSender, inEvent) {
		inEvent.stopPropagation();
		this.objSelected = inSender;
		switch (inSender.occupied) {
		case 0:
		    if (this.movingPen) {
			this.movingTo = inSender;
			if (this.movingFrom.name != this.movingTo.name) {
			    this.$.options.setItems(this.arrMovingPen);
			    this.$.options.render();
			    this.$.options.openAtEvent(inEvent);
			}
		    }
		    break;
		case 1:
		    if (this.movingPen) {
			this.movingTo = inSender;
			if (this.movingFrom.name != this.movingTo.name) {
			    this.$.options.setItems(this.arrMovingPen);
			    this.$.options.render();
			    this.$.options.openAtEvent(inEvent);
			}
		    } else {
			inSender.occupied = 3;
			this.cellHold(inSender, inEvent);
		    }
		    break;
		case 2: // Abrir opciones para corral libre
		    break;
		case 3: // Abrir opciones para corral ocupado
		    this.movingFrom = inSender;
		    this.$.options.setItems(this.arrOptions);
		    this.$.options.render();
		    this.$.options.openAtEvent(inEvent);
		    break;
		}
	    },
	    clearDesc : function() {
		_objMainHeader.setContent("");
	    },	    
	    cancelMoving : function() {
		this.movingPen = false;
		this.$.popup_movePen.close();
		this.showInputs();		
		this.setDesc(this.movingFrom.name);
	    },	    
	    cancelFeed : function() {
		this.$.popup_alimentoUS.close();
	    },
	    saveFeed : function() {
		this.$.popup_alimentoUS.close();
		this.movingTo = this.objSelected;
		cacheMan.showScrim();
		this.updateView();
	    },
	    cancelCorte : function() {
		this.$.popup_corte.close();
	    },
	    saveCorte : function() {
		this.$.popup_corte.close();
		this.movingTo =this.objSelected;
		cacheMan.showScrim();
		this.updateView();
	    },
	    cellOver : function(inSender, inEvent) {
		if (inSender.occupied != 0 && inSender.occupied != 2) {
		    this.highLightReception(cacheBy.inUse()[inSender.name].reception_id);
		}
	    },	    
	    readCount:0,
	    
	    //Below all functions that interact with crudPen:
	    
	    ready : function() {
		this.$.txtQuality.$.input.applyStyle("color",this.sColorToolbarFont);
		this.$.txtQuality.$.input.applyStyle("opacity","1");
		this.$.txtQuality.$.input.applyStyle("-webkit-text-fill-color",this.sColorToolbarFont);
		this.$.txtQuality.$.input.applyStyle("text-align","center");
		this.$.txtQuality.$.input.applyStyle("font-size","13px");
		
		this.$.txtQuantity.$.input.applyStyle("color",this.sColorToolbarFont);
		this.$.txtQuantity.$.input.applyStyle("opacity","1");
		this.$.txtQuantity.$.input.applyStyle("-webkit-text-fill-color",this.sColorToolbarFont);
		this.$.txtQuantity.$.input.applyStyle("text-align","right");
		this.$.txtQuantity.$.input.applyStyle("font-size","13px");
		
		this.$.txtWeight.$.input.applyStyle("color",this.sColorToolbarFont);
		this.$.txtWeight.$.input.applyStyle("opacity","1");
		this.$.txtWeight.$.input.applyStyle("-webkit-text-fill-color",this.sColorToolbarFont);
		this.$.txtWeight.$.input.applyStyle("text-align","right");
		this.$.txtWeight.$.input.applyStyle("font-size","13px");
		
		this.$.txtLastFeedDate.$.input.applyStyle("color",this.sColorToolbarFont);
		this.$.txtLastFeedDate.$.input.applyStyle("opacity","1");
		this.$.txtLastFeedDate.$.input.applyStyle("-webkit-text-fill-color",this.sColorToolbarFont);
		this.$.txtLastFeedDate.$.input.applyStyle("text-align","center");
		this.$.txtLastFeedDate.$.input.applyStyle("font-size","13px");
		
		this.$.txtLastFeed.$.input.applyStyle("color",this.sColorToolbarFont);
		this.$.txtLastFeed.$.input.applyStyle("opacity","1");
		this.$.txtLastFeed.$.input.applyStyle("-webkit-text-fill-color",this.sColorToolbarFont);
		this.$.txtLastFeed.$.input.applyStyle("text-align","right");
		this.$.txtLastFeed.$.input.applyStyle("font-size","13px");
		
		this.$.txtTotalFeed.$.input.applyStyle("color",this.sColorToolbarFont);
		this.$.txtTotalFeed.$.input.applyStyle("opacity","1");
		this.$.txtTotalFeed.$.input.applyStyle("-webkit-text-fill-color",this.sColorToolbarFont);
		this.$.txtTotalFeed.$.input.applyStyle("text-align","right");
		this.$.txtTotalFeed.$.input.applyStyle("font-size","13px");
		
		this.initializeCells();
		this.updateView();		
	    },	    
	    updateView : function() {
		crudInventory.get(this, "readCallBack");		
		cacheMan.showScrim();
	    },
	    readCounter : 0,
	    readCallBack : function() {
		this.readCounter++;
		if (this.readCounter == 1) {
		    this.readCounter = 0;
		    this.movingPen = false;
		    this.showInputs();
		    if(this.movingTo) this.setDesc(this.movingTo.name);
		    this.refreshMap();
		    cacheMan.hideScrim();
		}
	    },
	    createCells : function(sLetter, iStart, iNumber, sWidth, sHeight,
		    iStep) {
		// this.createCells("1E",5,6,"50px","50px");
		objBarn = this.last;		
		for ( var i = 0; i < iNumber; i++) {		    
		    objBarn.createComponent({
			kind : enyo.Control,
			className : "byCell",
			style : "width:" + sWidth + ";height:" + sHeight
				+ ";align:left" + ";background-color:" + this.sColorFree
				+ ";",
			name : sLetter + Math.abs(iStart),
			occupied : 0,
			bBY : true,
			content : sLetter.substr(1) + Math.abs(iStart),
			onclick : "cellClick",
			onmousehold : "cellHold",
		    }, {
			owner : this
		    });
		    iStep = iStep ? iStep : 2;
		    iStart = iStart + iStep;
		}
	    },
	    refreshMap : function() {
		for ( var i = 0, a; (a = this.$.cells.children[i]); i++) {
		    for ( var j = 0, b; (b = a.children[j]); j++) {
			if (b.bBY == true) {
			    this.$[b.name].removeClass("selectCell");
			    if (crudInventory.isPenActiveInInventory(b.name)) {
				this.$[b.name].occupied = 1;
				this.$[b.name].applyStyle("background-color",
					this.sColorOccupied);

			    } else {
				this.$[b.name].occupied = 0;
				this.$[b.name].applyStyle("background-color",
					this.sColorFree);
			    }
			}
		    }
		}
		_objMainHeader.applyStyle("font-size","15px");
	    },
	    setDesc : function(sBY) {
		_objMainHeader.applyStyle("font-size","12px");
		var objInventory = crudInventory.getByPen(sBY);
		if (objInventory) {
		    var objFeed = {dateTime:"",quantity:""};
		    if(objInventory.FeedUS){objFeed=objInventory.FeedUS[objInventory.FeedUS.length-1];}
		    
		    this.$.txtQuality.setValue(crudCattleQuality.getByID(objInventory.qualityId).qualityName);
		    this.$.txtQuantity.setValue(objInventory.heads);
		    this.$.txtWeight.setValue(objInventory.weight + " Lb");
		    this.$.txtLastFeedDate.setValue(objFeed.dateTime.toLocaleString());
		    this.$.txtLastFeed.setValue(objFeed.quantity);
		    this.$.txtTotalFeed.setValue(objInventory.feed);
		    
		} else
		    this.$.lblInfo.setContent("");
	    },
	    highLightReception : function(iRecID) {
		this.arrByMOver = crudPen.getBYbyRecID(iRecID);
		for (sKey in this.arrByMOver) {
		    this.$[sKey].addClass("selectCell");
		}
	    },
	    hideInputs:function(){
		this.$.toolbar.applyStyle("background-color", "#800000");

		this.$.txtQuality.hide();
		this.$.txtQuantity.hide();
		this.$.txtWeight.hide();
		this.$.txtLastFeedDate.hide();
		this.$.txtLastFeed.hide();
		this.$.txtTotalFeed.hide();
		this.$.lblCattle.hide();
		this.$.lblLastFeed.hide();
		this.$.lblTotalFeed.hide();		    
		    
		this.$.lblMovingComment.show();
		
		this.$.btnCancelMoving.show();
	    },
	    showInputs:function(){
		this.$.txtQuality.show();
		this.$.txtQuantity.show();
		this.$.txtWeight.show();
		this.$.txtLastFeedDate.show();
		this.$.txtLastFeed.show();
		this.$.txtTotalFeed.show();
		this.$.lblCattle.show();
		this.$.lblLastFeed.show();
		this.$.lblTotalFeed.show();
		this.$.lblMovingComment.hide();
		this.$.toolbar.applyStyle("background-color", null);		
		this.$.btnCancelMoving.hide();
	    },
	    actionSelected : function(inSender, inEvent) {
		switch (inEvent.value) {
		case 1:
		    this.movingPen = true;
		    this.hideInputs();
		    break;
		case 2:
		    this.$.popup_alimentoUS.validateComponents();
		    this.$.alimento_kind.setObj(crudInventory
			    .getByPen(this.objSelected.name));
		    this.$.popup_alimentoUS.openAtCenter();
		    break;
		case 3:
		    this.$.popup_corte.validateComponents();
		    this.$.corte_kind.setObj(crudInventory
			    .getByPen(this.objSelected.name));
		    this.$.popup_corte.openAtCenter();
		    break;
		case 4: //Move cattle of pen		    
		    var objFrom = crudInventory.getByPen(this.movingFrom.name);
		    if(objFrom)
			objFrom = enyo.clone(objFrom);
		    var objTo = crudInventory.getByPen(this.movingTo.name);
		    if(objTo)
			objTo = enyo.clone(objTo);
		    
		    if (objTo && objFrom) {
			if (objFrom.qualityId != objTo.qualityId) {
			    cacheMan.setMessage("","No es posible mezclar clases de ganado en un corral");
			    break;
			}
		    }
		    
		    if(!objTo){
			objTo = crudPen.getByBarnyard(this.movingTo.name);
		    }
		    
		    if (objFrom) {
//			var byName = this.movingTo.name;
			//objFrom.barnyard = byName;
			this.$.popup_movePen.validateComponents();
			this.$.movePen_kind.setObj(objFrom, objTo);
			this.$.popup_movePen.openAtCenter();
		    } else {
			cacheMan.setMessage("","actionSelected Error");
		    }

		    break;
		}
	    },	    
	    saveMoving : function() {
		var isMovingToOccupied = true;
		var arrObjectsToSend = [];
		
		var movingFrom = crudInventory.getByPen(this.movingFrom.name);
		var movingTo = crudInventory.getByPen(this.movingTo.name);
		
		if(!movingTo){
		    movingTo = crudPen.getByBarnyard(this.movingTo.name);
		    isMovingToOccupied = false;
		}		
		
		var objMovement = this.$.movePen_kind.getObj();
		
		movingFrom.heads = Number(movingFrom.heads) - Number(objMovement.heads);
		    
		if(isMovingToOccupied){
		    
		    movingTo.heads = Number(movingTo.heads) + Number(objMovement.heads);
		    movingTo.weight = Number(movingTo.weight) + Number(objMovement.weight);
		    movingTo.availableToSell = Number(movingTo.availableToSell) + Number(objMovement.heads);

		}else{
		    var objNewInventory=enyo.clone(movingFrom);
		    delete objNewInventory.inventoryId;
		    objNewInventory.heads = Number(objMovement.heads);
		    objNewInventory.weight = Number(objMovement.weight);
		    //objNewInventory.pen = movingTo;
		    objNewInventory.penId = movingTo.penId;
		    objNewInventory.availableToSell= objNewInventory.heads;
		    objNewInventory.feed = Number(objMovement.feed);
		    movingTo = objNewInventory;
		}
		
		this.$.popup_movePen.close();
		
		arrObjectsToSend.push(crudInventory.adapterToOut(movingFrom));
		arrObjectsToSend.push(crudInventory.adapterToOut(movingTo));
		crudInventory.save(arrObjectsToSend, this, "updateView");
		cacheMan.showScrim();
	    },
	});
