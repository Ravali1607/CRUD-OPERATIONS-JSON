/*global QUnit*/

sap.ui.define([
	"crud_operations/controller/CRUD.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CRUD Controller");

	QUnit.test("I should test the CRUD controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
