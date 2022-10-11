import { Modal } from '../../context/Modal';
import { useState } from 'react';
import LoginForm from '../components/LoginFormModal/LoginForm';

const LoginModal = () => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <>
            {/* <button className='dropbtn' onClick={() => setRenderModal(true)} /> */}
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <LoginForm />
                </Modal>
            ) : null
            }
        </>
    )
};

export default LoginModal;