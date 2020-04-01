import React from "react";
import './Column.scss';

const Column=({column,children,ToggleNewTask})=>(
    <div className="Column">
        <div className="Column__header">
            <h2 className="Column__title">
                <span className="Column__item-count">{column.get('tasks').size}</span>
                <span>{column.get('title')}</span>
            </h2>
            <p className="Column__btn" onClick={ToggleNewTask(column.get('id'))}>
                <i className="fas fa-plus"></i> New task
            </p>
        </div>
        <div className="Column_content">
            {children}
        </div>
    </div>
)
export default Column;