/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo
	.kind({
	    name : "crud.sale",
	    kind : "crud",
	    published : {
		entityName : "Sale",
		createKindName : "operations.sales.form",
	    },
	    get : function(callbackObject, callbackMethod) {

		if (callbackObject) {
		    this.callbackObject = callbackObject;
		    this.callbackMethod = callbackMethod;
		} else {
		    this.callbackObject = null;
		    this.callbackMethod = '';
		}

		// if (callbackObject && callbackObject.parentObject != null) {
		// consumingGateway.Read(callbackObject.parentObject.entityName,
		// filterDef, this, "getCallBack");
		// } else {
		// consumingGateway.Read(this.entityName, filterDef, this,
		// "getCallBack");
		// }
		this.getCallBack({records:[]});
	    },
	    getCallBack : function(resultArray) {
		resultArray = {
		    exceptionDescription : "Success",
		    exceptionId : 0,
		    origin : "",
		    entityName : "",
		    records : [ {
			SalesDetail : [ {
			    avgWeight : 43.4,
			    cattleQualityId : 6,
			    heads : 43,
			    penString : 216
			}, {
			    avgWeight : 43.4,
			    cattleQualityId : 6,
			    heads : 43,
			    penString : 216
			} ],
			cattleTypeId : 1,
			totalHeads:86,
			totalWeight:234.4,
			salesDate : "07/28/2013",
			salesId : 0,
			supplierId : 1
		    }, {
			SalesDetail : [ {
			    avgWeight : 32.3,
			    cattleQualityId : 16,
			    heads : 23,
			    penString : 228
			} ],
			cattleTypeId : 2,
			totalHeads:23,
			totalWeight:228,
			salesDate : "07/28/2013",
			salesId : 0,
			supplierId : 1
		    } ]
		};
		this.arrObj = [];
		for ( var i = 0; i < resultArray.records.length; i++) {
		    var objAux = resultArray.records[i];
		    var innerModelObj = this.adapterToIn(objAux);
		    if (innerModelObj != null)
			this.arrObj.push(innerModelObj);
		}

		if (this.callbackObject != null) {
		    var milis = ((Math.random() * 1000) + 500);
		    setTimeout(this.callbackObject[this.callbackMethod]
			    (resultArray), milis);
		}
	    },
	    adapterToIn : function(entityObj) {
		if (entityObj) {
		    entityObj = this.inherited(arguments);
		    entityObj.seller = crudSeller.getByID(entityObj.supplierId).sellerName;
		    entityObj.salesDate = utils.dateIn(entityObj.salesDate);
		    entityObj.aveweight = Number(entityObj.totalHeads) / Number(entityObj.totalWeight);
		    return entityObj;
		}
		return null;
	    }
	});

var crudSale = new crud.sale();
