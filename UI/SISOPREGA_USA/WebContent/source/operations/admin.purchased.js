enyo
    .kind(
      {
        name : "admin.purchased",
        kind : "VFlexBox",
        className : "enyo-bg",
        events :
          {
            onSelect : "",
            onPurchase : ""
          },
        ready : function() {
        },
        arrData : [],
        components : [
              {
                kind : "Toolbar",
                layoutKind : enyo.HFlexLayout,
                style : "padding:0px;color:white",
                components : [
                      {
                        kind : "VFlexBox",
                        content : "Compras",
                        style : "font-size:15px;",
                        flex : .1,
                        onclick : "doSelect"
                      },
                      {
                        kind : "Spacer",
                        flex : .02
                      },
                      {
                        kind : "Button",
                        caption : "+",
                        onclick : "doPurchase"
                      }
                ]
              },
              {// HEADER:
                kind : "HFlexBox",
                className : "listFirst",
                style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: black;padding: 0px 10px;border-width: 1px;",
                height : "30px",
                align : "center",
                pack : "start",
                components : [
                      {
                        content : 'Proveedor',
                        flex : 1
                      },
                      {
                        content : 'Cabezas',
                        flex : 1.5,
                        style : "text-align: right;"
                      },
                      {
                        content : 'Peso',
                        flex : 1.5,
                        style : "text-align: right;"
                      },
                      {
                        content : 'Promedio',
                        flex : 1.5,
                        style : "text-align: right;"
                      }
                ]
              },
              {
                kind : "Scroller",
                flex : 1,
                components : [
                    {
                      kind : enyo.VirtualRepeater,
                      name : "listPurchased",
                      onSetupRow : "loadPurchased",
                      onclick : "doSelect",
                      components : [
                          {
                            kind : enyo.Item,
                            style : "font-size:14px;",
                            components : [
                                {
                                  layoutKind : enyo.HFlexLayout,
                                  components : [
                                        {
                                          name : "lblPurSeller",
                                          flex : 1.5,
                                          content : ""
                                        },
                                        {
                                          name : "lblPurHeads",
                                          flex : 1,
                                          content : "",
                                          style : "text-align: right;"
                                        },
                                        {
                                          name : "lblPurWeight",
                                          flex : 1.5,
                                          content : "",
                                          style : "text-align: right;"
                                        },
                                        {
                                          name : "lblPurAveWeight",
                                          flex : 1.5,
                                          content : "",
                                          style : "text-align: right;"
                                        },
                                  ]
                                }
                            ]
                          }
                      ]
                    }
                ]
              },
              {
                kind : "Toolbar",
                components : [
                      {
                        kind : "RowGroup",
                        contentFit : true,
                        align : "center",
                        flex : .1,
                        style : "backgound-color:white;margin:0;",
                        components : [
                              {
                                name : "lblPurSumHeads",
                                kind : "VFlexBox",
                                align : "center",
                                allowHtml : true,
                                style : "text-align:center;font-size: 0.75em;color:#999;",
                                content : "",
                              },
                        ]
                      },
                      {
                        kind : "RowGroup",
                        contentFit : true,
                        align : "center",
                        flex : .1,
                        style : "backgound-color:white;margin:0",
                        components : [
                              {
                                kind : "VFlexBox",
                                name : "lblPurSumWeight",
                                align : "center",
                                allowHtml : true,
                                style : "text-align:center;font-size: 0.75em;color:#999;",
                                content : ""
                              },
                        ]
                      },
                      {
                        kind : "RowGroup",
                        contentFit : true,
                        align : "center",
                        flex : .1,
                        style : "backgound-color:white;margin:0",
                        components : [
                              {
                                kind : "VFlexBox",
                                name : "lblSumAveWeight",
                                align : "center",
                                allowHtml : true,
                                style : "text-align:center;font-size: 0.75em;color:#999;",
                                content : ""
                              },
                        ]
                      }
                ]
              },
        ],
        loadPurchased : function(inSender, inIndex) {
          var objData = null;
          if (objData = this.arrData[inIndex]) {
            this.$.lblPurSeller.setContent(objData.sellerName);
            this.$.lblPurHeads.setContent(utils.formatNumberThousands(objData.heads));
            this.$.lblPurWeight.setContent(utils.formatNumberThousands(objData.weight));
            this.$.lblPurAveWeight.setContent(utils.formatNumberThousands(objData.weight / objData.heads));
            return true;
          }
        },
        updateSummary : function() {
          var iFotHeads = crudInventory.getObjSummary().heads;
          var iFotWeight = crudInventory.getObjSummary().weight;
                
          this.$.lblPurSumHeads.setContent("Cabezas<br />" + utils.formatNumberThousands(iFotHeads.toFixed(2)));
          this.$.lblPurSumWeight.setContent("Peso<br />" + utils.formatNumberThousands(iFotWeight.toFixed(2)));
          var avg = null;
          if (avg = (iFotWeight / iFotHeads)) {
            this.$.lblSumAveWeight.setContent("Peso Prom.<br />" + utils.formatNumberThousands(avg.toFixed(2)));
          } else {
            this.$.lblSumAveWeight.setContent("Peso Prom.<br />0.00");
          }
          
        },
        updateView : function() {
          crudSeller.get(this, "loadCatalogs");
          crudRancher.get(this, "loadCatalogs");
          crudEnterpriseRancher.get(this, "loadCatalogs");
        },
        loadCatalogs : function(){
          this.readCounter++;
          if(this.readCounter == 3){
            this.readCounter = 0;
            crudPurchase.get(this, "readCallBack");
            crudHermana.get(this, "readCallBack");
          }
        },
        ready : function() {
          this.updateView();
        },
        readCounter : 0,
        readCallBack : function() {
          this.readCounter++;
          if (this.readCounter == 2) {
            this.readCounter = 0;
            this.calculateInventory();
            this.loadListContent ();
          }
        },
        loadListContent : function() {
          // groups by sellerId into this.arrData
          var purchased = crudPurchase.arrObj;
          var imported = crudHermana.arrObj;
          var purchases = purchased.concat(imported);
          this.groupBySeller(purchases);
          this.$.listPurchased.render();
          this.updateSummary();
        },
        calculateInventory : function(useFirstListItem){
          // Add inventory record.
          if(!crudInventory.getDataLoaded()){
            var milis = ((Math.random() * 1000) + 500);
            setTimeout(this.calculateInventory, milis);
          }
          
          var objInventory = {
              sellerId : 0,
              sellerName : 'Inv. ELLLC @ STT',
              heads : crudInventory.getObjSummary().heads - crudPurchase.getObjSummary().heads,
              weight : crudInventory.getObjSummary().weight - crudPurchase.getObjSummary().weight
          };
          
          if(useFirstListItem){
            this.arrData[0] = objInventory;
          }else{
            this.arrData = [];
            this.arrData.push(objInventory);
          }
        },
        groupBySeller : function(purchaseArray) {
          for ( var i = 0; i < purchaseArray.length; i++) {
            var sellerId = '';
            if(purchaseArray[i].entityName == 'Hermana'){
              sellerId = 'Rancher-' + purchaseArray[i].rancherId;
            }else{
              sellerId = 'Seller-' + purchaseArray[i].sellerId;
            }
            
            if (!this.sellerIsSummarized(sellerId)) this.arrData.push(this.sellerSummary(purchaseArray, sellerId));
          }
        },
        sellerSummary : function(purchaseArray, sellerId) {
          var heads = 0;
          var weight = 0;
          var sellerName = '';
          for ( var i = 0; i < purchaseArray.length; i++) {
            var iSellerId = '';
            var detailRecords = [];
            var auxSellerName = '';
            if(purchaseArray[i].entityName == 'Hermana'){
              iSellerId = 'Rancher-' + purchaseArray[i].rancherId;
              detailRecords = purchaseArray[i].HermanaCorte;
              auxSellerName = purchaseArray[i].seller;
            }else{
              iSellerId = 'Seller-' + purchaseArray[i].sellerId;
              detailRecords = purchaseArray[i].PurchaseDetail;
              auxSellerName = crudSeller.getByID(purchaseArray[i].sellerId).sellerName;
            }
            
            if (iSellerId == sellerId) {
              heads += Number(this.calculateTotalHeads(detailRecords));
              weight += Number(this.calculateTotalWeight(detailRecords));
              sellerName = auxSellerName;
            }
          }
          
          
          var objResult =
            {
              sellerId : sellerId,
              sellerName : sellerName,
              heads : heads,
              weight : weight
            };
          return objResult;
        },
        sellerIsSummarized : function(sellerId) {
          for ( var i = 0; i < this.arrData.length; i++) {
            if (this.arrData[i].sellerId == sellerId) return true;
          }
          return false;
        },
        calculateTotalHeads : function(arrDetails) {
          if (arrDetails) {
            var totalHeads = 0;
            for ( var i = 0; i < arrDetails.length; i++) {
              totalHeads += Number(arrDetails[i].heads);
            }
            return totalHeads;
          }
          return 0;
        },
        calculateTotalWeight : function(arrDetails) {
          if (arrDetails) {
            var totalWeight = 0;
            for ( var i = 0; i < arrDetails.length; i++) {
              totalWeight += Number(arrDetails[i].weight);
            }
            return totalWeight;
          }
          return 0;
        }
      });
