/*!
 * Ext JS GridFilter plugin v0.1
 * https://github.com/roberto-rodriguez/ExtJs_GridMultipageSelection
 *
 *
 * Copyright 2016 Roberto Rodriguez
 * Licensed under GNU General Public License v3.
 * http://www.gnu.org/licenses/
 *
 *
 * @class Ext.ux.grid.GridMultipageSelection
 * @extends Ext.AbstractPlugin
 *
 * Grid plugin that keeps the selection across the pages in the pagination grid.
 * Also includes a function named: getSelection() to the grid, which returns the
 * an array with the ids of the selected rows.
 *
 * The plugin assumes there is a column with  dataIndex: 'id'
 *
 *
 *
 Example:

 var grid = new Ext.grid.GridMultipageSelection({
 columns: [
 {
 text: "User ID",
 dataIndex: 'id',
 filter: true
 },
 {
 text: "First Name",
 dataIndex: 'firstName',
 filter: true
 },
 {
 text: "First Name",
 dataIndex: 'firstName',
 filter: lastName
 }
 ],
 selModel: {
 selType: 'checkboxmodel'
 }
 plugins: [
 {ptype: "gridMultipageSelection"}
 ]
 ...
 });
 */

Ext.define('Ext.ux.ts.grid.GridMultipageSelection', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.gridMultipageSelection',
    init: function (grid) {

        var me = this;
        grid.relayEvents(grid.down('pagingtoolbar'), ['beforechange', 'change']);
        grid.relayEvents(grid.selModel, ['selectionchange']);

        grid.addListener('beforechange', me.beforechange);
        grid.addListener('change', me.change);
        grid.addListener('selectionchange', me.selectionchange);

        grid.getAllSelections = function () {
            var me = this;
            var selection = [];

            for (var page in me['multipageSelection']) {
                Ext.each(me['multipageSelection'][page], function (i) {
                    selection.push(i);
                }, this);
            }

            return selection;
        };

    },
    beforechange: function () {
        var me = this;
        me['changingPage'] = true;
    },
    change: function () {
        var me = this;
        if (me['multipageSelection'] && me['multipageSelection'][me.store.currentPage]) {

            me.store.data.each(function (element, i) {
                if (me['multipageSelection'][me.store.currentPage].indexOf(element.data.properties_variation.id) >= 0) {
                    me.getSelectionModel().select(i, true, true);
                }
            }, this);
        }
        me['changingPage'] = false;
    },
    selectionchange: function (view, selectedRecords, opts) {
        var me = this;
        var grid = view.view.ownerCt;

        if (grid['changingPage']) {
            return;
        }

        var multipageSelection = grid['multipageSelection'] || {};

        multipageSelection[grid.store.currentPage] = [];

        Ext.each(selectedRecords, function (record) {
            multipageSelection[grid.store.currentPage].push(record.data.properties_variation.id);
        }, this);
        
        var all = 0;
        for(var index in multipageSelection) { 
            all += multipageSelection[index].length; 
        }

        grid.down('tbtext').setText('Kijelölve: '+all);
        multipageSelection;
        grid['multipageSelection'] = multipageSelection;
    },
    test: function () {
        alert('getSelection');
    }
});
