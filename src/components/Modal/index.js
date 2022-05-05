import React from "react";

//children permet de recuperer les elements du component present dans le component parent voir dans quizOver.js
const Modal = ({showModal, children}) => {
    return (
        showModal && (
            <div className="modalBackground">
                <div className="modalContainer"> 
                    {children}
                </div>
            </div>
        )
    )
}

export default Modal;