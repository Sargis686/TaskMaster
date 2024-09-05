import React, { useState } from 'react';
import TodoItem from '../TodiItem/TodiItem';
import s from "./style.module.css";



//sax et inputy enter arac vor texadrvi nerqevy
const TodoList = ({ todos, onToggleDone, onDelete, onToggleImportant, onEdit }) => {
    const [editingId, setEditingId] = useState(null); // Tracks the ID of the item being edited
    const [newText, setNewText] = useState(''); // Holds the new text for the to-do item

    // Handles when the user clicks the "Edit" button
    const handleEditClick = (id, currentText) => {
        setEditingId(id); // Set the item to edit mode
        setNewText(currentText); // Initialize the input field with the current text
    };

    // Handles saving the new text
    const handleSave = (id) => {
        if (newText.trim()) {
            onEdit(id, newText); // Call the onEdit function passed from the parent
        }
        setEditingId(null); // Exit edit mode after saving
    };

    return (
        <ul className={s['todo-list']}>
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo}
                    isEditing={editingId === todo.id} // Pass whether this item is being edited
                    newText={newText}
                    setNewText={setNewText}
                    onToggleDone={() => onToggleDone(todo.id)}
                    onDelete={() => onDelete(todo.id)}
                    onToggleImportant={() => onToggleImportant(todo.id)}
                    onEditClick={() => handleEditClick(todo.id, todo.text)}
                    onSave={() => handleSave(todo.id)}
                />
            ))}
        </ul>
    );
};

export default TodoList;
