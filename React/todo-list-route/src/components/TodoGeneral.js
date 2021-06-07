import { React, Component } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

class TodoGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = { todoItems: [] };
  }

  componentDidMount() {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
      .then((res) => {
        const todoItems = res.data;
        this.setState({ todoItems });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidUpdate(props, state) {
    setTimeout(() => {
      console.log("this props: " + JSON.stringify(props));
      const { path } = props;
      if (path === "active") {
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
      } else if (path === "completed") {
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
      } else {
        axios
          .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
          .then((res) => {
            const todoItems = res.data;
            this.setState({ todoItems: todoItems });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }, 5000)
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

  render() {
    const { todoItems } = this.state;

    return (
      <div>
        {todoItems.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            onClick={this.onItemClicked(item)}
            onDoubleClick={this.onDoubleClick(item)}
            onChange={(event) => this.onChange(event, item)}
            onBlur={this.onBlur(item)}
            onDelete={this.onDelete(item)}
          />
        ))}
      </div>
    );
  }
}

export default TodoGeneral;
