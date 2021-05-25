import React, { Component } from 'react';
import './TodoItem.css'
import uncheck from '../img/uncheck.png';
import check from '../img/check.png';
class TodoItem extends Component {
    render() {
        const {item, onClick, onDoubleClick, onBlur} = this.props;
        let className = "TodoItem";
        var url = uncheck;
        if(item.isCompleted === true) {
            className += "-completed";
            url = check;
        }

        if(item.isEditing === true) {
            className += " editing";
        } 

        return (
            <div className={className}>
                <img src={url} alt="" onClick={onClick} />
                <p onDoubleClick={onDoubleClick}>{item.title}</p>
                <input type="text" 
                className="edit" 
                defaultValue={item.title} 
                onBlur={onBlur}></input>
            </div>
        );        
    }
}

export default TodoItem;