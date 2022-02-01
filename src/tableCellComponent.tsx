import * as React from 'react';

export interface TableCellProperities {
    cell: string;
}

export interface TableCellState {
    editMode: boolean;
}

export const initialCellState: TableCellState = {
    editMode: false
}

export class Cell extends React.Component<TableCellProperities, TableCellState> {
    // Конструктор компонента
    constructor(props) {
        super(props);
        this.state = initialCellState;
    };

    private newCellValueRef = React.createRef<HTMLTextAreaElement>();

    // Функция отлова двойного нажатия
    handleDoubleClick = () => {
        this.setState({editMode: !this.state.editMode});
    };

    // Функция подтверждения внесения изменений в ячейку
    save = () => {
        let newValue = this.newCellValueRef.current.value
        this.setState({editMode: false});
    };

    // Отрисовка стандартного вида ячейки
    renderDefaultCell = () => {
        return (
            <div className='tableCell' onDoubleClick={this.handleDoubleClick}>
                {this.props.cell} 
            </div>
        )
    };

    // Отрисовка режима редактирования ячейки
    renderEditMode = () => {
        return (
            <div className='tableCellEditMode'>
                
            </div>
        )
        // <textarea ref={this.newCellValueRef}>{this.props.children}</textarea>
        //         <button onClick={this.save} className='btn success'>✓</button>
    };

    // Функция отрисовки ячейки таблицы
    render() {
        if (this.state.editMode) {
            return this.renderEditMode ();
        } else {
            return this.renderDefaultCell ();
        }
    };

}

export default Cell;