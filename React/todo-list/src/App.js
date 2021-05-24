import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
class App extends Component {
  constructor() {
    super();
    this.state = { todoItems: [
      { title: 'Job 1', isCompleted : false },
      { title: 'Job 2', isCompleted : true },
      { title: 'Job 3', isCompleted : false }
    ]};
  }

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
      ]});
      console.log(this.state);
    }
  }

  render() {
    const { todoItems } = this.state;
    return (
      <div className="App"> 
        {
          todoItems.map((item, index) => 
            <TodoItem 
            key={index} 
            item={item} 
            onClick={this.onItemClicked(item)}/>)
        }
      </div>
    );
  }

}

export default App;
