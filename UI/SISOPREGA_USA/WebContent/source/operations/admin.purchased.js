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
        components :
          [
                {
                  kind : "Toolbar",
                  layoutKind : enyo.HFlexLayout,
                  style : "padding:0px;color:white",
                  components :
                    [
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
                      } ]
                },
                {//HEADER:
                  kind : "HFlexBox",
                  className : "listFirst",
                  style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: black;padding: 0px 10px;border-width: 1px;",
                  height : "30px",
                  align : "center",
                  pack : "start",
                  components :
                    [
                      {
                        content : 'Fecha',
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
                      } ]
                },
                {
                  kind : "Scroller",
                  flex : 1,
                  components :
                    [
                      {
                        kind : enyo.VirtualRepeater,
                        name : "listPurchased",
                        onSetupRow : "loadPurchased",
                        onclick : "doSelect",
                        components :
                          [
                            {
                              kind : enyo.Item,
                              style : "font-size:14px;",
                              components :
                                [
                                  {
                                    layoutKind : enyo.HFlexLayout,
                                    components :
                                      [
                                        {
                                          name : "lblPurDate",
                                          flex : 1,
                                          content : ""
                                        },
                                        {
                                          name : "lblPurHeads",
                                          flex : 1.5,
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
                                        }, ]
                                  },
                                  {
                                    layoutKind : enyo.HFlexLayout,
                                    components :
                                      [
                                        {
                                          name : "lblPurSeller",
                                          flex : .45,
                                          style : "font-size: 0.85em;color:#008B8B",
                                          content : ""
                                        },
                                        {
                                          kind : "VFlexBox",
                                          name : "lblPurRew",
                                          flex : .1,
                                          style : "font-size: 0.85em;color:#008B8B",
                                          align : "center",
                                          content : ""
                                        },
                                        {
                                          kind : "Spacer",
                                          flex : .4
                                        } ]
                                  } ]
                            } ]
                      } ]
                },
                {
                  kind : "Toolbar",
                  components :
                    [
                        {kind:"RowGroup",contentFit:true, align: "center", flex:.1, style:"backgound-color:white;margin:0;",
                        	 components:[
                        		{name: "lblPurSumHeads",kind: "VFlexBox",align:"center",allowHtml:true, style:"text-align:center;font-size: 0.75em;color:#999;",
                        		 content: "", },
                        	]},
                        	{kind:"RowGroup",contentFit:true, align: "center", flex:.1, style:"backgound-color:white;margin:0",
                        	 components:[
                        		{kind: "VFlexBox",name: "lblPurSumWeight",align:"center",allowHtml:true, style:"text-align:center;font-size: 0.75em;color:#999;",
                        		 content: ""},
                        	]},
                        	{kind:"RowGroup",contentFit:true, align: "center", flex:.1, style:"backgound-color:white;margin:0",
                        	 components:[
                        		{kind: "VFlexBox",name: "lblSumAveWeight",align:"center",allowHtml:true, style:"text-align:center;font-size: 0.75em;color:#999;",
                        		 content: ""},
                        	]}	
                       ]
                }, ],
        loadPurchased : function(inSender, inIndex) {
         /* var objData = undefined; TODO TEMPORARILY DISABLED

          if (inIndex == 0 && this.arrData.inventory) {
            // Draw inventory record
            objData = this.arrData.inventory;
            this.$.lblPurSeller.setContent(objData.seller);
          } else if (objData = this.arrData.purchased[inIndex - 1]) {
            // Draw purchase record
            objData = this.arrData.purchased[inIndex - 1];
            this.$.lblPurSeller.setContent(objData.seller + "(" + objData.cattleName + ")");
          } else {
            return false;
          }

          this.$.lblPurDate.setContent(objData.purdate);
          this.$.lblPurHeads.setContent(objData.heads);
          this.$.lblPurWeight.setContent(utils.formatNumberThousands(objData.weight));
          this.$.lblPurAveWeight.setContent(utils.formatNumberThousands(objData.aveweight));
          if (objData.reweight) {
            if (objData.reweight > 0) {
              this.$.lblPurRew.setContent("(+" + objData.reweight + ")");
            } else {
              this.$.lblPurRew.setContent("(" + objData.reweight + ")");
            }
          }

          if (inIndex % 2 == 0)
            inSender.$.client.$.client.applyStyle("background-color", "#DFC699");

          return true;*/
        },
        updateSummary : function() {
            /*TODO TEMPORARILY DISABLED
          var iHeadHeads = 0;
          var iHeadWeight = 0;
          var iFotHeads = 0;
          var iFotWeight = 0;

          for ( var j = 0; j < this.arrData.purchased.length; j++) {
            iFotHeads += this.arrData.purchased[j].heads;
            iFotWeight += this.arrData.purchased[j].weight;
          }

          iHeadHeads += this.arrData.inventory.heads;
          iHeadWeight += this.arrData.inventory.weight;
          iHeadAve = iHeadWeight / iHeadHeads;

          this.$.lblPurSumHeads.setContent("Cabezas<br />" + utils.formatNumberThousands(iFotHeads.toFixed(2)));
          this.$.lblPurSumWeight.setContent("Peso<br />" + utils.formatNumberThousands(iFotWeight.toFixed(2)));
          var avg = null;
	    if(avg=(iFotWeight / iFotHeads)){
		this.$.lblSumAveWeight.setContent("Peso Prom.<br />" + utils.formatNumberThousands(avg.toFixed(2)));    
	    }else{
		this.$.lblSumAveWeight.setContent("Peso Prom.<br />0.00");
	    }
	    */
        },
        updateList : function() {
          this.arrData = crudPurchase.get();
          this.$.listPurchased.render();

          this.updateSummary();
        },
        ready : function() {
          // TODO: Remove mock objects and use database
          var objInventory =
            {
              purdate : utils.dateOut(new Date()),
              seller : "Inventario",
              cattleName : "Novillos",
              heads : 109,
              weight : 40650,
              aveweight : 372.9,
              reweight : 536,
              rtype : "inv"
            };
          
//          crudPurchase.setInventory(objInventory); //TODO temporarily disabled

          this.updateSummary();
        }
      });
