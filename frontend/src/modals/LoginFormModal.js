import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import LoginForm from '../components/auth/LoginForm';

function LoginFormModal() {
    const [renderModal, setRenderModal] = useState(false);

    const thisFunc = (e) => {
        e.preventDefault();
        setRenderModal(true)
    }

    return (
        <>
            <button className = 'dropbtn btn' onClick={(e) =>{ 
                thisFunc()
                }}>Log In</button>
            {renderModal && (
                <Modal onClose={() => setRenderModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;