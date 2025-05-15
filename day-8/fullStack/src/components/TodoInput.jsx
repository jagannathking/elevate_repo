import React, { useEffect, useState } from "react";

const TodoInput = ({ setFlag }) => {
  const [todoData, setTodoData] = useState({
    title: "",
    complete: false,
    active: false,
  });

  const [todos, setTodos] = useState([]);


  const handleTodo = (e) => {
    const { name, value } = e.target;

    setTodoData({ ...todoData, [name]: value });
  };


  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(prevData);
  }, [todoData]);


  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("todos", JSON.stringify([...todos, todoData]));

    setFlag((prev) => !prev);

    setTodoData({
      title: "",
      complete: false,
      active: false,
    });
  };

  
  return (
    <div>
      <h2>TodoInput</h2>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={todoData.title}
            placeholder="Enter todo"
            onChange={handleTodo}
          />

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoInput;
