/**
 * Provides a handler for enterprise rancher data.
 * 
 * Revision History: 
 * - 05/28/2013 By Diego Torres: Initial Version. 
 */
enyo.kind(
  {
    name : "cache.enterpriseRanchers",
    kind : "crud.cache",
    entityName : "EnterpriseRancher",
    adapterToIn : function(entityObj) {

      if(entityObj.entityName == "EnterpriseRancher"){
        entityObj.rancher_type = 2;
        entityObj.rancherId = entityObj.enterpriseRancherId;
        entityObj.legalName += '';
        entityObj.telephone = entityObj.telephone || ""; 
        return this.inherited(arguments);
      }else{
        return null;
      }
    },
    adapterToList : function(entityObj) {
      var listObj =
        {
          value : 0,
          caption : ""
        };

      listObj.value = entityObj.rancherId;
      listObj.caption =  entityObj.legalName;;

      return listObj;
    },
    getCatalogsList:function(){
	
	 var arrAdapterList = enyo.clone(this.arrObj);
	 var result = [];
		
	 for ( var i = 0; i < arrAdapterList.length; i++) {
	 var obj = arrAdapterList[i];
	 obj.importantInfo = "" + arrAdapterList[i].legalName;
	 obj.secundaryInfo = "" + arrAdapterList[i].telephone;
	 result.push(obj);
	 }
	 return result;
   }
  });
var cacheEnterpriseRanchers = new cache.enterpriseRanchers();