import React from 'react';
import s from './style.module.css';

const TodoItem = ({
    todo,
    isEditing,
    newText,
    setNewText,
    onToggleDone,
    onDelete,
    onToggleImportant,
    onEditClick,
    onSave
}) => {
    return (
        <li className={`${s['todo-item']} ${todo.done ? s.done : ''} ${todo.important ? s.important : ''}`}>
            {isEditing ? (
                <input
                    type="text"
                    className={s['todo-input']}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onBlur={onSave} // Save when input loses focus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onSave(); // Save on pressing Enter
                    }}
                />
            ) : (
                <>
                    <span>
                        {todo.text}
                    </span>
                    <div className={s.actions}>
                        <button className={s['done-btn']} onClick={onToggleDone}>
                        {todo.done ? 'Undo' : '✔️'}
                                                </button>
                        <button className={s['important-btn']} onClick={onToggleImportant}>
                            {todo.important ? 'Unmark' : '❗'}
                        </button>
                        <button className={s['edit-btn']} onClick={onEditClick}>✏️</button>
                        <button className={s['delete-btn']} onClick={onDelete}>  🗑️ </button>
                        
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;
