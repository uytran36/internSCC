import React, { Component } from 'react';
import './TodoItem.css'
class TodoItem extends Component {
    render() {
        const {item, onClick} = this.props;
        let className = "TodoItem";
        if(item.isCompleted === true) {
            className += "-completed";
        }
        return (
            <div onClick={onClick} className={className}>
                <p>{item.title}</p>
            </div>
        );        
    }
}

export default TodoItem;