import * as React from 'react';
import Cell from './tableCellComponent';

import powerbi from "powerbi-visuals-api";
import DataViewTableRow = powerbi.DataViewTableRow;
import PrimitiveValue = powerbi.PrimitiveValue;

interface TableRowProperities {
    cells: DataViewTableRow
}

interface TableRowState {
    
}

export class Row extends React.Component<TableRowProperities, TableRowState> {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <div className='tableRow'>
                { 
                    this.props.cells.map( 
                        (iterableValue) => { 
                            return React.createElement(Cell, {cellValue: iterableValue})
                        }
                    )
                }
            </div>
        )
    }
}

export default Row;