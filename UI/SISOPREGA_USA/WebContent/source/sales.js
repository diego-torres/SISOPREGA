enyo
	.kind({
	    name : "sales",
	    kind : enyo.VFlexBox,
	    arrReceptions : null,
	    arrDetail : [],
	    totalHC : 0,
	    totalWeight : 0,
	    style:"background-color:#DABD8B;font-size:15px;",
	    components : [
		    {
			kind : enyo.VFlexBox,
			style : "padding:20px;",
			pack : "center",
			components : [
				{
				    kind : enyo.HFlexBox,
				    align : "center",
				    height : "40px;",
				    components : [
					    {
						content : "Fecha:",
						width : "80px;",
						style:"text-align: right;"
					    },
					    {
						kind : "ToolInput",
						name : "saleDate",
						width : "135px;",
						height : "35px;",
						onfocus : "applyMask"
					    },
					    {
						content : 'mes/dia/a�o',
						className : "listFirst",
						style : "background-color:#DABD8B;margin-left:2px;font-size:12px;",
						width : "80px;"
					    }, ]
				}, {
				    kind : enyo.HFlexBox,
				    align : "center",
				    height : "40px;",
				    components : [ {
					content : "Cliente:",
					width : "80px;",
					style:"text-align: right;"
				    }, {
					kind : "controls.autocomplete",
					inputKind : "ToolInput",
					name : "customer",
					width : "500px;",
					height : "35px;",
				    } ]
				} ]
		    },
		    {
			kind : "HFlexBox",
			className : "listFirst",
			style : "padding-left:100px;",
			// style : "font-size:13px;background-color:#DABD8B;",
			// layoutKind : enyo.HFlexLayout,
			align : "center",
			pack : "start",
			components : [ {
			    kind : "controls.autocomplete",
			    inputKind : "ToolInput",
			    height : "35px;",
			    name : "clase",
			    hint : 'Clase',
			    width : "150px;",
			    style : "margin-right: 15px;"
			}, {
			    kind : "ToolInput",
			    name : "cabezas",
			    hint : 'Cabezas',
			    width : "150px;",
			    style : "margin-right: 15px;"
			}, {
			    kind : "ToolInput",
			    name : "corrales",
			    hint : "Corrales",
			    width : "300px;",
			    style : "margin-right: 15px;"
			}, {
			    kind : enyo.Button,
			    caption : "Agregar",
			    onclick : "agregar_click",
			    style : "background-color: #DABD8B;"
			}, ]
		    },
		    {
			kind : "HFlexBox",
			className : "listFirst",
			style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;",
			height : "30px",
			align : "center",
			pack : "start",
			components : [
				{
				    content : 'Clase',
				    // className : "listSecond",
				    style : "width:153px;margin-right:15px;margin-left:107px;",
				}, {
				    content : 'Cantidad',
				    // className : "listSecond",
				    style : "width:153px;margin-right:15px;"
				}, {
				    content : "Corrales",
				    // className : "listSecond",
				    style : "width:300px;margin-right:15px;"
				}, {
				    content : "Peso",
				    style : "width:300px;margin-right:15px;"
				}, {
				    style : "width:79px;margin-left:20px;"
				} ]
		    },
		    {
			kind : enyo.Scroller,
			name : "detailScroller",
			flex : 1,
			// className : "listBG",
			style : "background-color: #482400;",
			// style:"background-image:url('images/images
			// (3).jpg');background-repeat:repeat;margin-top: 5px;",
			components : [ {
			    kind : enyo.VirtualRepeater,
			    name : "list",
			    onSetupRow : "setupRow",
			    components : [ {
				kind : enyo.Item,
				layoutKind : enyo.HFlexLayout,
				align : "center",
				pack : "start",
				height : "40px",
				className : "listBG",
				components : [
					{
					    name : 'detail_number',
					    className : "listSecond",
					    style : "width:30px;margin-right:15px;margin-left:30px;color:#5F0712",
					},
					{
					    name : 'detail_clase',
					    className : "listSecond",
					    style : "width:153px;margin-right:15px;margin-left:23px;",
					},
					{
					    name : 'detail_cabezas',
					    className : "listSecond",
					    style : "width:153px;margin-right:15px;"
					},
					{
					    name : "detail_corrales",
					    className : "listSecond",
					    style : "width:300px;margin-right:15px;"
					}, {
					    name : "detail_weight",
					    className : "listSecond",
					    style : "width:200px;"
					},
				// {
				// name : "weight",
				// kind : "ToolInput",
				// width : "70px;",
				// hint : "Peso",
				// oninput : "weight_changed"
				// }, {
				// name : 'btnSave',
				// kind : enyo.Button,
				// caption : "Guardar",
				// onclick : "updateWeight",
				// style :
				// "width:55px;margin-left:20px;height:20px;"
				//
				// }
				]
			    } ]
			} ]
		    },
		    {
			kind : enyo.VFlexBox,
			style : "padding:20px;border-top-style: solid;border-top-color:#482400",
			pack : "center",

			components : [ {
			    kind : enyo.HFlexBox,
			    align : "center",
			    height : "40px;",
			    style : "font-size:14px;",
			    components : [
				    {
					content : "Total Cabezas:",
				    },
				    {
					content : '0',
					name : "totalHC",
					className : "listFirst",
					style : "background-color:#DABD8B;margin-left:10px",
					width : "60px;"
				    },
				    {
					content : "Total Peso:",
				    },
				    {
					content : '0',
					name : "totalWeight",
					className : "listFirst",
					style : "background-color:#DABD8B;margin-left:10px;",
					width : "60px;"
				    }, {
					kind : enyo.Spacer
				    }, {
					kind : enyo.Button,
					caption : "Efectuar Venta",
					onclick : "sell_click",
					style : "background-color: #DABD8B;"
				    }

			    ]
			} ]
		    } ],
	    agregar_click : function() {

		var newObject = {
		    clase : this.$.clase.getValue(),
		    cabezas : this.$.cabezas.getValue(),
		    corrales : this.$.corrales.getValue(),
		    pesoPromedio : 12.4
		};

		this.arrDetail.push(newObject);
		this.updateList();

		this.$.detailScroller.scrollTo(this.$.detailScroller
			.getBoundaries().bottom, 0);
	    },
	    setupRow : function(inSender, inIndex) {
		if (this.arrDetail[inIndex]) {
		    this.$.detail_number.setContent(inIndex + 1);
		    this.$.detail_clase
			    .setContent(this.arrDetail[inIndex].clase);
		    this.$.detail_cabezas
			    .setContent(this.arrDetail[inIndex].cabezas);
		    this.$.detail_corrales
			    .setContent(this.arrDetail[inIndex].corrales);
		    this.$.detail_weight
			    .setContent(parseFloat(this.arrDetail[inIndex].cabezas)
				    * parseFloat(this.arrDetail[inIndex].pesoPromedio));
		    this.totalHC += parseFloat(this.$.detail_cabezas
			    .getContent());
		    this.totalWeight += parseFloat(this.$.detail_weight
			    .getContent());
		    return true;
		}
	    },
	    afterUpdate : function() {
		this.updateList();
	    },
	    ready : function() {
		this.$.saleDate.setValue(utils.dateOut(new Date()));
		this.$.saleDate.$.input.applyStyle("text-align", "center");
		this.$.customer.setItems(cacheCustomers.getAllForList());
	    },
	    updateList : function() {
		this.totalHC = 0;
		this.totalWeight = 0;
		this.$.list.render();
		this.$.totalHC.setContent(this.totalHC);
		this.$.totalWeight.setContent(this.totalWeight);
	    },
	    sell_click : function() {

	    },
	    applyMask : function(inSender) {
		var _id = inSender.$.input.getId();
		jQuery(function(j) {
		    j(document.getElementById(_id)).mask('99/99/9999');
		});
	    }
	});