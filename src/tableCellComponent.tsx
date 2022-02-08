import * as React from 'react';

import powerbi from "powerbi-visuals-api";
import PrimitiveValue = powerbi.PrimitiveValue;

interface TableCellProperities {
    cellValue: PrimitiveValue
}

interface TableCellState {
    editMode: boolean;
    cellValue: PrimitiveValue
}

export class Cell extends React.Component<TableCellProperities, TableCellState> {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            cellValue: this.props.cellValue
        };
    };

    private newEditValueRef = React.createRef<HTMLInputElement>();

    handleDoubleClick = () => {
        this.setState({editMode: !this.state.editMode});
    };

    save = () => {
        this.setState(
            {
                editMode: false,
                cellValue: this.state.cellValue
            }
        );
    };

    renderDefaultCell = () => {      
        return (
            <div className='tableCell' onDoubleClick={this.handleDoubleClick}>
                {this.state.cellValue} 
            </div>
        )
    };

    onInputFieldChange(value){
        this.setState({
             cellValue: value
        });
    };

    renderEditMode = () => {
        return (
            <div className='tableCellEditMode'>
                <input 
                    ref={this.newEditValueRef} 
                    className="inputField" 
                    type="text" 
                    value={this.state.cellValue.toString()} 
                    onChange={element => this.onInputFieldChange(element.target.value)}
                />
                <button onClick={this.save} className='btn success'>✓</button>
            </div>
        ) 
        // <textarea ref={this.newEditValueRef} className="edittedTableCell">{this.props.children}</textarea>
        //<button onClick={this.save} className='btn success'>✓</button>
    };

    render() {
        if (this.state.editMode) {
            return this.renderEditMode ();
        } else {
            return this.renderDefaultCell ();
        }
    };

}

export default Cell;