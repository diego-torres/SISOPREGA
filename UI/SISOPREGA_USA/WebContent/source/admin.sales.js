enyo.kind({
	name: "admin.sales",
	kind: "VFlexBox",
	className: "enyo-bg",
	arrData:null,
	iSelected:{},
	iHeads:null,
	iWeight:null,
	arrToShip:[],
	events: {
		onSelect: "",
		onShipment:""
	},
	bCheck:false,			
	components: [
		{kind: "Toolbar",
			components:[
				{kind: "VFlexBox",content:"Ventas",onclick:"doSelect",flex:.3,style:"color:white"} ,
				{kind:"RowGroup",layoutKind: enyo.VFlexLayout, align: "center", flex:.7, style:"margin:0",
				 components:[
					{name: "lblSalesShipment",
					 className:"listSecond",style:"font-size: 0.75em;color:#999",
					 content: "Cabezas - Peso"},
				]},
				{kind: "Spacer",flex:.1},
				{kind: "Button",caption: "+",onclick:"doShipment"}
			]},			
		{kind: "Scroller", flex: 1, 
		 components:[
			{kind: enyo.VirtualRepeater, name: "listSales", onSetupRow: "loadSales", onclick: "selectSale",								
			components: [
				{kind: enyo.Item,
					components: [
					{layoutKind: enyo.HFlexLayout,components:[
						{name: "lblSalesDate",flex:.9,
						 content: ""},
						{name: "lblSalesHeads",flex:1,
						 content: ""},	
						{name: "lblSalesWeight",flex:1,
						 content: ""},
						{name: "lblSalesAverage",flex:1, 
						 content: ""},
						{kind: "CheckBox", name:"chkSalesShip", iPos:"",checked: false,
						 style: "margin-right:5px",onclick:"checkBox_click"},		 
					]},
					{layoutKind: enyo.HFlexLayout,components:[{name: "lblSalesClient",style: "font-size: 0.85em;color:gray",
					 content:"Comprador"},{kind:"Spacer"},
					 {name:"lblShipProgrammed", style:"color:gray;font-size:0.85em;", content:"Programado", showing:false}
					 ]
					}					
					]}
				]}
		]},
		{kind: "Toolbar",
			components:[
				{kind: "VFlexBox", content:"Total",flex:.20,style:"color:white;margin:0"},
				{kind: "Spacer",flex:.07},				
				{kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblSalesSumHeads",align:"center",style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},
				{kind: "Spacer",flex:.15},
				{kind:"RowGroup", align: "center", flex:.15, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblSalesSumWeight",align:"center",
					 style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},
				{kind: "Spacer",flex:.07},
				{kind:"RowGroup", align: "center", flex:.12, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblSumAveWeight",align:"center",
					 className:"listSecond",style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},				
				{kind: "Spacer",flex:.28},				
			]},	
	],
	loadSales:function(inSender, inIndex) {		
		var objData;
		if(objData=this.arrData[inIndex]){
			this.$.lblSalesDate.setContent(objData.saledate);
			this.$.lblSalesHeads.setContent(gblUtils.numCD(objData.heads));
			this.$.lblSalesWeight.setContent(gblUtils.numCD(objData.weight));
			this.$.lblSalesAverage.setContent(gblUtils.numCD(objData.aveweight));	
			this.$.lblSalesClient.setContent(objData.buyer);
			this.$.lblSalesClient.setContent(objData.buyer);			
			this.$.chkSalesShip.iPos=inIndex;
			if(objData.shipProgramDate){
			    this.$.chkSalesShip.hide();
			    this.$.lblShipProgrammed.show();
			}
			return true;
		}else{
			return false;
		}
	},
	updateSummary:function(){
		var iHeads=0;		
		var iWeight=0;
		var iAve=0;		
		
		for (var j=0;j<this.arrData.length;j++){
			iHeads+=this.arrData[j].heads;		
			iWeight+=this.arrData[j].weight;
			iAve+=this.arrData[j].aveweight;					
		}
		this.$.lblSalesSumHeads.setContent(gblUtils.numCD(iHeads));
		this.$.lblSalesSumWeight.setContent(gblUtils.numCD(iWeight));
		this.$.lblSumAveWeight.setContent(gblUtils.numCD((iAve/this.arrData.length).toFixed(2)));
	},
	ready:function(){
		this.updateSummary();
	},
	calculateTotals : function() {
		var hc = 0;
		var weight = 0;
		var len = this.arrData.length;
		for ( var i = 0; i < len; i++) {
		    if (!this.arrData[i].shipProgramDate && this.arrData[i].checked) {
			hc += this.arrData[i].heads;
			weight += this.arrData[i].weight;
		    }
		}
		if (weight > 50000) {
		    this.$.lblSalesShipment.addClass("redAlert");
		} else {
		    this.$.lblSalesShipment.removeClass("redAlert");
		}
		if (weight == 0) {
		    this.$.lblSalesShipment.setContent("Cabezas - Peso");
		} else {
		    this.$.lblSalesShipment.setContent(gblUtils.numCD(hc) + "/"
			    + gblUtils.numCD(weight));
		}
	},
	checkBox_click : function(inSender, inEvent) {
		this.arrData[inEvent.rowIndex].checked = inSender.checked;
		if(inSender.checked)
		    this.arrToShip[this.arrData[inEvent.rowIndex].sale_id]=this.arrData[inEvent.rowIndex];
		else
		    delete this.arrToShip[this.arrData[inEvent.rowIndex].sale_id];
		this.calculateTotals();
	},
	getSalesToShip:function(){
		return this.arrToShip;
	},
	updateList:function(){
	    this.$.listSales.render();
	    this.calculateTotals();
	}
});
