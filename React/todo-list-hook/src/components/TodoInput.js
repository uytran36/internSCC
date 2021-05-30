import React from 'react';
import './TodoInput.css'
import check from '../img/check.png';
function TodoInput(props) {

    let url = check;
    const {onKeyUp, chooseAll} = props;
    return (
        <div className="TodoInput">
            <img src={url} alt="" onClick={chooseAll}/>
            <input type="text" placeholder="What needs to be done?" onKeyUp={onKeyUp}/>
        </div>
    );        
  
}

export default TodoInput;