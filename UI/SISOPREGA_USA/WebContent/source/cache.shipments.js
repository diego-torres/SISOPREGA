enyo.kind({
	name: "cache.shipments",
	cacheData:null,
	createData:function(){
	},	
	readData:function(){
		var arrData=[{shipment_id:1,buyer:"Hascon",depdate:"01/01",deptime:"09:00",truck:"PAEZ Truck",
					  cattle_class:"Novillos",heads:127,weight:45520,aveweight:359},
					 {shipment_id:2,buyer:"Welton",depdate:"01/01",deptime:"11:00",truck:"La Canada",
					  cattle_class:"Novillos",heads:178,weight:95130,aveweight:534.4},		
					 {shipment_id:1,buyer:"Nely",depdate:"01/01",deptime:"12:00",truck:"VMMA",cattle_class:"Novillos",
					  heads:219,weight:97220,aveweight:443.9},
					 {shipment_id:1,buyer:"Alvaro Bustillos",depdate:"01/01",deptime:"13:00",truck:"Pendiente",cattle_class:"Novillos",
					  heads:13,weight:9055,aveweight:696.5}];
		return arrData;					  
	},
	updateData:function(){
	},
	deleteData:function(){
	},	
	adapter:function(arrData){
		var arrNewData=[];
		var i=0;
		for(var objData in arrData){			
			arrNewData[i]=objData;
			i++;
		}		
		return arrNewData;
	}
});
var cacheShip=new cache.shipments();