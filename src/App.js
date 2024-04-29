import './App.css';
import { useState, useEffect } from 'react';
import { getTodos } from './actions/todos';
import { postTodo } from './actions/todos';
import { putTodo } from './actions/todos';
import { deleteTodo } from './actions/todos';


function App() {
  const [todos, setTodos] = useState([]);
const [todo, setTodo] = useState('');


useEffect(() => {
  getData()
}, [])

const getData = () => {
  getTodos().then(res => {
    setTodos(res)
  })
}

const addTodo = () => {
  postTodo(todo)
  .then(() => {
    getData()
    setTodo()
  })
}

const removeTodo = (id) => {
  deleteTodo(id)
  .then(() => {
    getData()
  })
}


const completeTodo = (todo) => {
  const newTodo = {...todo, isDone: true}
  putTodo(newTodo)
  .then(res => {
    getData()
  })
}

const handleEnter = (e) => {
  if (e.key === 'Enter') {
    addTodo()
  }
}

  return (
    <div className="App">
      <input value={todo} onChange={(e) => setTodo(e.target.value)} onKeyDown={handleEnter} />
      <button onClick={() => addTodo()}>Submit</button>
      {todos.map((todo, index) => (
        <div key={index} >
          <span className={todo.isDone ? 'done' : ''}>{todo.description}</span>
          <span>
            {todo.isDone ? <button onClick={() => removeTodo(todo.id)} >Delete</button> : <button onClick={() => completeTodo(todo)}>Complete</button>}
          </span>
        </ div>
      ))}
    </div>
  );
}

export default App;
