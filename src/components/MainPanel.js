import useSound from 'use-sound';
import Task from './Task.js'
import Footer from './Footer.js'
import {useState, useEffect} from 'react';
import keySfx from '../sounds/key.wav';

const MainPanel = () => {
    const [disableReset, setDisableReset] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [resetSwitchStatus, setResetSwitchStatus] = useState(false);
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
        const res = await fetch(`/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
    }

    const resetAll = async () => {
        setResetSwitchStatus(true);
        await fetch(`/tasks/reset`, {method: 'PATCH'});
        await fetchData();
        setTimeout(() => setResetSwitchStatus(false), 300);
    } 

    return (
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
            <Footer resetAll={resetAll} resetSwitchStatus={resetSwitchStatus} disableReset={disableReset}/>
        </div>
    )
}

export default MainPanel
