import React, { Component } from 'react';
import './TodoInput.css'
import check from '../img/check.png';
import PropTypes from "prop-types";

class TodoInput extends Component {
    render() {
        let url = check;
        const {onKeyUp, chooseAll} = this.props;
        return (
            <div className="TodoInput">
                <img src={url} alt="" onClick={chooseAll}/>
                <input type="text" placeholder="What needs to be done?" onKeyUp={onKeyUp}/>
            </div>
        );        
    }
}

TodoInput.propTypes = {
    onKeyUp: PropTypes.func,
    chooseAll: PropTypes.func
}

export default TodoInput;