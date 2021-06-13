import { React, Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class TodoGeneral extends Component {
  render() {
    const { onItemClicked, onDoubleClick, onChange, onBlur, onDelete } = this.props;
    const { todoItems } = this.props.todoItems;
 
    return (
      <div>
        {todoItems.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            onClick={onItemClicked(item)}
            onDoubleClick={onDoubleClick(item)}
            onChange={(event) => onChange(event, item)}
            onBlur={onBlur(item)}
            onDelete={onDelete(item)}
          />
        ))}
      </div>
    );
  }
}

TodoGeneral.propTypes = {
  todoItems: PropTypes.object,
  onItemClicked: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onDelete: PropTypes.func
}

export default TodoGeneral;
