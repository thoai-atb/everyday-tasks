import './AddTaskModal.css'
import {useState} from 'react'

const AddTaskModal = ({showing, closeBtnFunc}) => {
    return (
        <div className={`taskmodal ${showing ? "" : "hiding"}`} onMouseDown={closeBtnFunc}> 
            <div className='content' onMouseDown={(e) => {e.stopPropagation()}}>
                <div className='header'>
                    <p>Add New Task</p>
                    <div className='closebtn' onMouseDown={closeBtnFunc}>
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
