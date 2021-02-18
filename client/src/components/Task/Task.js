import Switch from '../Switch/Switch.js'
import './Task.css'

const Task = ({task, onSwitch, deleteFunc}) => {
    return (
        <>
            <div className="task">
                <Switch func={onSwitch} id={task.id} checked={task.checked}/>
                <p>{task.name}</p>
            </div>
            <TrashBtn onClick={() => deleteFunc(task.id)}></TrashBtn>
        </>
    )
}

const TrashBtn = ({onClick}) => {
    return (
        <svg onClick={onClick} className='trash' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    )
}

export default Task
