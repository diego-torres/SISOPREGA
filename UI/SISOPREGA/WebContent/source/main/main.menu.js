enyo.kind({
	name: "main.menu",
	kind: enyo.VFlexBox,
	className:"buttonsBG",
	pack:"center",
	tempFixCom:null,
	isEditing : false,
	events:{
		onUpdateLabel:"",
		onReceptionsMap:""
	},	
	components:[
		{kind: enyo.Pane,className:"buttonsBG", flex: 1, name: "mainPane", onSelectView:"selectView", transitionKind: "enyo.transitions.LeftRightFlyin", 
	     style:"background-size: cover;",				 		
		 components:[	
			{kind:"main.menu.options", name:"menuOptions", label:"Menu Principal", className:"buttonsBG",style:"width:1030px;margin-left: auto;margin-right: auto;",
			flex: 1,
			onReceptions:"showReceptionsMap",
			onCatalogs:"showCatalogs", 
			onReports:"showReports",
			onInspectionForecast:"showInspectionForecast",
			onUsers:"showUsersList"},
	 		
			{kind:"catalogs.main", name:"catalogs", label:"Cat�logos",lazy:true},
	 		{kind:"operations.pen.map", name:"receptionsMap",label:"Corrales",lazy:true, flex:1},	 		
	 		{kind:"reports.main", name:"reports", label:"Reportes", lazy:true},
	 		{kind:"inspections.main.fs", name:"inspectionForecast", label:"Lista de Inspecci�n", lazy:true},
	 		{
			    kind : "forms.list",
			    name : "usersList",
			    label : "Lista de Usuarios",
			    entity : crudUser
			}
	 			
		 ]}
	],
	showReceptionsMap:function(){
	    cacheMan.showScrim();
	    crudReception.get(this, "readCallBack");
	    crudLocation.get(this, "readCallBack");
	    crudRancher.get(this, "readCallBack");
	    crudCattle.get(this, "readCallBack");
	    crudPen.get(this, "readCallBack");
	    crudInspectionCode.get(this, "readCallBack");
	},	
	readCounter:0,
	readCallBack:function(){
		this.readCounter++;
		if(this.readCounter ==6){
		    this.readCounter=0;
		    this.openMap();
		    cacheMan.hideScrim();
		}
	    },
	openMap:function(){
	    this.$.mainPane.selectViewByName("receptionsMap");
	},
	showCatalogs:function(){
		this.$.mainPane.validateView("catalogs");
		this.$.catalogs.$.catalogsPane.selectViewByIndex(0);
		this.$.mainPane.selectViewByName("catalogs");
	    },
	    showReports : function() {
		this.$.mainPane.selectViewByName("reports");
	    },
	    showInspectionForecast : function() {
		this.$.mainPane.selectViewByName("inspectionForecast");
	    },
	    showUsersList : function() {
		this.$.mainPane.selectViewByName("usersList");
	    },
	    selectView : function(inSender, inView, inPreviousView) {

		if (inView.name == inPreviousView.name) {
		    return;
		}
		if (_navigatingBack == false) {
		    _gobackStack.push({
			caption : inPreviousView.label,
			paneMan : inPreviousView.parent,
			paneName : inPreviousView.name
		    });

		}
		_navigatingBack = false;
		_objMainHeader.setContent(inView.label);
		if (inView.label == "Menu Principal") {
		    _goBackButton.setShowing(!1);
		    _objMainHeader
			    .setStyle("color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;");
		    _gobackStack = [];
		} else {
		    _goBackButton.setShowing(1);
		}

		switch (inView.name) {
		case "inspectionForecast":
		    inView.$.forecast.resetValues();
		    break;
		case "usersList":
		    inView.reset();
		    break;
		case "catalogs":
		    _objMainHeader
			    .setContent(inView.$.catalogsPane.getView().label);
		    break;
		}
		if (inPreviousView) {
		    if (inPreviousView.name == "usersList"
			    && inView.name != "menuOptions") {
			var selectedUser = inPreviousView.getSelectedUser();
			if (selectedUser)
			    inView.setUser(selectedUser);
			else
			    inView.toggleAdd();
		    }
		}
	    }

	});