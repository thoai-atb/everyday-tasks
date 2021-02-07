import Switch from './Switch/Switch.js'

const Task = ({task, onSwitch}) => {
    return (
        <div className="task">
            <Switch func={onSwitch} id={task.id} checked={task.checked}/>
            <p>{task.name}</p>
        </div>
    )
}

export default Task
