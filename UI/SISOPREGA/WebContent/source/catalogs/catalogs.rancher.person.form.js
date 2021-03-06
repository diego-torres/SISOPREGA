enyo.kind({
    name : "catalogs.rancher.person.form",
    kind : "forms.simple",
    entityKind : crudRancher,
    create : function() {
	this.inherited(arguments);

	this.$.mainScroller.createComponents([ {
	    kind : "RowGroup",
	    name : "rowGroup",
	    defaultKind : "HFlexBox",
	    caption : "",
	    components : [ {
		kind : "Input",
		name : "aka",
		hint : "Alias",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "aka"
	    }, {
		kind : "Input",
		name : "first_name",
		hint : "Nombres",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "firstName"
	    }, {
		kind : "Input",
		name : "last_name",
		hint : "Apellido Paterno",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "lastName"
	    }, {
		kind : "Input",
		name : "mother_name",
		hint : "Apellido Materno",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "motherName"
	    }, {
		kind : "HFlexBox",
		style : "",
		align:"center",
		components : [ {
		    content : "Fecha de Nacimiento"
		},
		{
		    kind : "controls.dateMask",
		    name : "birth_date",
		    bindTo : "birthDate",
		    style:"max-width:130px;"
		    }
		 ]
	    }, {
		kind : "Input",
		name : "email_add",
		hint : "Email",
		inputType : "email",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "emailAddress"
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    kind : "controls.phoneBox",
		    name : "phone_number",
		    hint : "Telefono",
		    bindTo : "phone"
		}, {
		    content : "Para envio de SMS",
		    style : "padding-right: 5px;"
		}, {
		    kind : enyo.CheckBox,
		    name : "checkBox1",
		    onChange : "checkboxChanged"
		} ]
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    kind : "controls.phoneBox",
		    name : "phone_number2",
		    hint : "Telefono 2",
		    bindTo : "phone2"
		}, {
		    content : "Para envio de SMS",
		    style : "padding-right: 5px;"
		}, {
		    kind : enyo.CheckBox,
		    name : "checkBox2",
		    onChange : "checkboxChanged"
		} ]
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    kind : "controls.phoneBox",
		    name : "phone_number3",
		    hint : "Telefono 3",
		    bindTo : "phone3"
		}, {
		    content : "Para envio de SMS",
		    style : "padding-right: 5px;"
		}, {
		    kind : enyo.CheckBox,
		    name : "checkBox3",
		    onChange : "checkboxChanged"
		} ]
	    } ]
	} ], {
	    owner : this
	});
    },
    setEntity : function(obj) {
	this.inherited(arguments);
	if (obj.smsPhoneChosen !== undefined) {
	    this.setPhoneSMS(obj.smsPhoneChosen);
	}
    },
    resetValues : function() {
	this.inherited(arguments);
	this.objRan = null;
	this.setPhoneSMS(0);
    },
    setPhoneSMS : function(intPhone) {
	this.$.checkBox1.setChecked(false);
	this.$.checkBox2.setChecked(false);
	this.$.checkBox3.setChecked(false);
	switch (parseInt(intPhone)) {
	case 1:
	    this.$.checkBox1.setChecked(true);
	    break;
	case 2:
	    this.$.checkBox2.setChecked(true);
	    break;
	case 3:
	    this.$.checkBox3.setChecked(true);
	    break;
	}
    },
    beforeSave : function(obj) {
	
	var email = this.$.email_add.getValue();
	if (email != '' && !/\S+@\S+\.\S+/.test(email)) {
	    this.errorMessage = "El formato de correo electrónico no es reconocido (correo@servidor.ext).";
	    return false;
	}
	
	obj.smsPhoneChosen = this.getCheckBoxSelected();
	return true;
    },
    checkboxChanged : function(inSender, inEvent) {
	switch (inSender.name) {
	case 'checkBox1':
	    this.setPhoneSMS(inSender.checked ? 1 : 0);
	    break;
	case 'checkBox2':
	    this.setPhoneSMS(inSender.checked ? 2 : 0);
	    break;
	case 'checkBox3':
	    this.setPhoneSMS(inSender.checked ? 3 : 0);
	    break;
	}
    },
    getCheckBoxSelected : function() {
	if (this.$.checkBox1.checked == true) {
	    return 1;
	}
	if (this.$.checkBox2.checked == true) {
	    return 2;
	}
	if (this.$.checkBox3.checked == true) {
	    return 3;
	}
	return 0;
    }
});