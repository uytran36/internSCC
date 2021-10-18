import { React, Component } from "react";
import "./TodoOld.css";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TodoGeneral from "./TodoGeneral";

class TodoOld extends Component {
  constructor(props) {
    super(props);
    //create state
    this.state = { todoItems: [] };

    //create function non parameter
    this.onPressEnter = this.onPressEnter.bind(this);
    this.chooseAll = this.chooseAll.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.listAll = this.listAll.bind(this);
    this.listActive = this.listActive.bind(this);
    this.listCompleted = this.listCompleted.bind(this);
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

  //todoItems all
  listAll() {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
      .then((res) => {
        this.setState({ todoItems: res.data });
      })
      .catch((err) => {
        console.error(err);
        console.log(err);
      });
  }

  //todoItems active
  listActive() {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
      .then((res) => {
        let todoItems = res.data;
        let n = todoItems.length;
        for (let i = 0; i < n; i++) {
          if (todoItems[i].isCompleted === true) {
            todoItems.splice(i, 1);
            i--;
            n--;
          }
        }
        this.setState({ todoItems: todoItems });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //todoItems completed
  listCompleted() {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
      .then((res) => {
        let todoItems = res.data;
        let n = todoItems.length;
        for (let i = 0; i < n; i++) {
          if (todoItems[i].isCompleted === false) {
            todoItems.splice(i, 1);
            i--;
            n--;
          }
        }
        this.setState({ todoItems: todoItems });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //to mark complete function
  findIndex(todoItems, item) {
    for (let i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id === item.id) {
        return i;
      }
    }
  }

  onItemClicked(item) {
    return () => {
      const isCompleted = item.isCompleted;
      const { todoItems } = this.state;
      const index = this.findIndex(todoItems, item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isCompleted: !isCompleted,
          },
          ...todoItems.slice(index + 1),
        ],
      });

      axios
        .put(
          "https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data/" +
            item.id,
          {
            isCompleted: !isCompleted,
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  //double click to edit text
  onDoubleClick(item) {
    return () => {
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isEditing: true,
            isCompleted: item.isCompleted,
          },
          ...todoItems.slice(index + 1),
        ],
      });
    };
  }

  //save text afer edit (click outside textbox)
  onChange(event, item) {
    const text = event.target.value;

    const isCompleted = item.isCompleted;
    const { todoItems } = this.state;
    const index = this.findIndex(todoItems, item);
    this.setState({
      todoItems: [
        ...todoItems.slice(0, index),
        {
          ...item,
          title: text,
          isEditing: true,
          isCompleted: isCompleted,
        },
        ...todoItems.slice(index + 1),
      ],
    });
  }

  onBlur(item) {
    return () => {
      const text = item.title;
      const isCompleted = item.isCompleted;
      const { todoItems } = this.state;
      const index = this.findIndex(todoItems, item);

      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            title: text,
            isEditing: false,
            isCompleted: isCompleted,
          },
          ...todoItems.slice(index + 1),
        ],
      });

      axios
        .put(
          "https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data/" +
            item.id,
          {
            title: text,
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  //delete todo
  onDelete(item) {
    return () => {
      const { todoItems } = this.state;
      const index = this.findIndex(todoItems, item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          ...todoItems.slice(index + 1),
        ],
      });
      axios
        .delete(
          "https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data/" +
            item.id
        )
        .then((response) => {
          console.log(response);
        });
    };
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

    async function wait(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    async function updateAPI(todoList) {
      for (const item of todoList) {
        await axios
          .put(
            "https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data/" +
              item.id,
            {
              isCompleted: item.isCompleted,
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        await wait(5000);
      }
    }

    updateAPI(todoItems);

    // function myLoop() {
    //   setTimeout(function () {
    //     axios
    //       .put(
    //         "https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data/" +
    //           todoItems[i].id,
    //         {
    //           isCompleted: todoItems[i].isCompleted,
    //         }
    //       )
    //       .then((res) => {
    //         console.log(res.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //     i++; //  increment the counter
    //     if (i < n) {
    //       myLoop();
    //     }
    //   }, 5000);
    // }
    // myLoop();
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
              <TodoGeneral
                path=""
                onItemClicked={(todo) => this.onItemClicked(todo)}
                onDoubleClick={(todo) => this.onDoubleClick(todo)}
                onChange={(event, todo) => this.onChange(event, todo)}
                onBlur={(todo) => this.onBlur(todo)}
                onDelete={(todo) => this.onDelete(todo)}
                todoItems={this.state}
              />
            </Route>
            <Route exact path="/active">
              <TodoGeneral
                path="active"
                onItemClicked={(todo) => this.onItemClicked(todo)}
                onDoubleClick={(todo) => this.onDoubleClick(todo)}
                onChange={(event, todo) => this.onChange(event, todo)}
                onBlur={(todo) => this.onBlur(todo)}
                onDelete={(todo) => this.onDelete(todo)}
                todoItems={this.state}
              />
            </Route>
            <Route exact path="/completed">
              <TodoGeneral
                path="completed"
                onItemClicked={(todo) => this.onItemClicked(todo)}
                onDoubleClick={(todo) => this.onDoubleClick(todo)}
                onChange={(event, todo) => this.onChange(event, todo)}
                onBlur={(todo) => this.onBlur(todo)}
                onDelete={(todo) => this.onDelete(todo)}
                todoItems={this.state}
              />
            </Route>
          </Switch>
          <TodoFilter
            numItem={numItem}
            clearCompleted={this.clearCompleted}
            onClickAll={this.listAll}
            onClickActive={this.listActive}
            onClickCompleted={this.listCompleted}
          />
        </Router>
      </div>
    );
  }
}

export default TodoOld;
