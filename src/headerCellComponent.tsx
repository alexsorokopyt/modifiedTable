import * as React from 'react';

interface HeaderCellProperities {
    headerName: string;
}

interface HeaderCellState {
    
}

export class HeaderCell extends React.Component<HeaderCellProperities, HeaderCellState> {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className='headersCell'>
                {this.props.headerName} 
            </div>
        )
    };

}

export default HeaderCell;