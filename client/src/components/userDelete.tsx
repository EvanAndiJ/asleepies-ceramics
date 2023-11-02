import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';

interface UserDelete {
    onDelete: (password: string) => Promise<void | Response>
}
const UserDelete = ({onDelete}: UserDelete) => {
    
    const [isValid, setIsValid] = useState(false)
    const [isErr, setIsErr] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const [showModal, setShowModal] = useState(false)

    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')

    useEffect(()=>{ if ( (pass1 && pass2 ) && pass1 === pass2) { 
        setIsValid(true); } else { setIsValid(false) } 
    });
    const toggleEdit = () => { 
        setPass1(''); setPass2(''); 
        setShowModal(!showModal) 
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.name === 'pass1' ? 
            setPass1(event.target.value)
            : setPass2(event.target.value)
    }
    const handleDelete = async () => {
        if (isErr) { setIsErr(false); setErrMessage(''); }
        const res = await onDelete(pass2)
        if (res) {
            if (res.ok) {
                toggleEdit()
                alert('Account Deleted.')
            } else {
                const message = await res.json()    
                setIsErr(true)
                setErrMessage(message.message)
            }
        }

    }
    
    return (
        <> 
            
            <button name='delete' onClick={toggleEdit}> 
                Delete Account 
            </button>

            <Modal show={showModal} onHide={toggleEdit}>
                <Modal.Header>
                Are you sure you want to delete your account?
                </Modal.Header>

                <Modal.Body>
                    <div style={{ fontSize: '1em', justifyContent: 'center' }}>
                        {errMessage} </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        Enter Password: 
                        <input type="password" name="pass1" value={pass1} onChange={onChange}/>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        Retype Password: 
                        <input type="password" name="pass2" value={pass2} onChange={onChange}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="light" name="delete" disabled={!isValid}
                        onClick={handleDelete}
                        > Delete </Button>

                    <button name='delete' className='editButtons'
                        onClick={()=>{ toggleEdit(); }}
                        > cancel </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserDelete;