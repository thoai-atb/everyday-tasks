import Task from './Task.js'
import Footer from './Footer.js'
import {useState, useEffect} from 'react';

const fetchTest = async () => {
    console.log('fetching task ... ');
    const res = await fetch(`/tasks`);
    console.log('task fetched ... ');
    const data = await res.json();
    console.log('json converted ... ');
    return data;
}

const MainPanel = () => {
    const [disableReset, setDisableReset] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [resetSwitchStatus, setResetSwitchStatus] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/tasks');
            const data = await res.json();
            setTasks(data);
        } 
        fetchData();
    }, []);

    useEffect(() => {
        setDisableReset(!tasks.every(t => t.checked));
    }, [tasks])

    const fetchTask = async (id) => {
        console.log('fetching task ... ');
        const res = await fetch(`/task/${id}`);
        console.log('task fetched ... ');
        const data = await res.json();
        console.log('json converted ... ');
        return data;
    }

    const onSwitch = async ({e, id}) => {
        console.log('onswitch');
        const toBeUpdated = await fetchTask(id);
        console.log(toBeUpdated);
        const updatedTask = {...toBeUpdated, checked : 1 - toBeUpdated.checked};
        console.log(updatedTask);
        setTasks(tasks.map(t => t.id == id ? updatedTask : t));
        const res = await fetch(`/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
    }

    const resetAll = () => {
        setTasks(tasks.map(t => { return {...t, checked: false}}));
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
