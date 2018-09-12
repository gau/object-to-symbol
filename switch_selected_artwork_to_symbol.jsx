/*
switch_selected_artwork_to_symbol.jsx
Copyright (c) 2015 - 2018 Toshiyuki Takahashi
Released under the MIT license
http://opensource.org/licenses/mit-license.php
http://www.graphicartsunit.com/
*/
(function() {

	var SCRIPT_TITLE = 'Switch selected artwork to Symbol';
	var SCRIPT_VERSION = '0.5.6';

	// Settings
	var settings = {
		'symbolIndex' : 0,
		'maxSymbols' : 20
	};

	var doc = app.activeDocument;
	var lay = doc.activeLayer;
	var sel = doc.selection;
	var symbols = doc.symbols;
	var symbolName = getSymbolNames(symbols);

	// UI dialog
	function mainDialog() {
		this.init();
		return this;
	};
	mainDialog.prototype.init = function() {

		var unit = 20;
		var thisObj = this;

		thisObj.dlg = new Window('dialog', SCRIPT_TITLE + ' - ver.' + SCRIPT_VERSION);
		thisObj.dlg.margins = [unit * 1.5, unit * 1.5, unit * 1.5, unit * 1.5];

		thisObj.targetPanel = thisObj.dlg.add('panel', undefined, 'Symbols:');
		thisObj.targetPanel.margins = [unit, unit, unit, unit];
		thisObj.targetPanel.alignment = 'left';
		thisObj.targetPanel.orientation = 'row';

		thisObj.buttonGroup = thisObj.dlg.add('group', undefined);
		thisObj.buttonGroup.margins = [unit, unit * 0, unit, unit * 0];
		thisObj.buttonGroup.alignment = 'center';
		thisObj.buttonGroup.orientation = 'row';

		thisObj.selectedSymbol = thisObj.targetPanel.add("listbox", undefined, symbolName);
		thisObj.selectedSymbol.selection = settings.symbolIndex;
		thisObj.selectedSymbol.size = [350, 150];

		thisObj.cancel = thisObj.buttonGroup.add('button', undefined, 'Cancel', {name: 'cancel'});
		thisObj.ok = thisObj.buttonGroup.add('button', undefined, 'Replace', { name:'ok'});
		function previewRefresh(event) {
			try {
				settings.symbolIndex = event.target.selection;
				thisObj.preview();
			} catch(e) {
				alert('Encountered error and was unable to proceed.\n' + e);
			}
		}

		thisObj.selectedSymbol.addEventListener('change', previewRefresh);
		thisObj.selectedSymbol.dispatchEvent(new UIEvent('change'));
		thisObj.selectedSymbol.active = true;

		thisObj.ok.onClick = function() {
			try {
				settings.symbolIndex = thisObj.selectedSymbol.selection.index;
				mainProcess(false);
				thisObj.closeDialog();
			} catch(e) {
				alert('Encountered error and was unable to proceed.\n' + e);
			}
		}
		thisObj.cancel.onClick = function() {
			thisObj.closeDialog();
		}
	};
	mainDialog.prototype.showDialog = function() {
		this.dlg.show();
	};
	mainDialog.prototype.closeDialog = function() {
		this.dlg.close();
	};
	mainDialog.prototype.preview = function() {
		mainProcess(true);
		app.redraw();
		app.undo();
	};
	var dialog;
	if (!doc || sel.length < 1) {
		alert('No objects selected.\nPlease select 1 or more objects.');
	} else if (!lay.visible || lay.locked) {
		alert('The selected layer is locked, or is hidden.\nPlease unlock the layer, make sure it\'s visible in the Layers panel, or select another layer.');
	} else if (symbolName.length < 1) {
		alert('No Symbols available to make the replacement.\nPlease register one or more Symbols.');
	} else if (sel.length > settings.maxSymbols) {
		if(confirm(sel.length + ' objects selected.\nThe processing may take some time. For normal processing time, please select ' + settings.maxSymbols + ' or fewer objects. Proceed anyway?')) {
			dialog = new mainDialog();
			dialog.showDialog();
		}
	} else {
		dialog = new mainDialog();
		dialog.showDialog();
	}

	// Main process
	function mainProcess(isPreview) {
		var targetitems = getTargetItems(sel);
		for (var i = 0; i < targetitems.length; i++) {
			var addedSymbol = targetitems[i].layer.symbolItems.add(symbols[settings.symbolIndex]);
			var tb = targetitems[i].geometricBounds;
			var sb = addedSymbol.geometricBounds;
			addedSymbol.top = tb[3] - ((tb[3] - tb[1])/2) - ((sb[3] - sb[1])/2);
			addedSymbol.left = tb[2] - ((tb[2] - tb[0])/2) - ((sb[2] - sb[0])/2);
			addedSymbol.move(targetitems[i], ElementPlacement.PLACEBEFORE);
			if(isPreview) {
				targetitems[i].hidden = true;
			} else {
				addedSymbol.selected = true;
				targetitems[i].remove();
			}
		}
	}

	// Get target items
	function getTargetItems(obj) {
		var items = [];
		for (var i = 0; i < obj.length; i++) {
			items.push(obj[i]);
		}
		return items;
	}

	// Get symbol names
	function getSymbolNames(obj) {
		var names = [];
		for (var i = 0; i < obj.length; i++) {
			names.push(obj[i].name);
		}
		return names;
	}
}());