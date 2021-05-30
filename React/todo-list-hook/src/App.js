import { React, useState, useEffect } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';


function App() {
   
  //create state
  const [todoItems, setTodo] = useState([
    { 
      id: 1,
      title: "Job 1",
      isEditing: false, 
      isCompleted: false
    }, {
      id: 2,
      title: "Job 2",
      isEditing: false, 
      isCompleted: true
    }, { 
      id: 3,
      title: "Job 3",
      isEditing: false, 
      isCompleted: false
    }
  ])
    
  const FirstLoad = () => {
    console.log("First");
    useEffect(() => {
      window.localStorage.setItem('listItem', JSON.stringify(todoItems));
    }, []);
  }
  

  //to mark complete function
  const findIndex = (listTodoItems, item) => {
    for(let i = 0; i < listTodoItems.length; i++) {
      if(listTodoItems[i].id === item.id) {
        return i;
      }
    }
  }

  const onItemClicked = (item) => {
    const isCompleted = item.isCompleted;
    const  listTodoItems  = JSON.parse(window.localStorage.getItem('listItem'));
    
    const index = findIndex(todoItems, item);
    const newState = [
      ...listTodoItems.slice(0, index),
      {
        ...item,
        isCompleted: !isCompleted
      }, 
      ...listTodoItems.slice(index + 1)
    ];
    setTodo(newState);  
  }

  // useEffect(() => {
  //   window.localStorage.clear();
  //   window.localStorage.setItem('listItem', JSON.stringify(todoItems));
  // });
  
  //double click to edit text
  const onDoubleClick = (item) => {
    const index = todoItems.indexOf(item);
    setTodo([
      ...todoItems.slice(0, index),
      { 
        ...item, 
        isEditing: true, 
        isCompleted: item.isCompleted
      },
      ...todoItems.slice(index + 1)
    ]);
  }

  //save text afer edit (click outside textbox)
  const onChange = (event, item) => {
    const text = event.target.value;
    const isCompleted = item.isCompleted;
    const index = findIndex(todoItems, item);
    const newState = [
      ...todoItems.slice(0, index),
      {
        ...item,
        title: text,
        isEditing: true,
        isCompleted: isCompleted
      }, 
      ...todoItems.slice(index + 1)
    ];
    setTodo(newState);
  }

  const onBlur = (item) => {
    const text = item.title;
    const isCompleted = item.isCompleted;
    const listTodoItems = JSON.parse(window.localStorage.getItem('listItem'));
   
    const index = findIndex(listTodoItems, item);
    
    const newState = [
      ...listTodoItems.slice(0, index),
      {
        ...item,
        title: text,
        isEditing: false,
        isCompleted: isCompleted
      }, 
      ...listTodoItems.slice(index + 1)
    ];
    window.localStorage.clear();
    window.localStorage.setItem('listItem', JSON.stringify(newState));
    setTodo(newState);
  }
  
  //delete todo 
  const onDelete = (item) => {
    const listTodoItems = JSON.parse(window.localStorage.getItem('listItem'));
    const index = findIndex(todoItems, item);
    const newState = [
      ...listTodoItems.slice(0, index),
      ...listTodoItems.slice(index + 1)
    ];
    window.localStorage.clear();
    window.localStorage.setItem('listItem', JSON.stringify(newState));
    setTodo(newState);
  }

  //add todo
  const OnPressEnter = (event) => {
    if(event.key === 'Enter') {
      let listTodoItems = JSON.parse(window.localStorage.getItem('listItem'));
      const n = listTodoItems.length + 1;
      listTodoItems.push({
          id: n,
          title: event.target.value, 
          isEditing: false,
          isCompleted: false
      });
      setTodo(listTodoItems);
      event.target.value = "";
      window.localStorage.clear();
      window.localStorage.setItem('listItem', JSON.stringify(listTodoItems));
    }        
    
  } 

  //click image to complete all
  const chooseAll = () => {
    let count = 0
    
    let listTodoItems = JSON.parse(window.localStorage.getItem('listItem'));
    for(let item of listTodoItems) {
      if(item.isCompleted === true) {
        count++;
      }
    }
    if(count === listTodoItems.length) {
      for(let item of listTodoItems) {
        item.isCompleted = false;
      }
    } else {
      for(let item of listTodoItems) {
        item.isCompleted = true;
      }
    }
    const newState = listTodoItems;
    console.log(newState);

    setTodo(newState);   
   
  }

  useEffect(() => {
    window.localStorage.clear();
    window.localStorage.setItem('listItem', JSON.stringify(todoItems));
  });

  //show all todo
  const allFunc = () => {
    setTodo(JSON.parse(window.localStorage.getItem('listItem')));
  }

  const activeFunc = () => {
    const listTodoItems = JSON.parse(window.localStorage.getItem('listItem'));
    let n = listTodoItems.length;
    for(let i = 0; i < n; i++) {
      if(listTodoItems[i].isCompleted === true) {
        listTodoItems.splice(i, 1);
        i--;
        n--;
      }
    }

    const newState = listTodoItems;
    setTodo(newState);
  }

  const completeFunc = () => {
    const listTodoItems = JSON.parse(window.localStorage.getItem('listItem'));
    let n = listTodoItems.length;
    for(let i = 0; i < n; i++) {
      if(listTodoItems[i].isCompleted === false) {
        listTodoItems.splice(i, 1);
        i--;
        n--;
      }
    }

    const newState = listTodoItems;
    setTodo(newState);
  }

  const clearCompleted = () => {
    const listTodoItems = JSON.parse(window.localStorage.getItem('listItem'));
    let n = listTodoItems.length;
    for(let i = 0; i < n; i++) {
      if(listTodoItems[i].isCompleted === true) {
        listTodoItems.splice(i, 1);
        i--;
        n--;
      }
    }

    const newState = listTodoItems;
    setTodo(newState);
    window.localStorage.clear();
    window.localStorage.setItem('listItem', JSON.stringify(newState));
  }


  const countActive = () => {
    let n = todoItems.length;
    let count = 0;
    for(let i = 0; i < n; i++) {
      if(todoItems[i].isCompleted === true) {
        count++;
      }
    }
    return n - count;
  }

  const numItem = countActive();
  FirstLoad();

  return (
    <div className="App"> 
      <p className="title">todos</p>
      <TodoInput onKeyUp={OnPressEnter} chooseAll={chooseAll}/>
      {
        todoItems.map((item, index) => 
          <TodoItem 
          key={index} 
          item={item} 
          onClick={() => onItemClicked(item)}
          onDoubleClick={() => onDoubleClick(item)}
          onChange={(event) => onChange(event, item)}
          onBlur={() => onBlur(item)}
          onDelete={() => onDelete(item)}/>)
      }
      <TodoFilter 
      numItem={numItem}
      todoItems={todoItems}
      allFunc={allFunc}
      activeFunc={activeFunc}
      completeFunc={completeFunc}
      clearCompleted={clearCompleted}
      />
    </div>
  );
}

export default App;
