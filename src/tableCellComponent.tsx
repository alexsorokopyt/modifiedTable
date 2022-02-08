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

    private editRef = React.createRef<HTMLInputElement>();

    startEditMode = () => {
        this.setState({editMode: !this.state.editMode});
    };

    saveEdit = () => {
        this.setState(
            {
                editMode: false,
                cellValue: this.state.cellValue
            }
        );
    };

    changeBackground(highlightedCell) {
        highlightedCell.target.style.background = 'red';
    };

    resetBackground(highlightedCell) {
        highlightedCell.target.style.background = '';
    };

    renderInputField(value){
        this.setState({
             cellValue: value
        });
    };

    renderViewMode = () => {      
        return (
            <div 
                className='tableCell' 
                onDoubleClick={this.startEditMode}
                onMouseOver={this.changeBackground}
                onMouseLeave={this.resetBackground}
            >
                {this.state.cellValue} 
            </div>
        )
    };

    renderEditMode = () => {
        return (
            <div className='tableCellEditMode'>
                <input 
                    ref={this.editRef} 
                    className="inputField" 
                    type="text" 
                    value={this.state.cellValue.toString()} 
                    onChange={element => this.renderInputField(element.target.value)}
                />
                <button onClick={this.saveEdit} className='btn success'>✓</button>
            </div>
        ) 
    };

    render() {
        if (this.state.editMode) {
            return this.renderEditMode ();
        } else {
            return this.renderViewMode ();
        }
    };

}

export default Cell;