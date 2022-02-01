import * as React from 'react';
import Cell from './tableCellComponent';

export interface TableRowProperities {
    cells: string[]    // На вход ожидаем массив из чисел/текста
}

export interface TableRowState {
    
}

export class Row extends React.Component<TableRowProperities, TableRowState> {
    // Конструктор компонента
    constructor(props) {
        super(props);
    };

    // updateRow = (text, i) => {
    //     let newCells = this.props.cells;
    //     newCells[i] = text;
    //     this.setState({cells: newCells});
    // };

    // eachCell = (cell, i) => {
    //     return (
    //         <Cell key={i} cellValue={cell} />
    //     );
    // };

    // Функция отрисовки строки таблицы
    render() {
        return (
            <div className='tableRow'>
                { 
                    this.props.cells.map( 
                        cell => { 
                            return React.createElement(Cell, {cellValue: {cell}})
                        }
                    )
                }
            </div>
        )
    }
}

export default Cell;