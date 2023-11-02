import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';




const Signup = () => {
  
  const [status, setStatus] = useState<string>()
  const [isValid, setIsValid] = useState(false)
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")

  useEffect(()=>{
    if (username && email && password1 && password2) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  })
  const signupUser = ({username, email, password}: {username: string, email: string, password: string}) => {
    console.log('signupuser')
    const signUpData = {
        username,
        email,
        password,
    }
    return fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Accept': 'application/json',
                  'Content-Type': 'application/json'},
        body: JSON.stringify(signUpData),
    })
    .then(res => res.json())
    .catch(err => console.log('err',err))
  }
  const handleSubmit = async () => {
    if (password1 !== password2) {
      setStatus("Passwords do not match")
      return
    }
    const newUser = await signupUser({
      username: username,
      email: email,
      password: password1
    })
    setStatus(newUser?.message)
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const f = event.target.name
    const edit = event.target.value
    switch(f) {
      case 'username': setUsername(edit)
        break;
      case 'email': setEmail(edit)
        break;
      case 'password': setPassword1(edit)
        break;
      case 'password2': setPassword2(edit)
        break;
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <p>{status}</p>
      <div id="loginForm">
        <label>Username: 
          <input type="text" name="username" id="username" 
          value={username} onChange={handleChange}/>
        </label>

        <label>Email: 
          <input type="text" name="email" id="email" 
          value={email} onChange={handleChange}/>
        </label>

        <label>Password: 
          <input type="password" name="password" id="password"
          value={password1} onChange={handleChange}/>
        </label>
        <label>Retype: 
          <input type="password" name="password2" id="password2"
          value={password2} onChange={handleChange}/>
        </label>
      </div>

      <button className="addToCart" 
        onClick={handleSubmit} disabled={!isValid}> 
          Sign Up </button>

      <div> 
        Already have an account? <Link to='/login'>Log in</Link>
      </div>
      <p style={{fontSize: '.65em', margin:'1em 2em'}}>
        For my records only.
        I won't share your email with anyone.
        All transactions are thru PayPal.
      </p>
    </div>
    );
}

export default Signup;