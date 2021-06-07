import {React, Component} from 'react';
import './TodoFilter.css';
import { Link } from 'react-router-dom';

class TodoFilter extends Component {
    render() {
        const {numItem, clearCompleted, routeFunc} = this.props;
        return( 
            <div className="TodoFilter">
                <p className="numItem">{numItem} left</p>
                <div className="filter" onClick={routeFunc}>
                    <Link to="/">All</Link>
                    <Link to="/active">Active</Link>
                    <Link to="/completed">Completed</Link>
                </div>
                <button className="clearCompleted" onClick={clearCompleted}>Clear completed</button>
            </div>
        );
    }   
}

export default TodoFilter;