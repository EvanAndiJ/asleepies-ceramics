import { useOutletContext,  useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderHistory from "../components/orderHistory";
import UserDelete from "../components/userDelete";
import NewPassword from "../components/newPassword";
import { OutContext } from "../types";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";

const User = () => {
    const context = useOutletContext<OutContext>()
    const {token} = useToken()
    const {userInfo, setUserInfo, signOutUser} = useUser()

    const [username, setUsername] = useState(userInfo?.username)
    const [email, setEmail] = useState(userInfo?.email)
    const [isEdited, setIsEdited] = useState(false)

    const updateInfo = async (username: string, email: string) => {
        
        return fetch('/api/users/updateInfo', {
            method: 'POST',
            headers: {
                'content-type':'application/json',
                "x-access-token": token
            },
            body: JSON.stringify({username, email, userInfo})
        })
        .then(res => {
            console.log(res.body)
            if (res.ok) {
                setUserInfo({...userInfo,
                    username: username,
                    email: email
                })
                setUsername(username);
                setEmail(email);
                alert('User info has been updated')
            } 
            return res
            
        })
        .catch(err => console.log(err))
    }
    const updatePassword = async (prevPass: string, newPass: string) => {
       
        return fetch('/api/users/updatePassword', {
            method: 'POST',
            headers: {
                'content-type':'application/json',
                "x-access-token": token
            },
            body: JSON.stringify({prevPass, newPass, userInfo})
        })
        .then(res => {
            if (res.ok) {
            } 
            return res
            
        })
        .catch(err => console.log(err))
    }
    const onDelete = async (password: string) => {
        return fetch('/api/users/delete', {
            method: 'POST',
            headers: {
                'content-type':'application/json',
                "x-access-token": token
            },
            body: JSON.stringify({userInfo, password})
        })
        .then(res => {
            if (res.ok) {
                context.confirmSignOut()
            } 
            return res
        })
        .catch(err => console.log(err))
    }
    const Username = ({username,onSave}: {username: string, onSave: (edit:string)=> void}) => {
        const [toggle,setToggle] = useState(false)
        const [newUsername, setNewUsername] = useState(username)
        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
            setNewUsername(event.target.value) };
        const onSaveEdit = () => { onSave(newUsername); setToggle(!toggle) };
        const onCancel = () => { setNewUsername(username); setToggle(!toggle) };
        return (
            <div>
                <label> Username:  {toggle ?
                    <input value={newUsername} onChange={onChange} type="text" name='username'/> 
                    : <span>{newUsername}</span>  
                }</label>
                
                {toggle ? (<>
                <button name='username' className="editButtons" onClick={onSaveEdit}> save </button>
                <button name='username' className="editButtons" onClick={onCancel}> cancel </button>
                </>)

                : <button name='username' className="editButtons" 
                    onClick={()=>setToggle(!toggle)}>
                        <i className="fa-regular fa-pen-to-square"/>
                    </button>} 
        </div>)
    }
    const EmailAddress = ({email,onSave}: {email: string, onSave: (edit:string)=> void}) => {
        const [toggle,setToggle] = useState(false)
        const [newEmail, setNewEmail] = useState(email)
        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { setNewEmail(event.target.value) };
        const onSaveEdit = () => { onSave(newEmail); setToggle(!toggle) };
        const onCancel = () => { setNewEmail(email); setToggle(!toggle) };
        return (
        <div>
            <label> Email:  {toggle ?
                    <input value={newEmail} onChange={onChange} type="text" name='email'/> 
                    : <span>{newEmail}</span>  
            }</label>
            {toggle ? (<>
            <button name='email' className="editButtons" 
                onClick={onSaveEdit}> save </button>
            <button name='email' className="editButtons" 
                onClick={onCancel}> cancel </button>
            </>)
            : <button name='email' className="editButtons" 
                onClick={()=>setToggle(!toggle)}> 
                    <i className="fa-regular fa-pen-to-square"/>
                </button>} 
        </div>)
    }
    
    return (<>
        <h1>Account Info</h1>
        <div id='userPage'>
        { username ? <>
            <Username username={ username } onSave={ (edit:string)=>setUsername(edit) }/> 
            <EmailAddress email={ email } onSave={ (edit:string)=>setEmail(edit) }/>

            <NewPassword onSave={updatePassword} />
            <div id='userEditorBottom'>
                <button disabled={!(username != userInfo?.username || email != userInfo?.email)}
                    onClick={()=>updateInfo(username, email)}> Save Changes </button>
                <UserDelete onDelete={onDelete} />
            </div>
            </>

            : <p>Oops, there's nothing here for you.<br/>
                <Link to="/login">Log in</Link> or <Link to="/signup">Sign up</Link></p>}
        </div>
        </>
    )
}

export default User;