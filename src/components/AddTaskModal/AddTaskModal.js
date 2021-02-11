import './AddTaskModal.css'
import {useState} from 'react'
import Switch from '../Switch/Switch.js';

const AddTaskModal = ({showing, closeBtnFunc, addTaskFunc}) => {
    const [taskName, setTaskName] = useState("");
    const [status, setStatus] = useState(false);
    const [continueOption, setContinueOption] = useState(false);
    const [nameEmptyWarning, setNameEmptyWarning] = useState(false);

    const submitFunc = () => {
        if(taskName === "") {
            if(!nameEmptyWarning) {
                setNameEmptyWarning(true);
                setTimeout(() => {
                    setNameEmptyWarning(false);
                }, 1000);
            }
            return;
        }
        const task = {
            name: taskName,
            checked: status,
        }
        addTaskFunc(task);
        setTaskName("");
        if(!continueOption)
            closeBtnFunc();
    }

    return (
        <div className={`taskmodal ${showing ? "" : "hiding"}`} onMouseDown={closeBtnFunc}> 
            <div className='content' onMouseDown={(e) => {e.stopPropagation()}}>
                <div className='header'>
                    <p>Add New Task</p>
                    <div className='closebtn' onMouseDown={closeBtnFunc}>
                        <span>&times;</span>
                    </div>
                </div>
                <div className='body'>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor='name'>Task Name</label></td>
                                <td><input id='name' type='text' placeholder='Pong' value={taskName} onChange={e => setTaskName(e.target.value)}/></td>
                            </tr>
                            {
                                nameEmptyWarning && (
                                    <tr className='warning'>
                                        <td></td>
                                        <td><p>Task name can't be empty!</p></td>
                                    </tr>
                                )
                            }
                            <tr>
                                <td><label htmlFor='status'>Status</label></td>
                                <td><Switch id='status' playSound={false} checked={status} func={() => {setStatus(!status)}}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='footer'>
                    <span>
                        <label htmlFor='close-option'>Don't close this after adding task</label>
                        <input type='checkbox' checked={continueOption} onChange={e => setContinueOption(e.target.checked)}></input>
                    </span>
                    <button onClick={submitFunc}>Add Task</button>
                </div>
            </div>
        </div>
    )
}

export default AddTaskModal
