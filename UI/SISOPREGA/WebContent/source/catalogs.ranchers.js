/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * - 02/05/2013 By Diego Torres: Eliminate double call to updateList on rancher users list.
 * 
 */
enyo.kind(
  {
    name : "catalogs.ranchers",
    kind : enyo.VFlexBox,
    components :
      [
        {
          kind : enyo.Pane,
          flex : 1,
          name : "ranchersPane",
          transitionKind : "enyo.transitions.LeftRightFlyin",
          components :
            [
              {
                kind : "catalogs.ranchers.list",
                name : "ranchersList",
                flex : 1,
                onSelectRancher : "showOptions",
                onEnterprise : "showEnterprise",
                onPerson : "showPerson"
              },
              {
                kind : "catalogs.ranchers.person.create",
                name : "ranPerCreate",
                onAddRancher : "goBack",
                onUpdateRancher : "goBack",
                onCancel : "goBack"
              },
              {
                kind : "catalogs.ranchers.enterprise.create",
                name : "ranEPCreate",
                onAddRancher : "goBack",
                onUpdateRancher : "goBack",
                onCancel : "goBack"
              },
              {
                kind : "catalogs.ranchers.options",
                name : "ranOptions",
                onGoback : "goBack",
                onEdit : "showEdit",
                onContacts : "showContacts",
                onBilling : "showBillings",
                onRegister : "showRegister",
                onPedimentos : "showPedimentos"
              },
              {
                kind : "catalogs.ranchers.contact.list",
                name : "contactList",
                onGoback : "goBack",
                onAddContact : "showAddContact",
                onSelect : "showEditContact"
              },
              {
                kind : "catalogs.ranchers.contact.create",
                name : "acontact",
                onGoback : "goBack",
                onAddRancher : "goBack",
                onUpdateRancher : "goBack",
                onCancel : "goBack"
              },
              {
                kind : "catalogs.ranchers.billing.list",
                name : "billingList",
                onGoback : "goBack",
                onAddBilling : "showAddBilling",
                onSelect : "showEditBilling"
              },
              {
                kind : "catalogs.ranchers.billing.create",
                name : "abilling",
                onGoback : "goBack",
                onAddBilling : "goBack",
                onUpdateBilling : "goBack",
                onCancel : "goBack"
              },
              {
                kind : "catalogs.ranchers.users.list",
                name : "usersList",
                onGoback : "goBack",
                onAddUser : "showAddUser",
                onSelect : "showEditRancherUser"
              },
              {
                kind : "catalogs.ranchers.users.create",
                name : "aRancherUsers",
                onGoback : "goBack",
                onAddRancherUser : "goBack",
                onResetPassword : "goBack",
                onCancel : "goBack"
              },
              {
                kind : "catalogs.ranchers.pedimentos.list",
                name : "pedimentosList",
                onGoback : "goBack"
              }, ]
        } ],
    showPerson : function() {
      _gobackStack.push(
        {
          caption : _objMainHeader.getContent(),
          paneMan : this.$.ranchersPane,
          paneName : "ranchersList"
        });
      this.$.ranPerCreate.toggleAdd();
      this.$.ranPerCreate.objList = cacheRanchers.get();
      _objMainHeader.setContent('Nuevo Ganadero - Persona Fisica');
      this.$.ranchersPane.selectViewByName("ranPerCreate");
    },
    showEdit : function() {
      var objRan = this.$.ranchersList.getSelected();
      objRan.first_name = objRan.first_name;
      if (objRan.rancher_type == 1) {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "ranOptions"
          });
        this.$.ranPerCreate.setRancher(objRan);
        this.$.ranPerCreate.toggleUpdate();
        _objMainHeader.setContent('Editar Ganadero - Persona Fisica');
        this.$.ranchersPane.selectViewByName("ranPerCreate");
      } else {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "ranOptions"
          });
        this.$.ranEPCreate.setRancher(objRan);
        this.$.ranEPCreate.toggleUpdate();
        _objMainHeader.setContent('Editar Ganadero - Empresa / Sociedad');
        this.$.ranchersPane.selectViewByName("ranEPCreate");
      }
    },
    showEnterprise : function() {
      _gobackStack.push(
        {
          caption : _objMainHeader.getContent(),
          paneMan : this.$.ranchersPane,
          paneName : "ranchersList"
        });
      this.$.ranEPCreate.toggleAdd();
      this.$.ranEPCreate.objList = cacheRanchers.get();
      _objMainHeader.setContent('Nuevo Ganadero - Empresa / Sociedad');
      this.$.ranchersPane.selectViewByName("ranEPCreate");
    },
    showCapacity : function(inSender, inEvent) {
      this.addGoBackAction();
      this.$.capList._arrCapacity = _arrBarnyards[inEvent.rowIndex].barnyard_capacity;
      this.$.capList.render();
      this.$.ranchersPane.selectViewByName("capList");
      return true;
    },
    showOptions : function() {
      _gobackStack.push(
        {
          caption : _objMainHeader.getContent(),
          paneMan : this.$.ranchersPane,
          paneName : "ranchersList"
        });
      var objRan = this.$.ranchersList.getSelected();
      if (objRan.rancher_type == 2) {
        _objMainHeader.setContent(objRan.company_name);

      } else {
        _objMainHeader.setContent(objRan.last_name + ' ' + objRan.mother_name + ' ' + objRan.first_name);
      }
      this.$.ranchersPane.selectViewByName("ranOptions");
    },
    showContacts : function() {

      var objRan = this.$.ranchersList.getSelected();
      if (objRan.rancher_type == 2) {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "ranOptions"
          });
        _objMainHeader.setContent("Contactos - " + objRan.company_name);
      } else {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "ranOptions"
          });
        _objMainHeader.setContent("Contactos - " + objRan.last_name + ' ' + objRan.mother_name + ' ' + objRan.first_name);
      }
      this.$.contactList.setList(this.$.ranchersList.getSelected());
      this.$.contactList.updateList();
      this.$.ranchersPane.selectViewByName("contactList");
    },
    showAddContact : function() {

      var objRan = this.$.ranchersList.getSelected();
      if (objRan.rancher_type == 2) {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "contactList"
          });
        _objMainHeader.setContent("Nuevo Contacto - " + objRan.company_name);
      } else {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "contactList"
          });
        _objMainHeader.setContent("Nuevo Contacto - " + objRan.last_name + ' ' + objRan.mother_name + ' ' + objRan.first_name);
      }
      this.$.acontact.objList = _arrRancherList[this.$.ranchersList.iSelected].contacts;
      this.$.acontact.setRancher(this.$.ranchersList.getSelected());
      this.$.acontact.toggleAdd();
      this.$.ranchersPane.selectViewByName("acontact");
    },
    showEditContact : function() {
      var objRan = this.$.ranchersList.getSelected();
      if (objRan.rancher_type == 2) {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "contactList"
          });
      } else {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "contactList"
          });
      }
      this.$.acontact.setContact(this.$.ranchersList.getSelected(), this.$.contactList.getContact());
      _objMainHeader.setContent('Editar Contacto');
      this.$.ranchersPane.selectViewByName("acontact");
    },
    showBillings : function() {

      var objRan = this.$.ranchersList.getSelected();
      if (objRan.rancher_type == 2) {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "ranOptions"
          });
        _objMainHeader.setContent("Datos de Facturación - " + objRan.company_name);

      } else {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "ranOptions"
          });
        _objMainHeader.setContent("Datos de Facturación - " + objRan.last_name + ' ' + objRan.mother_name + ' ' + objRan.first_name);

      }
      this.$.billingList.setList(this.$.ranchersList.getSelected());
      this.$.billingList.updateList();
      this.$.ranchersPane.selectViewByName("billingList");
    },
    showAddBilling : function() {

      var objRan = this.$.ranchersList.getSelected();
      if (objRan.rancher_type == 2) {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "billingList"
          });
        _objMainHeader.setContent("Nuevos Datos de Facturación - " + objRan.company_name);
      } else {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "billingList"
          });
        _objMainHeader.setContent("Nuevos Datos de Facturación - " + objRan.last_name + ' ' + objRan.mother_name + ' ' + objRan.first_name);
      }
      this.$.abilling.objList = _arrRancherList[this.$.ranchersList.iSelected].billings;
      this.$.abilling.setRancher(this.$.ranchersList.getSelected());
      this.$.abilling.toggleAdd();
      this.$.ranchersPane.selectViewByName("abilling");
    },
    showEditBilling : function() {
      var objRan = this.$.ranchersList.getSelected();
      if (objRan.rancher_type == 2) {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "billingList"
          });
      } else {
        _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.ranchersPane,
            paneName : "billingList"
          });
      }
      this.$.abilling.setBilling(this.$.ranchersList.getSelected(), this.$.billingList.getBilling());
      _objMainHeader.setContent('Editar Datos de Facturación');
      this.$.ranchersPane.selectViewByName("abilling");
    },
    showRegister : function() {

      var objRan = this.$.ranchersList.getSelected();

      _gobackStack.push(
        {
          caption : _objMainHeader.getContent(),
          paneMan : this.$.ranchersPane,
          paneName : "ranOptions"
        });

      if (objRan.rancher_type == 2) {
        _objMainHeader.setContent("Lista de Usuarios - " + objRan.company_name);
      } else {
        _objMainHeader.setContent("Lista de Usuarios - " + objRan.last_name + ' ' + objRan.mother_name + ' ' + objRan.first_name);
      }

      this.$.usersList.setList(objRan);
      this.$.ranchersPane.selectViewByName("usersList");
    },
    showAddUser : function() {
      var objRan = this.$.ranchersList.getSelected();

      _gobackStack.push(
        {
          caption : _objMainHeader.getContent(),
          paneMan : this.$.ranchersPane,
          paneName : "usersList"
        });

      if (objRan.rancher_type == 2) {
        _objMainHeader.setContent("Nuevo Usuario - " + objRan.company_name);
      } else {
        _objMainHeader.setContent("Nuevo Usuario - " + objRan.last_name + ' ' + objRan.mother_name + ' ' + objRan.first_name);
      }
      this.$.aRancherUsers.objList = _arrRancherList[this.$.ranchersList.iSelected].users;
      this.$.aRancherUsers.setRancher(this.$.ranchersList.getSelected());
      this.$.aRancherUsers.toggleAdd();
      this.$.ranchersPane.selectViewByName("aRancherUsers");
    },
    showEditRancherUser : function() {
      _gobackStack.push(
        {
          caption : _objMainHeader.getContent(),
          paneMan : this.$.ranchersPane,
          paneName : "usersList"
        });

      this.$.aRancherUsers.setUser(this.$.ranchersList.getSelected(), this.$.usersList.getUser());
      _objMainHeader.setContent('Asignar contraseña');
      this.$.ranchersPane.selectViewByName("aRancherUsers");
    },
    showPedimentos : function() {
      _gobackStack.push(
        {
          caption : _objMainHeader.getContent(),
          paneMan : this.$.ranchersPane,
          paneName : "ranOptions"
        });

      this.$.pedimentosList.setList(this.$.ranchersList.getSelected());
      _objMainHeader.setContent('Lista de pedimentos');
      this.$.ranchersPane.selectViewByName("pedimentosList");
    },
    addGoBackAction : function() {
      _gobackStack.push(
        {
          caption : "Ganaderos",
          paneMan : this.$.ranchersPane,
          paneName : "ranchersList"
        });
    },
    goBack : function() {
      this.$.ranchersList.filterRanchers();
      this.$.contactList.updateList();
      this.$.billingList.updateList();
      this.$.usersList.updateList();
      this.$.pedimentosList.updateList();
      cacheMan.goBack();
    }
  });