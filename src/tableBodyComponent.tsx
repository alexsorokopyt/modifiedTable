import * as React from 'react';
import Row from './tableRowComponent';
import HeaderRow from './headerRowComponent';

import powerbi from "powerbi-visuals-api";
import DataViewTableRow = powerbi.DataViewTableRow;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;

interface TableBodyProperities {
    rowsDataView: DataViewTableRow[],
    headersDataView: DataViewMetadataColumn[]
}

interface TableBodyState {
    
}

export class TableBody extends React.Component<TableBodyProperities, TableBodyState> {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className='table'>
                <HeaderRow headersData={this.props.headersDataView} />
                <div className='tableBody'>
                    {
                        this.props.rowsDataView.map(
                            (tableRowData) => { 
                                return <Row cells={tableRowData} />
                            }
                        )
                    }
                </div>
            </div>
        )
    }
}

export default TableBody;