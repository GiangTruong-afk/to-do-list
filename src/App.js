import React ,{Component} from 'react';
import {fromJS} from "immutable";
import './App.scss';
import Column from './Component/Column/Column';
import AddNewTask from './Component/AddNewTask/AddNewTask';
import Task from './Component/Task/Task';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import uuidv1 from 'uuid/v1'

class App extends Component {
    state = {
        display: false,
        columns: fromJS([
            {id: 'td', title: 'TO DO', tasks: []},
            {id: 'ip', title: 'IN PROGRESS', tasks: []},
            {id: 'de', title: 'DONE', tasks: []}
        ]),
        selectedColumn: '',
        taskContent: '',
    };

    ToggleNewTask = (idColumn = '') => () => {
        this.setState(prevState => ({
            selectedColumn: idColumn,
            display: !prevState.display,
        }));
    };
    handleChangeSelectedColumn = (selectedColumn) => () => {
        this.setState({selectedColumn: selectedColumn})
    };
    handleChangeTaskContent = (e) => this.setState({taskContent: e.target.value});

    handleAddTask = () => {
        const {taskContent} = this.state;
        if (taskContent.trim() === '') {
            return toastr.warning('Plesae enter input', 'Notice', {timeout: 2000});
        } else {
            const {selectedColumn, columns} = this.state;
            const newTask = fromJS({
                id: uuidv1,
                content: taskContent,
                time: new Date().toLocaleString()
            });
            const columnIndex = columns.findIndex(column => column.get('id') === selectedColumn);
            const updatedColumn = columns.updateIn(
                [columnIndex, 'tasks'],
                tasks => tasks.push(newTask)
            );
            this.setState({
                display: false,
                selectedColumn: '',
                taskContent: '',
                columns: fromJS(updatedColumn)
            });
        }
    };
    handleDeleteTask= (columnIndex,taskIndex)=>()=>{
        const result = window.confirm('Are u sure to delete this task?');
        if(result) {
            const {columns} = this.state;
            const updatedColumn = columns.updateIn(
                [columnIndex,'tasks'],
                tasks=>tasks.remove(taskIndex));
            this.setState({
                columns: fromJS(updatedColumn)
            }, ()=>{toastr.success('Delete Success','Notice',{timeout: 2000})})
        }
    };
render(){
    const {columns , display,taskContent} = this.state;

    return(
        <div className="App">
        <h1 className="App__title">
            To Do List
        </h1>
            <div className="App__content">
                {
                    columns.map((column, columnIndex) => (
                        <Column key={column.get('id')} column={column} ToggleNewTask={this.ToggleNewTask}>
                            <div style={{ minHeight: '300px' }}>
                                {column.get('tasks').map((task,taskIndex) =>(
                                    <Task key={task.get('id')} task={task} handleDeleteTask={this.handleDeleteTask(columnIndex,taskIndex)}/>
                                ))}
                            </div>
                        </Column>
                    ))
                }
                {
                    display  &&
                    <AddNewTask ToggleNewTask={this.ToggleNewTask()}
                                selectedColumn={this.state.selectedColumn}
                                handleChangeSelectedColumn={this.handleChangeSelectedColumn}
                                taskContent={taskContent}
                                handleChangeTaskContent={this.handleChangeTaskContent}
                                handleAddTask = {this.handleAddTask}
                    />
                }
            </div>
        </div>
    )
}
}

export default App;
