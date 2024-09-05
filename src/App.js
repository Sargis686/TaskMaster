import React, { useState, useEffect } from 'react';
import TodoList from './comonents/TodoList/TodoList';
import Filter from './comonents/Filter';
import TodoForm from './comonents/TodoForm/TodoForm';
import './App.css'


const LOCAL_STORAGE_KEY_TODOS = 'todoApp.todos';
const LOCAL_STORAGE_KEY_FILTER = 'todoApp.filter';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Load todos and filter from localStorage when the app loads
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODOS));
        if (storedTodos && Array.isArray(storedTodos)) {
            setTodos(storedTodos); // Set the todos from local storage
        }

        const storedFilter = localStorage.getItem(LOCAL_STORAGE_KEY_FILTER);
        if (storedFilter) {
            setFilter(storedFilter); // Set the filter from local storage
        }
    }, []);

    // Save todos to localStorage whenever the `todos` array changes
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(todos));
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY_TODOS); // Clear local storage if no todos
        }
    }, [todos]);

    // Save filter to localStorage whenever the `filter` changes
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_FILTER, filter);
    }, [filter]);

    // Add a new todo item
    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            done: false,
            important: false
        };
        setTodos([...todos, newTodo]);
    };

    // Delete a todo by its ID
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Toggle 'done' status of a todo
    const toggleDone = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
    };

    // Toggle 'important' status of a todo
    const toggleImportant = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, important: !todo.important } : todo));
    };

    // Edit a todo's text
    const editTodo = (id, text) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, text } : todo));
    };

    // Filter and search todos
    const filteredTodos = todos.filter(todo => {
        if (filter === 'done' && !todo.done) return false;
        if (filter === 'important' && !todo.important) return false;
        if (!todo.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });


    // Count done and important todos
    const doneCount = todos.filter(todo => todo.done).length;
    const importantCount = todos.filter(todo => todo.important).length;



    return (
        <div className="App">


            <div className='header'>


                <div className='title'>
                    <h1>My Todo List</h1>

                </div>
                {/* Displaying Done and Important counts */}
                <div className="todo-stats">
                    <span>Done: {doneCount}</span>
                    <span>Important: {importantCount}</span>


                </div>
                
            </div>




            {/* Search Input */}
            <input
                type="text"
                className='task-input'
                placeholder="Type text for search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}

            />

            {/* Filter Component */}
            <Filter currentFilter={filter} onFilterChange={setFilter} />

            {/* Todo List */}
            <TodoList
                todos={filteredTodos}
                onToggleDone={toggleDone}
                onDelete={deleteTodo}
                onToggleImportant={toggleImportant}
                onEdit={editTodo}
            />

            {/* Todo Form */}
            <TodoForm onAdd={addTodo} />
        </div>
    );
};

export default App;
