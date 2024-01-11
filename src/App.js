import { useState } from 'react';
import './App.css';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add a task"
      />
    </form>
  );
}

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
      className="todo"
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>X</button>
      </div>
    </div>
  );
}

function Todos() {
  const [todos, setTodos] = useState([
    {
      isCompleted: false,
      text: 'Learn about React'
    },
    {
      isCompleted: false,
      text: 'Meet friend for lunch'
    },
    {
      isCompleted: false,
      text: 'Build really cool todo app'
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
  <div className="todos">
    <h1 className="todos__title">My Todos ({todos.length})</h1>
    <TodoForm addTodo={addTodo} className="todos__form" />
    {todos.map((todo, index) => (
      <Todo
        key={index}
        index={index}
        todo={todo}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        className="todos__todo"
      />
    ))}
  </div>
  );
}

export default Todos;