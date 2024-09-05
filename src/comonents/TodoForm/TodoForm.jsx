import React, { useState } from 'react';
import s from "./style.module.css"




//form vortex click es anum add es anum input-i value capture anelov 



const TodoForm = ({ onAdd }) => {
    const [text, setText] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const trimmedText = text.trim(); // Trim the input before checking
    
        if (trimmedText) {
            onAdd(trimmedText); 
            
        } else {
            alert('Text is required'); 
        }
    };

    return (
        <form onSubmit={handleSubmit} className={s['todo-form ']}>

            <input
                className={s['todo-input']}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Item text..."
            />
            <button className={s['add-button']} type="submit">Add item</button>
        </form>
    );
};

export default TodoForm;
