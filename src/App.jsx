
import React, { useState } from 'react';
import './App.css'

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const addTodo = () => {
    if (!taskName.trim()) {
      alert('Task name cannot be empty!');
      return;
    }

    const newTodo = {
      id: new Date().getTime(),
      name: taskName,
      description: taskDescription,
      status: 'notCompleted',
    };

    setTodos([...todos, newTodo]);
    clearInputFields();
  };

  const editTodo = (todoId) => {
    const newTaskName = prompt('Enter the new task name:');
    if (newTaskName !== null) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, name: newTaskName } : todo
        )
      );
    }
  };

  const deleteTodo = (todoId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (confirmDelete) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    }
  };

  const toggleStatus = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, status: todo.status === 'notCompleted' ? 'completed' : 'notCompleted' } : todo
      )
    );
  };

  const clearInputFields = () => {
    setTaskName('');
    setTaskDescription('');
  };

  const filterTodos = () => {
    if (filterStatus === 'completed') {
      return todos.filter((todo) => todo.status === 'completed');
    } else if (filterStatus === 'notCompleted') {
      return todos.filter((todo) => todo.status === 'notCompleted');
    } else {
      return todos;
    }
  };

  return (
    <div className='back' >
      <h1>React Todo App</h1>

      <div className='content-area'>
        <label htmlFor="taskName">Task Name:</label>
        <input className='place'
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <label htmlFor="taskDescription">Description:</label>
        <input className='input-description'
          type="text"
          id="taskDescription"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
        <div>
        <label  htmlFor="filterStatus">Filter Status:</label>
        <select className='filter-selecter'
          id="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
        </div>
      
      </div>

      <div>
        {filterTodos().map((todo) => (
          <div key={todo.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <strong>{todo.name}</strong>
            <br />
            {todo.description}
            <br />
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => toggleStatus(todo.id)}
            >
              {todo.status === 'notCompleted' ? 'Not Completed' : 'Completed'}
            </span>
            <button onClick={() => editTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
