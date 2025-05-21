import React from 'react'
import { useState } from 'react'
import Form from './components/Form';
import TodoItem from './components/TodoItem';


const App = () => {
  const [allTodos, setAllTodos] = useState([]);
  
 
  // Toggle completed
  const handleToggle = (id) => {
    const updated = allTodos.map((todo) => todo.id === id? {...todo, completed: !todo.completed}: todo);
    setAllTodos(updated)
  }

  // Delete
  const  handleDelete = (id) => {
     const updated = allTodos.filter((todo) => todo.id !== id);

     setAllTodos(updated);
  }
 
  console.log("All Todos -> ", allTodos);

  return (
    <div>
          <div>
            <Form  allTodos = {allTodos} setAllTodos = {setAllTodos}/>
          </div>

         {/* Show todo */}
          <div>
           <ul>
            {
              allTodos && allTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem todo={todo} handleToggle = {handleToggle}  handleDelete = { handleDelete}/>
                </li>
              ))
            }
           </ul>
          </div>
    </div>
  )
}

export default App
