import useSound from 'use-sound';
import Task from './Task.js'
import Footer from './Footer/Footer.js'
import {useState, useEffect} from 'react';
import keySfx from '../sounds/key.wav';
import AddTaskModal from './AddTaskModal/AddTaskModal.js';

const MainPanel = () => {
    const [tasks, setTasks] = useState([]);
    const [disableReset, setDisableReset] = useState(true);
    const [resetSwitchStatus, setResetSwitchStatus] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);
    const [playKeySfx] = useSound(keySfx);
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let allChecked = tasks.every(t => t.checked);
        if(disableReset && allChecked)
            playKeySfx();
        setDisableReset(!allChecked);
    }, [tasks])
    
    const fetchData = async () => {
        const res = await fetch('/tasks');
        const data = await res.json();
        setTasks(data);
    } 

    const fetchTask = async (id) => {
        const res = await fetch(`/task/${id}`);
        const data = await res.json();
        return data;
    }

    const onSwitch = async ({e, id}) => {
        const toBeUpdated = await fetchTask(id);
        const updatedTask = {...toBeUpdated, checked : 1 - toBeUpdated.checked};
        setTasks(tasks.map(t => t.id == id ? updatedTask : t));
        const res = await fetch(`/task/${id}/toggle`, {method: 'PATCH'});
    }

    const resetAll = async () => {
        setResetSwitchStatus(true);
        await fetch(`/tasks/reset`, {method: 'PATCH'});
        await fetchData();
        setTimeout(() => setResetSwitchStatus(false), 300);
    } 

    return (
        <div>
            <div className='container'>
                <h1>Everyday Tasks</h1>
                <div className='scroll'>
                    {
                        tasks.length <= 0 ?
                        (<p>No Tasks To Show</p>) :
                        tasks.map((t) => (
                            <Task task={t} key={t.id} onSwitch={onSwitch}/>
                        ))
                    }
                </div>
                <Footer resetAll={resetAll} addTask={() => setShowAddTask(true)} resetSwitchStatus={resetSwitchStatus} disableReset={disableReset}/>
            </div>
            <AddTaskModal showing={showAddTask} closeBtnFunc={() => setShowAddTask(false)}/>
        </div>
    )
}

export default MainPanel
