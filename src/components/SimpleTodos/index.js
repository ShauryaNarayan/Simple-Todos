import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening'},
  {id: 2, title: 'Rent the movie for tomorrow movie night'},
  {id: 3, title: 'Confirm the slot for the yoga session tomorrow morning'},
  {id: 4, title: 'Drop the parcel at Bloomingdale'},
  {id: 5, title: 'Order fruits on Big Basket'},
  {id: 6, title: 'Fix the production issue'},
  {id: 7, title: 'Confirm my slot for Saturday Night'},
  {id: 8, title: 'Get essentials for Sunday car wash'},
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    newTodo: '',
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const filteredList = todosList.filter(eachTodo => eachTodo.id !== id)
    this.setState({todosList: filteredList})
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  editTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: newTitle} : todo,
      ),
    }))
  }

  handleChange = event => {
    this.setState({newTodo: event.target.value})
  }

  addTodo = () => {
    const {newTodo, todosList} = this.state
    if (newTodo.trim() === '') return

    const parts = newTodo.trim().split(' ')
    const lastPart = parts[parts.length - 1]
    const numericValue = Number(lastPart)
    const isNumber = !Number.isNaN(numericValue)
    const count = isNumber ? numericValue : 1
    const title = isNumber ? parts.slice(0, -1).join(' ') : newTodo

    const newTodos = Array.from({length: count}, (_, index) => ({
      id: todosList.length + index + 1,
      title,
      isCompleted: false,
    }))

    this.setState({
      todosList: [...todosList, ...newTodos],
      newTodo: '',
    })
  }

  render() {
    const {todosList, newTodo} = this.state

    return (
      <div className="app-container">
        <div className="app-card">
          <div className="inner-card">
            <h1 className="heading">Simple Todos</h1>

            <div className="add-todo-section">
              <input
                type="text"
                className="input-box"
                placeholder="Enter todo or 'TaskName 3' for multiple"
                value={newTodo}
                onChange={this.handleChange}
              />
              <button
                type="button"
                className="add-button"
                onClick={this.addTodo}
              >
                Add
              </button>
            </div>

            <ul className="todosList">
              {todosList.map(eachTodo => (
                <TodoItem
                  key={eachTodo.id}
                  todoDetails={eachTodo}
                  deleteTodo={this.deleteTodo}
                  toggleComplete={this.toggleComplete}
                  editTodo={this.editTodo}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
