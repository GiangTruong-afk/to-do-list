import React from "react";
import './AddNewTask.scss';
const AddNewTask = (props) =>(
    <div className="AddNewTask">
        <div className="AddNewTask__backdrop"></div>
        <div className="AddNewTask__content">
            <h4 className="AddNewTask__title">
                CREATE NEW TASK
            </h4>
            <div className="AddNewTask__task-status">
                <span className="AddNewTask__radio">
                    <input type="radio" checked={props.selectedColumn === 'td'} onChange={props.handleChangeSelectedColumn('td')}/>
                    <span>TO DO</span>
                </span>
                <span className="AddNewTask__radio">
                    <input type="radio" checked={props.selectedColumn==='ip'} onChange={props.handleChangeSelectedColumn('ip')} />
                    <span>IN PROGRESS</span>
                </span>
                <span className="AddNewTask__radio">
                    <input type="radio"  checked={props.selectedColumn==='de'} onChange={props.handleChangeSelectedColumn('de')}/>
                    <span>DONE</span>
                </span>
            </div>
            <div className="AddNewTask__task">
                <input className="AddNewTask__input"
                       type="text"
                       placeholder="Enter your task..." value={props.taskContent} onChange={props.handleChangeTaskContent}/>
            </div>
            <div className="AddNewTask__action">
                <button className="AddNewTask__btn AddNewTask__btn--confirm" onClick={props.handleAddTask}>
                    Save
                </button>
                <button className="AddNewTask__btn AddNewTask__btn--cancel" onClick={props.ToggleNewTask}>
                    Cancel
                </button>
        </div>
        </div>
    </div>
);

export default AddNewTask;