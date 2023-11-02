import { ResolveOptions } from "dns";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';

interface NewPassProps {
    onSave: (arg1: string, arg2: string, f: string) => Promise< void | Response>

}
const NewPassword = ({onSave}: NewPassProps) => {
    
    const [isValid, setIsValid] = useState(false)
    const [showEditor, setShowEditor] = useState(false)
    const [isErr, setIsErr] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    const [prev, setPrev] = useState('')
    const [new1, setNew1] = useState('')
    const [new2, setNew2] = useState('')

    useEffect(()=>{
        if (prev && new1 && new2) {
            setIsValid(true)
        }
    },[prev,new1,new2])

    const toggleEditor = () => {
        setShowEditor(!showEditor)
        setPrev('')
        setNew1('')
        setNew2('')
        setIsValid(false)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {target} = event
        const f = target.name;
        const edit = target.value;
        switch(f) {
            case 'prev': setPrev(edit); break;
            case 'new1': setNew1(edit); break;
            case 'new2': setNew2(edit);
        }
    }
    const handleSave = async () => {
        if (isErr) {
            setIsErr(false);
            setErrMessage('');
        }
        if (new1 != new2) {
            setIsErr(true); 
            setErrMessage(`New Passwords Don't Match`); 
            return;
        };
        const data = {
            prevPass: prev, newPass: new2, f: 'pass'
        }
        const res = await onSave(prev,new2,'pass')
        if (res?.ok) {
            toggleEditor()
            alert('Password updated! ')
        } else {
            if (res?.status === 401) {
                setIsErr(true)
                setErrMessage('Old Password Incorrect')
            }
        }
    }

    const style = {
        display: 'flex',
        justifyContent: 'center'
    }
    const errStyle = {
        display: isErr ? 'flex' : 'none',
        fontSize: '1em',
        justifyContent: 'center'
    }

    return (
        <div> 
            
            <label> Password:'********'
            <button name='password' className="editButtons" 
                onClick={toggleEditor}>
                    <i className="fa-regular fa-pen-to-square"/>
                </button></label>

            <Modal show={showEditor} onHide={toggleEditor}>
                <Modal.Header>
                Enter New Password
                </Modal.Header>

                <Modal.Body>
                    <div style={errStyle}>{errMessage}</div>
                    <div style={style}>Old Password
                        <input type="password" name="prev" value={prev} onChange={handleChange}/>
                    </div>
                    <div style={style}>New Password
                        <input type="password" name="new1" value={new1} onChange={handleChange}/>
                    </div>
                    <div style={style}>Retype
                        <input type="password" name="new2" value={new2} onChange={handleChange}/>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="light" name="password" 
                        onClick={handleSave} disabled={!isValid}>
                        Save Password</Button>
                    <button name='password' onClick={toggleEditor} className='editButtons'>cancel</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default NewPassword;