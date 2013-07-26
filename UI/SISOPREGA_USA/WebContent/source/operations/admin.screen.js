enyo.kind(
  {
    name : "admin.screen",
    kind : enyo.VFlexBox,
    components :
      [
        {
          kind : enyo.Popup,
          name : "popup_sales",
          width : "85%;",
          height : "85%;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "sales",
                name : "sales_kind",
                flex : 1,
                onSale : "on_sale",
                onCancel : "on_cancel_sale"
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_map",
          width : "85%;",
          height : "85%;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          onClose : "on_popup_map_close",
          components :
            [
              {
                kind : "pen.map",
                name : "map_kind",
                flex : 1
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_add",
          width : "343px;",
          height : "70px;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "addCattle",
                name : "addCattle_kind",
                onBuyCattle : "buy_cattle_click",
                onCaptureHermana : "capture_hermana_click",
                flex : 1
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_purchases",
          width : "90%;",
          height : "90%;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "purchases",
                name : "purchases_kind",
                onPurchaseCompleted : "savePurchaseGroup",
                flex : 1
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_hermana",
          width : "1000px;",
          height : "85%;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "hermana.de",
                name : "hermana_kind",
                onSave : "savePurchaseGroup",
                flex : 1
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_shipments",
          width : "1024px",
          height : "80%",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "shipments.schedule",
                name : "shipments_kind",
                flex : 1,
                onProgram : "programShipment_click",
                onCancel : "cancelShipment_click"
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_driver",
          width : "600px;",
          height : "230px;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "driver.select",
                name : "driver_kind",
                flex : 1,
                onCancel : "cancel_release",
                onAfterSave : "releaseShipment"
              } ]
        },
        {
          name : "slidingPane",
          kind : "SlidingPane",
          flex : 1,
          onSelectView : "slidingSelected",
          components :
            [
              {
                flex : .3,
                components :
                  [
                    {
                      name : "inventory",
                      kind : "admin.inventory",
                      flex : 1,
                      maxState : false,
                      arrData : [],
                      onSale : "showSale",
                      onSelect : "inventory_select"
                    } ]
              },
              {
                peekWidth : "30%",
                flex : .3,
                components :
                  [
                    {
                      name : "purchased",
                      kind : "admin.purchased",
                      flex : 1,
                      maxState : false,
                      arrData : crudPurchase.get(),
                      onPurchase : "showPurchase"
                    } ]
              },
              {
                peekWidth : "60%",
                flex : .3,
                components :
                  [
                    {
                      name : "sales",
                      kind : "admin.sales",
                      flex : 1,
                      maxState : false,
                      arrData : cacheSales.readData(),
                      onShipment : "showShipment"
                    },
                    {
                      name : "shipment",
                      kind : "admin.shipments",
                      flex : 1,
                      maxState : false,
                      arrData : cacheShip.readData(),
                      onSelectedShipment : "showSelectShipment",
                      onDeleteShipProgrammed: "deleteShipProgrammed"
                    } ]
              }, ]
        } ],
        ready:function(){
          this.$.inventory.setListContent(cachePen.get());
          this.$.inventory.updateView();
        },
    showSale : function() {
      this.$.popup_sales.openAtCenter();
    },
    showPurchase : function() {
      this.$.popup_add.openAtCenter();
    },
    showShipment : function() {
      this.$.popup_shipments.validateComponents();
      if (this.$.sales.getSelectedItems().length > 0) {
        this.$.shipments_kind.setArrShipment(this.$.sales.getSelectedItems());
        this.$.popup_shipments.openAtCenter();
        this.$.shipments_kind.updateList();
      } else {
        alert("No hay registros seleccionados");
      }
    },
    showSelectShipment : function(arrShipment) {
      this.$.popup_driver.openAtCenter();
      this.$.driver_kind.setObj(this.$.shipment.getSelectedShipment());
    },
    capture_hermana_click : function() {
      this.$.popup_add.close();
      this.$.popup_hermana.openAtCenter();
    },
    buy_cattle_click : function() {
      this.$.popup_add.close();

      if (this.$.purchases_kind)
        this.$.purchases_kind.updateList();

      this.$.popup_purchases.openAtCenter();
    },
    inventory_select : function(inSender, inEvent) {
      this.$.popup_map.openAtCenter();
    },
    programShipment_click : function() {
      this.$.popup_shipments.close();
      this.$.sales.arrToShip = {};
      this.$.sales.updateView();
      this.$.shipment.updateList();
      this.$.shipment.moveToBottom();
    },
    cancelShipment_click : function() {
      this.$.popup_shipments.close();
    },
    on_sale : function() {
      this.$.popup_sales.close();
      this.$.inventory.updateView();
      this.$.sales.updateView();
      this.$.sales.moveToBottom();
    },
    on_cancel_sale : function() {
      this.$.popup_sales.close();
    },
    savePurchaseGroup : function() {
      this.$.purchased.updateList();
      if (this.$.popup_purchases) {
        this.$.popup_purchases.close();
      }
      if (this.$.popup_hermana) {
        this.$.popup_hermana.close();
      }
    },
    releaseShipment : function() {
      this.$.popup_driver.close();
      this.$.shipment.updateList();
      this.$.inventory.updateView();
    },
    cancel_release : function() {
      this.$.popup_driver.close();
    },
    on_popup_map_close : function() {
      this.$.inventory.updateView();
    },
    deleteShipProgrammed:function(inSender, shipment){
	cacheShip.removeShipProgrammed(shipment);
	this.$.shipment.updateList();
	this.$.sales.updateView();
    }
  });