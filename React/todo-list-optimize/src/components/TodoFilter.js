import { React, Component } from "react";
import "./TodoFilter.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class TodoFilter extends Component {
  render() {
    const {
      numItem,
      clearCompleted,
      onClickAll,
      onClickActive,
      onClickCompleted,
    } = this.props;
    return (
      <div className="TodoFilter">
        <p className="numItem">{numItem} left</p>
        <div className="filter">
          <Link to="/" onClick={onClickAll}>
            All
          </Link>
          <Link to="/active" onClick={onClickActive}>
            Active
          </Link>
          <Link to="/completed" onClick={onClickCompleted}>
            Completed
          </Link>
        </div>
        <button className="clearCompleted" onClick={clearCompleted}>
          Clear completed
        </button>
      </div>
    );
  }
}

TodoFilter.propTypes = {
  numItem: PropTypes.number,
  clearCompleted: PropTypes.func,
  onClickAll: PropTypes.func,
  onClickActive: PropTypes.func,
  onClickCompleted: PropTypes.func,
};

export default TodoFilter;
