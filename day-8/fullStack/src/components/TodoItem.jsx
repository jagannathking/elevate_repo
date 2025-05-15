
import React from 'react'

const TodoItem = ({todo, index, deleteTodo, toggleComplete, ToggleActive}) => {


  return (
    <div>
        <div>
            <h4 style={{textDecoration: todo.complete? "line-through": "none"}}>{todo.title}</h4>
            <button onClick={() => ToggleActive(index)}>{todo.active? "Active" : "InActive"}</button>
            <button onClick={() => toggleComplete(index)}>{todo.complete? "Completed" : "Uncompleted"}</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
        </div>
    </div>
  )
}

export default TodoItem