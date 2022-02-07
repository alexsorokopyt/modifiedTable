import * as React from 'react';
import HeaderCell from './headerCellComponent';

import powerbi from "powerbi-visuals-api";
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;

interface HeaderRowProperities {
    headersData: DataViewMetadataColumn[]
}

interface HeaderRowState {
    
}

export class HeaderRow extends React.Component<HeaderRowProperities, HeaderRowState> {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className='headersRow'>
                { 
                    this.props.headersData.map( 
                        currentHeaderData => { 
                            return React.createElement(
                                HeaderCell,
                                { headerName: currentHeaderData['displayName']}
                            )
                        }
                    )
                }
            </div>
        )
    }
}

export default HeaderRow;