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
 

  // Mark all completed
  const handleMarkAll = () => {
    const updated = allTodos.map((todo) => ({...todo, completed: !todo.completed}))
    setAllTodos(updated);
  }

  // Filter 
  const handleFilter = () => {

  }

  
  console.log("All Todos -> ", allTodos);

  return (
    <div>
          <div>
            <Form  allTodos = {allTodos} setAllTodos = {setAllTodos}/>
          </div>
         
         <br></br>
         {/* Filter by completed or uncompleted */}
         <div>
           <select onChange={handleFilter}>
           <option value=''>filter</option>
           <option value='completed'>Completed</option>
           <option value='uncompleted'>Uncompleted</option>
           </select>
         </div>

          <br></br>
         {/* Mark as all completed */}
        
         <div>
          <button onClick={handleMarkAll}>All completed</button>
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
