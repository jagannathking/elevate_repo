import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import FilterBar from "./FilterBar";

const TodoApp = () => {
  const [flag, setFlag] = useState(false);
   

  return (
    <div>
      <TodoInput setFlag={setFlag} />
      
      <div>
        <FilterBar />
      </div>
      <div>
        <TodoList flag={flag} setFlag={setFlag} />
      </div>
    </div>
  );
};

export default TodoApp;
