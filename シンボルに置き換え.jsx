/*
シンボルに置き換え.jsx
Copyright (c) 2015 Toshiyuki Takahashi
Released under the MIT license
http://opensource.org/licenses/mit-license.php
http://www.graphicartsunit.com/
ver. 0.5.5
*/
(function() {

	var SCRIPT_TITLE = 'シンボルに置き換え';
	var SCRIPT_VERSION = '0.5.5';

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

		thisObj.targetPanel = thisObj.dlg.add('panel', undefined, 'シンボル：');
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

		thisObj.cancel = thisObj.buttonGroup.add('button', undefined, 'キャンセル', {name: 'cancel'});
		thisObj.ok = thisObj.buttonGroup.add('button', undefined, '実行', { name:'ok'});
		function previewRefresh(event) {
			try {
				settings.symbolIndex = event.target.selection;
				thisObj.preview();
			} catch(e) {
				alert('エラーが発生して処理を実行できませんでした\nエラー内容：' + e);
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
				alert('エラーが発生して処理を実行できませんでした\nエラー内容：' + e);
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
		alert('オブジェクトが選択されていません\n少なくとも1つ以上のオブジェクトを選択してください');
	} else if (!lay.visible || lay.locked) {
		alert('選択レイヤーがロックされているか非表示になっています\nレイヤーのロック、非表示を解除するか、別のレイヤーを選択してください');
	} else if (symbolName.length < 1) {
		alert('使用するシンボルがありません\n事前に1つ以上のシンボルを登録してください');
	} else if (sel.length > settings.maxSymbols) {
		if(confirm(sel.length + '個のオブジェクトが選択されています\n対象のオブジェクト数が多いと時間がかかる可能性があります。一度に処理するのは ' + settings.maxSymbols + ' 個以下が推奨です。このまま継続しますか？')) {
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
			addedSymbol = lay.symbolItems.add(symbols[settings.symbolIndex]);
			var tb = targetitems[i].geometricBounds;
			var sb = addedSymbol.geometricBounds;
			addedSymbol.top = tb[3] - ((tb[3] - tb[1])/2) - ((sb[3] - sb[1])/2);
			addedSymbol.left = tb[2] - ((tb[2] - tb[0])/2) - ((sb[2] - sb[0])/2);
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