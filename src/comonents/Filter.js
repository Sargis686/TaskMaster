import React from 'react';
import s from './style.module.css';

const Filter = ({ currentFilter, onFilterChange }) => {
    return (
        <div className={s.filter}>
            <button
                className={`${s['filter-button']}   ${currentFilter === 'all' ? s.active : ''}`}
                onClick={() => onFilterChange('all')}
            >
                All
            </button>
            <button
                className={`${s['filter-button']}  ${s.done}  ${currentFilter === 'done' ? s.active : ''}`}
                onClick={() => onFilterChange('done')}
            >
                Done
            </button>
            <button
                className={`${s['filter-button']}  ${s.important}  ${currentFilter === 'important' ? s.active : ''}`}
                onClick={() => onFilterChange('important')}
            >
                Important
            </button>
        </div>
    );
};

export default Filter;
