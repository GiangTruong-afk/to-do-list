import React from "react";
import './Task.scss';

const Task = (props) =>(
    <div className="Task">
        <div className="Task__time">
            <i className="far fa-calendar-alt"></i> {props.task.get('time')}
        </div>

        <div className="Task__main">
            <div className="Task__content">
                {props.task.get('content')}
            </div>
            <div className="Task__action">
                <div className="Task__btn" onClick={props.handleDeleteTask}>
                    <i className="far fa-trash-alt"></i>
                </div>
            </div>
        </div>
    </div>
);
export  default Task;
