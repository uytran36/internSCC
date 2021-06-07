import { React, Component } from "react";
import "./TodoOld.css";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TodoGeneral from "./TodoGeneral";

class TodoOld extends Component {
  constructor() {
    super();
    //create state
    this.state = { todoItems: [] };

    //create function non parameter
    this.onPressEnter = this.onPressEnter.bind(this);
    this.chooseAll = this.chooseAll.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    //this.routeFunc = this.routeFunc.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
      .then((res) => {
        this.setState({ todoItems: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //add todo
  onPressEnter(event) {
    if (event.key === "Enter") {
      const { todoItems } = this.state;
      console.log(todoItems);
      const n = todoItems.length + 1;
      todoItems.push({
        id: n,
        title: event.target.value,
        isEditing: false,
        isCompleted: false,
      });
      this.setState({ todoItems: todoItems });
      axios
        .post("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data", {
          id: n,
          title: event.target.value,
          isEditing: false,
          isCompleted: false,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      event.target.value = "";
    }
  }

  //click image to complete all
  chooseAll() {
    const { todoItems } = this.state;

    let count = 0;
    for (let item of todoItems) {
      if (item.isCompleted === true) {
        count++;
      }
    }
    if (count === todoItems.length) {
      for (let item of todoItems) {
        item.isCompleted = false;
      }
    } else {
      for (let item of todoItems) {
        item.isCompleted = true;
      }
    }

    const newState = { todoItems: todoItems };
    this.setState(newState);

    let n = todoItems.length; //  set your counter to 1
    let i = 0;
    function myLoop() {
      setTimeout(function () {
        axios
          .put(
            "https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data/" +
              todoItems[i].id,
            {
              isCompleted: todoItems[i].isCompleted,
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        i++; //  increment the counter
        if (i < n) {
          myLoop();
        }
      }, 700);
    }

    myLoop();
  }

  //clear completed
  clearCompleted() {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
      .then((res) => {
        const todoItems = res.data;
        let todoList = [];
        for (let item of todoItems) {
          if (item.isCompleted === true) {
            axios
              .delete(
                "https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data/" +
                  item.id
              )
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            todoList.push(item);
          }
        }
        this.setState({ todoItems: todoList });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  countActive() {
    const { todoItems } = this.state;
    let n = todoItems.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
      if (todoItems[i].isCompleted === true) {
        count++;
      }
    }
    return n - count;
  }

  render() {
    const numItem = this.countActive();
    return (
      <div className="TodoOld">
        <Router>
          <TodoInput onKeyUp={this.onPressEnter} chooseAll={this.chooseAll} />
          <Switch>
            <Route exact path="/">
              <TodoGeneral path="" todoState={this.state} />
            </Route>
            <Route exact path="/active">
              <TodoGeneral path="active" todoState={this.state} />
            </Route>
            <Route exact path="/completed">
              <TodoGeneral path="completed" todoState={this.state} />
            </Route>
          </Switch>
          <TodoFilter numItem={numItem} clearCompleted={this.clearCompleted} />
        </Router>
      </div>
    );
  }
}

export default TodoOld;

