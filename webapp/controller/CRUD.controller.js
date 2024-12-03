sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
    
], (Controller,JSONModel,Fragment,) => {
    "use strict";
    var that;
    return Controller.extend("crudoperations.controller.CRUD", {
        onInit() {
            that = this;
            var oEmployeeData = {
                Employee : []
            };
            var oModel = new JSONModel(oEmployeeData);
            this.getView().setModel(oModel);

            if(!that.createDialog){
                that.createDialog = sap.ui.xmlfragment("crudoperations.fragments.fragmentCreation", that);
            }
            
        },
        createBtn: function(){
            that.createDialog.open();
        },
        onSubmit: function(){
                var eid = sap.ui.getCore().byId("eid").getValue();
                var ename = sap.ui.getCore().byId("e_name").getValue();
                var ebloodgroup = sap.ui.getCore().byId("e_bloodgrp").getValue();
                var edesignation = sap.ui.getCore().byId("e_des").getValue();
                var eemail = sap.ui.getCore().byId("e_email").getValue();
                var econtact = sap.ui.getCore().byId("e_contact").getValue();
                var eaddress = sap.ui.getCore().byId("e_address").getValue();
                var ebranch = sap.ui.getCore().byId("e_branch").getValue();
                if(eid && ename && ebloodgroup && edesignation && eemail && econtact && eaddress && ebranch){
                var oNewEmployee = {
                    eid : eid,
                    ename : ename,
                    ebloodgroup: ebloodgroup,
                    edesignation : edesignation,
                    eemail : eemail,
                    econtact : econtact,
                    eaddress : eaddress,
                    ebranch : ebranch
                }
                var oModel = this.getView().getModel();
                var aEmployees = oModel.getProperty("/Employee");
                aEmployees.push(oNewEmployee);
                    // Update the model with the new data
                oModel.setProperty("/Employee", aEmployees);
                that.onCancel();
                that.createDialog.close();
            }else{
                sap.m.MessageToast.show("Please fill in all the fields.");
            }
            
        },
        onCancel: function(){
            sap.ui.getCore().byId("eid").setValue("")
            sap.ui.getCore().byId("e_name").setValue("")
            sap.ui.getCore().byId("e_bloodgrp").setValue("")
            sap.ui.getCore().byId("e_des").setValue()
            sap.ui.getCore().byId("e_email").setValue("")
            sap.ui.getCore().byId("e_contact").setValue("")
            sap.ui.getCore().byId("e_address").setValue("")
            sap.ui.getCore().byId("e_branch").setValue("")
        },
        updateBtn: function(oEvent){

            if(!that.updateDialog){
                that.updateDialog = sap.ui.xmlfragment("crudoperations.fragments.fragmentUpdate", that);
            }

            var oContext = oEvent.getSource().getBindingContext().getObject();
            
            sap.ui.getCore().byId("updateId").setValue(oContext.eid);
            sap.ui.getCore().byId("updateName").setValue(oContext.ename);
            sap.ui.getCore().byId("updateBloodgrp").setValue(oContext.ebloodgroup);
            sap.ui.getCore().byId("updateDes").setValue(oContext.edesignation);
            sap.ui.getCore().byId("updateEmail").setValue(oContext.eemail);
            sap.ui.getCore().byId("updateContact").setValue(oContext.econtact);
            sap.ui.getCore().byId("updateAddress").setValue(oContext.eaddress);
            sap.ui.getCore().byId("updateBranch").setValue(oContext.ebranch);
            
            that.updateDialog.open();

        },
        onSave: function(){
            var eid = sap.ui.getCore().byId("updateId").getValue();
            var eName = sap.ui.getCore().byId("updateName").getValue();
            var eBloodgroup = sap.ui.getCore().byId("updateBloodgrp").getValue();
            var eDes = sap.ui.getCore().byId("updateDes").getValue();
            var eEmail = sap.ui.getCore().byId("updateEmail").getValue();
            var eContact = sap.ui.getCore().byId("updateContact").getValue();
            var eAddress = sap.ui.getCore().byId("updateAddress").getValue();
            var eBranch = sap.ui.getCore().byId("updateBranch").getValue();
    
            if (eid && eName && eBloodgroup && eDes && eEmail && eContact && eAddress && eBranch) {
                var oModel = this.getView().getModel();
                var aEmployees = oModel.getProperty("/Employee");
                var iIndex = aEmployees.findIndex(employee => employee.eid === eid);
                if (iIndex !== -1) {
                    aEmployees[iIndex] = {
                        eid: eid,
                        ename: eName,
                        ebloodgroup : eBloodgroup,
                        edesignation: eDes,
                        eemail: eEmail,
                        econtact: eContact,
                        eaddress: eAddress,
                        ebranch : eBranch
                    };
                    oModel.setProperty("/Employee", aEmployees);
                    sap.m.MessageToast.show("Record updated successfully!");
                } else {
                    sap.m.MessageToast.show("Employee not found!");
                }
            } else {
                sap.m.MessageToast.show("Please fill in all the fields.");
            }
            that.updateDialog.close();
        },

           
        deleteBtn: function(oEvent){
            var oContext = oEvent.getSource().getBindingContext().getObject();
            var oModel = this.getView().getModel();
            var aEmployees = oModel.getProperty("/Employee");
            var iIndex = aEmployees.findIndex(employee => employee.eid === oContext.eid);
                if (iIndex !== -1) {
                    sap.m.MessageBox.confirm("Are you sure you want to delete this record?", {
                        title: "Confirm",
                        onClose: function (sAction) {
                            if (sAction === sap.m.MessageBox.Action.OK) {
                                aEmployees.splice(iIndex, 1);
                                oModel.setProperty("/Employee", aEmployees);
                                sap.m.MessageToast.show("Record deleted successfully!");
                            }
                        }
                    });
                } else {
                    sap.m.MessageToast.show("Record not found!");
                }
        },

        onClose: function(){
            that.createDialog.close();
        },
        onCancel1:function(){
            that.updateDialog.close();
        }
    });
});