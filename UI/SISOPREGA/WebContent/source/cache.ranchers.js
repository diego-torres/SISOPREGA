/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind(
  {
    name : "cache.ranchers",
    kind : "crud.cache",
    entityName : "Rancher",
    adapterToIn : function(entityObj) {

      if(entityObj.entityName == "Rancher"){
        entityObj.rancher_type = 1;
        
        if(entityObj.birthDate){
          var numberBDate = Number(entityObj.birthDate);
          var vDate = new Date(numberBDate);
          entityObj.birthDate = vDate;
        } else {
          entityObj.birthDate = null;
        }
        
        entityObj.name = entityObj.lastName + " " + entityObj.motherName + ", " + entityObj.firstName + " " + entityObj.middleName;
        
      }else{
        entityObj = null;
      }
      
      return entityObj;
    },
    adapterToList : function(entityObj) {
      var listObj =
        {
          value : 0,
          caption : ""
        };
      
      listObj.value = entityObj.rancherId;
      listObj.caption = entityObj.name;
      
      return listObj;
    },
    getCatalogsList:function(){
	
	 var arrAdapterList = enyo.clone(this.arrObj);
	 var result = [];
		
	 for ( var i = 0; i < arrAdapterList.length; i++) {
	 var obj = arrAdapterList[i];
	 obj.importantInfo = "" + arrAdapterList[i].name;
	 obj.secundaryInfo = "" + arrAdapterList[i].phone_number;
	 result.push(obj);
	 }
	 return result;
    }
  });
var cacheRanchers = new cache.ranchers();