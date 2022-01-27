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

import * as d3 from 'd3';
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

import { VisualSettings } from "./settings";

export class Visual implements IVisual {
    // HTMLElement - базовый интерфейс для взаимодействия с html элементами   
    private settings: VisualSettings;
    private createdVisual: Selection<HTMLElement>;

    constructor(options: VisualConstructorOptions) {
        this.createdVisual = d3
            .select(options.element)
            .append('div')
            .classed('createdVisualFrame', true);
    }

    public update(options: VisualUpdateOptions) {
        console.log('Update started');  
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        let viewport = options.viewport;
        this.createdVisual
            .attr('width', viewport.width)
            .attr('height', viewport.height);
        
        console.log('Width and height are setted');
        
        const dataView: DataView = options.dataViews[0];
        const tableDataView: DataViewTable = dataView.table;
        const columnsTableDataView = tableDataView.columns;
        const rowsTableDataView = tableDataView.rows;
        
        d3.selectAll('.tableArea').remove();      
        const tableArea = this.createdVisual
            .append('div')
            .classed('tableArea', true)

        const headersRow: Selection<HTMLElement> = tableArea
            .append('div')
            .classed('headersRow', true);
               
        columnsTableDataView.forEach(
            (column: DataViewMetadataColumn) => {
                headersRow
                    .append('div')
                    .classed('headersCell', true)
                    .text(column.displayName);
            }
        );
        
        const tableRowsArea = tableArea
            .append('div')
            .classed('tableRowsArea', true)

        rowsTableDataView.forEach(
            (row: DataViewTableRow) => {
                const tableRow: Selection<HTMLElement> = tableRowsArea
                    .append('div')
                    .classed('tableRow', true);
                row.forEach(
                    (columnValue: PrimitiveValue) => {
                        tableRow
                            .append('div')
                            .classed('tableCell', true)
                            .text(columnValue == null ? "" : columnValue.toString())
                    }
                )
            }
        )
    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    
    // List of all active formatting options
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }

}