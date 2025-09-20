import React from "react";
import "./TodoItem.css";

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.done}
        onChange={(e) => toggleTodo(todo.id, e.target.checked)}
      />
      <span className={`todo-text ${todo.done ? "done" : ""}`}>
        {todo.title}
      </span>
      <button
        className="todo-delete-btn"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </li>
  );
}

export default TodoItem;
