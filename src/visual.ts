/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewTable = powerbi.DataViewTable;
import DataViewTableRow = powerbi.DataViewTableRow;
import PrimitiveValue = powerbi.PrimitiveValue;

import { VisualSettings } from "./settings";

export class Visual implements IVisual {
    // HTMLElement - базовый интерфейс для взаимодействия с html элементами   
    private settings: VisualSettings;
    private target: HTMLElement;
    private generalDiv: HTMLElement;
    private table: HTMLParagraphElement;
    private events: powerbi.extensibility.IVisualEventService;

    constructor(options: VisualConstructorOptions) {
        // element - свойство VisualConstructorOptions, которое содержит в себе HTML элемент с нашим визуалом
        this.target = options.element;
        console.log('Visual initialized.', options.host);
        // Add table to visual
        if (document) {
            this.table = document.createElement("table");
            this.target.appendChild(this.table);
        }
    }

    public update(options: VisualUpdateOptions) {  
        const dataView: DataView = options.dataViews[0];
        const tableDataView: DataViewTable = dataView.table;
        const columnsTableDataView = tableDataView.columns;
        const rowsTableDataView = tableDataView.rows;
      
        console.log('Now we are in update method');


        if (!options.dataViews
            && !dataView
            && !tableDataView
            && !rowsTableDataView
            && !columnsTableDataView
            && !dataView.metadata
        ) {
            console.log('Test 1 FAILED. No data to draw table.');
            return;
        }              

        // Processing constant addition of rows to the bottom of table
        while (this.table.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }

        // Add headers row
        // Structure: thead (header area) => tr (header row) => th (header cell)
        const tableHeaderArea = document.createElement("thead");
        const tableHeaderRow = document.createElement("tr");
        columnsTableDataView.forEach(
            (column: DataViewMetadataColumn) => {
                const tableHeaderColumn = document.createElement("th");
                tableHeaderColumn.innerText = column.displayName
                tableHeaderRow.appendChild(tableHeaderColumn);
            }
        );
        tableHeaderArea.appendChild(tableHeaderRow);
        this.table.appendChild(tableHeaderArea);
        
        // Add rows and data
        // Structure: tbody (body area) => tr (data row) => td (data cell)
        const tableBodyArea = document.createElement("tbody");

        rowsTableDataView.forEach(
            (row: DataViewTableRow) => {
                const tableRow = document.createElement("tr");
                row.forEach(
                    (columnValue: PrimitiveValue) => {
                        const cell = document.createElement("td");
                        cell.innerText = ( columnValue == null ? "" : columnValue.toString() );
                        tableRow.appendChild(cell);
                    }
                )
                tableBodyArea.appendChild(tableRow);
            }
        );
        this.table.appendChild(tableBodyArea);
    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */

    public destroy(): void {
       console.log('Visual has been destroyed') 
    }
    
    // List of all active formatting options
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }

}