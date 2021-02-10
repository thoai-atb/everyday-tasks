import Task from './Task.js'
import Footer from './Footer.js'
import {useState, useEffect} from 'react';

const MainPanel = () => {
    const [disableReset, setDisableReset] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [resetSwitchStatus, setResetSwitchStatus] = useState(false);
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setDisableReset(!tasks.every(t => t.checked));
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
        const res = await fetch(`/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
        setTasks(tasks.map(t => t.id == id ? updatedTask : t));
    }

    const resetAll = async () => {
        await fetch(`/tasks/reset`, {method: 'PATCH'});
        await fetchData();
        setResetSwitchStatus(true);
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
