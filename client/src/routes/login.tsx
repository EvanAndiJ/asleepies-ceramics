import {useState, useEffect} from 'react';
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { OutContext } from '../types';

const Login = () => {
  let navigate = useNavigate()
  const context = useOutletContext<OutContext>()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [isValid, setIsValid]= useState(false)


  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
    .then(data => data.json())
    .then(loginRes => {
      if (loginRes.accessToken) {
        context.signIn(loginRes)
        navigate('/', {replace: true})
      } else {
        setStatus(loginRes.message)
      }
    })
    .catch(err => console.log(err))
    
    
  }

  return (
    <div>
      <h4>Login</h4>
      <p>{status}</p>
      <form  id="loginForm">
        <label>Email: 
          <input type="text" placeholder="email"
            onChange={e => setEmail(e.target.value)}/></label>

        <label>Password: 
          <input type="password" placeholder="password"
            onChange={e => setPassword(e.target.value)} /></label>

      </form>
      <button type="submit" className="addToCart" onClick={handleSubmit} 
        disabled={!(email && password)}> Log In </button>
        
      <div>No account? <Link to='/signup'>Sign Up</Link></div>
    </div>
    );
}

export default Login;