import Task from './Task.js'
import Footer from './Footer.js'
import {useState, useEffect} from 'react';

const MainPanel = () => {
    const [disableReset, setDisableReset] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [resetSwitchStatus, setResetSwitchStatus] = useState(false);
    
    useEffect(() => {
        const data = [
            {
                id: 1,
                name: 'Breakfast',
                checked: false
            },
            {
                id: 2,
                name: 'Lunch',
                checked: false
            },
            {
                id: 3,
                name: 'Dinner',
                checked: false
            },
            {
                id: 4,
                name: 'Go to bed',
                checked: false
            }
        ];
        setTasks(data);
    }, []);

    useEffect(() => {
        setDisableReset(!tasks.every(t => t.checked));
    }, [tasks])

    const onSwitch = ({e, id}) => {
        setTasks(tasks.map(t => t.id == id ? {...t, checked: !t.checked} : t));
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
