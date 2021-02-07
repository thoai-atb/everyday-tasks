import Switch from "./Switch/Switch";

const Footer = ({resetSwitchStatus, disableReset, resetAll}) => {
    return (
        <div className='footer'>
            <div className='reset-bar'>
                Reset Tasks <span><Switch func={resetAll} disabled={disableReset} checked={resetSwitchStatus} alwaysGreen={true}/></span>
            </div>
        </div>
    )
}

export default Footer
