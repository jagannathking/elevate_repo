import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ flag, setFlag }) => {
  const [todos, setTodos] = useState([]);

  // Get todos from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(data);
  }, [flag]);

  useEffect(() => {});

  // Delete Todo
  const deleteTodo = (id) => {
    const updateTodo = todos.filter((_, index) => index !== id);

    localStorage.setItem("todos", JSON.stringify(updateTodo));

    setFlag((prev) => !prev);
  };

  // Toggle complete
  const toggleComplete = (id) => {
    const updateTodo = todos.map((todo, index) =>
      index === id ? { ...todo, complete: !todo.complete } : todo
    );

    localStorage.setItem("todos", JSON.stringify(updateTodo));
    setFlag((prev) => !prev);
  };

  // Active
  const ToggleActive = (id) => {
    const updateTodo = todos.map((todo, index) =>
      index === id ? { ...todo, active: !todo.active } : todo
    );

    localStorage.setItem("todos", JSON.stringify(updateTodo));
    setFlag((prev) => !prev);
  };
  return (
    <div>
      <div>
        <ul>
          {todos &&
            todos.map((todo, index) => (
              <li key={index}>
                <TodoItem
                  todo={todo}
                  index={index}
                  deleteTodo={deleteTodo}
                  toggleComplete={toggleComplete}
                  ToggleActive={ToggleActive}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
