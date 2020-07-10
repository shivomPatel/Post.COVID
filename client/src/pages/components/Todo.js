import React from "react";
import PropTypes from "prop-types";
import "./styles/todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ index, onClick, completed, text, url }) => {
  return (
    <div>
      <FontAwesomeIcon
        className="ellipses-icon"
        icon={faEllipsisH}
      ></FontAwesomeIcon>
      <li
        className="todo"
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        <span className="index">{index}</span>
        {text}
        <span>
          <div style={{ marginLeft: "50px" }}>
            <img
              style={{ borderRadius: "5px", border: "1px solid grey" }}
              src={url}
              width="220px"
              height="150px"
            />

            <button onClick={onClick} className="delete-button">
              <FontAwesomeIcon
                className="trash-icon-color"
                icon={faTrashAlt}
              ></FontAwesomeIcon>
            </button>
          </div>
        </span>
      </li>
    </div>
  );
};

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;
