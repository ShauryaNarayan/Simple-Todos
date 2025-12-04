import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo, toggleComplete, editTodo} = props
  const {id, title, isCompleted = false} = todoDetails
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  const onCheckboxChange = () => {
    toggleComplete(id)
  }

  const onEditClick = () => {
    if (isEditing) {
      editTodo(id, editedTitle)
    }
    setIsEditing(!isEditing)
  }

  return (
    <li className="list-container">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onCheckboxChange}
      />

      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          className="edit-input"
        />
      ) : (
        <p className={`paragraph ${isCompleted ? 'completed' : ''}`}>{title}</p>
      )}

      <button type="button" className="edit-button" onClick={onEditClick}>
        {isEditing ? 'Save' : 'Edit'}
      </button>

      <button type="button" className="delete-button" onClick={onDeleteTodo}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
