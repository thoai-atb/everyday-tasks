import Switch from "../Switch/Switch";
import './Footer.css';

const Footer = ({resetSwitchStatus, disableReset, resetAll, addTask}) => {
    return (
        <div className='footer'>
            <div className='reset-bar'>
                Reset Tasks 
                <span><Switch func={resetAll} disabled={disableReset} checked={resetSwitchStatus} alwaysGreen={true}/></span>
                <button onClick={addTask}>New Task</button>
            </div>
        </div>
    )
}

export default Footer
