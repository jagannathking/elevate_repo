import React from "react";
import { useState } from "react";

const Form = ({allTodos ,setAllTodos}) => {
  const [todo, setTodo] = useState({
    title: "",
    category: "",
    completed: false
  });

  // todo input
  const handleInput = (e) => {
    const {name, value} = e.target
    let newTodo = {
      ...todo,
      [name]: value,
      id: Date.now()
    }

    setTodo(newTodo);
  };

  console.log(todo);
  
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
   setAllTodos([...allTodos, todo])
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={todo.title}
            placeholder="Enter todo"
            onChange={handleInput}
          />
        </div>

        <div>
          <select onChange={handleInput} name="category" value={todo.category}>
            <option value="">Select category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="learning">Learning</option>
          </select>
        </div>

        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
