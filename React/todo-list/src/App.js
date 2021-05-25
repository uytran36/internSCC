import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';

class App extends Component {
  constructor() {
    super();
    //create state
    this.state = { todoItems: [
      { 
        title: "Job 1",
        isEditing: false, 
        isCompleted: false
      }, {
        title: "Job 2",
        isEditing: false, 
        isCompleted: true
      }, { 
        title: "Job 3",
        isEditing: false, 
        isCompleted: false
      }
    ]};

    window.localStorage.setItem('listItem', JSON.stringify(this.state));

    //create function non parameter
    this.onPressEnter = this.onPressEnter.bind(this);
    this.chooseAll = this.chooseAll.bind(this);
    this.allFunc = this.allFunc.bind(this);
    this.activeFunc = this.activeFunc.bind(this);
    this.completeFunc = this.completeFunc.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  //to check complete function
  onItemClicked(item) {
    return() => {
      const isCompleted = item.isCompleted;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({ todoItems: [
        ...todoItems.slice(0, index),
        { 
          ...item, 
          isCompleted: !isCompleted 
        },
        ...todoItems.slice(index + 1)
      ]}, () => {
        window.localStorage.clear();
        window.localStorage.setItem('listItem', JSON.stringify(this.state));
      });
    }
  }

  //double click to edit text
  onDoubleClick(item) {
    return() => {
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({ todoItems: [
        ...todoItems.slice(0, index),
        { 
          ...item, 
          isEditing: true, 
          isCompleted: item.isCompleted
        },
        ...todoItems.slice(index + 1)
      ]}, () => {
        window.localStorage.clear();
        window.localStorage.setItem('listItem', JSON.stringify(this.state));
      });
    }
  }

  //save text afer edit (click outside textbox)
  onBlur(event, item) {
    //return() => {
      var text = event.target.value;
      const isCompleted = item.isCompleted;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({ todoItems: [
        ...todoItems.slice(0, index),
        { 
          title: text,
          isEditing: false, 
          isCompleted: isCompleted 
        },
        ...todoItems.slice(index + 1)
      ]}, () => {
        window.localStorage.clear();
        window.localStorage.setItem('listItem', JSON.stringify(this.state));
      });
    //}
  }

  //add todo
  onPressEnter(event) {
    if(event.key === 'Enter') {
        var { todoItems } = this.state;
        
        todoItems.push({
            title: event.target.value, 
            isEditing: false,
            isCompleted: false
        });
        this.setState({todoItems: todoItems}, () => {
          window.localStorage.clear();
          window.localStorage.setItem('listItem', JSON.stringify(this.state));
        });
        event.target.value = "";
    }        
  } 

  //click image to complete all
  chooseAll() {
    var { todoItems } = this.state;
    let count = 0
    for(let item of todoItems) {
      if(item.isCompleted === true) {
        count++;
      }
    }
    if(count === todoItems.length) {
      for(let item of todoItems) {
        item.isCompleted = false;
      }
    } else {
      for(let item of todoItems) {
        item.isCompleted = true;
      }
    }

    var newState = {todoItems: todoItems};

    this.setState(newState, () => {
      window.localStorage.clear();
      window.localStorage.setItem('listItem', JSON.stringify(this.state));
    });
  }

  //show all todo
  allFunc() {
    this.setState(JSON.parse(window.localStorage.getItem('listItem')));
  }

  activeFunc() {
    var { todoItems } = JSON.parse(window.localStorage.getItem('listItem'));
    var n = todoItems.length;
    for(var i = 0; i < n; i++) {
      if(todoItems[i].isCompleted === true) {
        todoItems.splice(i, 1);
        i--;
        n--;
      }
    }

    var newState = {todoItems: todoItems};
    this.setState(newState);
  }

  completeFunc() {
    var { todoItems } = JSON.parse(window.localStorage.getItem('listItem'));
    var n = todoItems.length;
    for(var i = 0; i < n; i++) {
      if(todoItems[i].isCompleted === false) {
        todoItems.splice(i, 1);
        i--;
        n--;
      }
    }

    var newState = {todoItems: todoItems};
    this.setState(newState);
  }

  clearCompleted() {
    var { todoItems } = JSON.parse(window.localStorage.getItem('listItem'));
    var n = todoItems.length;
    for(var i = 0; i < n; i++) {
      if(todoItems[i].isCompleted === true) {
        todoItems.splice(i, 1);
        i--;
        n--;
      }
    }

    var newState = {todoItems: todoItems};
    this.setState(newState, () => {
      window.localStorage.clear();
      window.localStorage.setItem('listItem', JSON.stringify(this.state));
    });
  }

  countActive() {
    var { todoItems } = JSON.parse(window.localStorage.getItem('listItem'));
    var n = todoItems.length;
    for(var i = 0; i < n; i++) {
      if(todoItems[i].isCompleted === true) {
        todoItems.splice(i, 1);
        i--;
        n--;
      }
    }
    return n;
  }

  render() {
    const { todoItems } = this.state;
    var numItem = this.countActive();
    return (
      <div className="App"> 
        <h1>todos</h1>
        <TodoInput onKeyUp={this.onPressEnter} chooseAll={this.chooseAll}/>
        {
          todoItems.map((item, index) => 
            <TodoItem 
            key={index} 
            item={item} 
            onClick={this.onItemClicked(item)}
            onDoubleClick={this.onDoubleClick(item)}
            onBlur={(event) => this.onBlur(event, item)}/>)
        }
        <TodoFilter 
        numItem={numItem}
        todoItems={todoItems}
        allFunc={this.allFunc}
        activeFunc={this.activeFunc}
        completeFunc={this.completeFunc}
        clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }

}

export default App;
