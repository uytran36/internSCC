import React, { Component } from 'react';
import './TodoItem.css'
import uncheck from '../img/uncheck.png';
import check from '../img/check.png';
import del from '../img/delete.png';

class TodoItem extends Component {
    render() {
        const {item, onClick, onDoubleClick, onChange, onBlur, onDelete} = this.props;
        let className = "TodoItem";
        var url = uncheck;
        var urlDel = del;
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
                value={item.title} 
                onChange={onChange}
                onBlur={onBlur}>
                </input>    
                <img className="delIcon" src={urlDel} alt="" onClick={onDelete} />
            </div>
        );        
    }
}

export default TodoItem;