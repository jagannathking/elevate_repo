import React from 'react'


const TodoItem = ({todo, handleToggle,  handleDelete}) => {
  return (
    <div>
      <p style={{textDecoration: todo.completed? 'line-through' : 'none'}}>{todo.title}</p>
      <p>{todo.category}</p>
      <p onClick={() => handleToggle(todo.id)}
        
        >{todo.completed === true? "Completed" : "Uncompleted"}</p>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>

    </div>
  )
}

export default TodoItem
