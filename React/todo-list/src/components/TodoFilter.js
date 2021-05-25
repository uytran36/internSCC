import {React, Component} from 'react';
import './TodoFilter.css';

class TodoFilter extends Component {
    render() {
        const {numItem, allFunc, activeFunc, completeFunc, clearCompleted} = this.props;
        return( 
            <div className="TodoFilter">
                <p className="numItem">{numItem} left</p>
                <div className="filter">
                    <button className="all" onClick={allFunc}>All</button>
                    <button className="active" onClick={activeFunc}>Active</button>
                    <button className="complete" onClick={completeFunc}>Complete</button>
                </div>
                <button className="clearCompleted" onClick={clearCompleted}>Clear completed</button>
            </div>
        );
    }   
}

export default TodoFilter;