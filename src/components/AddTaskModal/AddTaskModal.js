import './AddTaskModal.css'

const AddTaskModal = () => {
    const func = () => {
        console.log('close');
    }
    return (
        <div className='taskmodal'>
            <div className='content'>
                <div className='header'>
                    <p>Add New Task</p>
                    <div className='closebtn' onClick={func}>
                        <span>&times;</span>
                    </div>
                </div>
                <div className='body'>
                    This is the body
                </div>
                <div className='footer'>
                    This is the footer
                </div>
            </div>
        </div>
    )
}

export default AddTaskModal
