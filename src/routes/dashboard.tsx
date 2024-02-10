import React, {useState, useEffect} from 'react'
import { NavLink, useParams } from "react-router-dom";
import EditItem from '../components/editItems'
import NewItem from '../components/newItem';
import useUser from '../hooks/useUser';
import useToken from '../hooks/useToken';
//@ts-expect-error
import http from '../scripts/http.js'
import { SkuInfo } from '../types';

function Dashboard() {
  const {token, setToken} = useToken()
  const [isAuth, setIsAuth] = useState(false)
  const [pass, setPass] = useState('')
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value)
  }
  const signIn = async () => {
    const res = await http.adminSignIn(pass)
    if (res.ok) {
      setIsAuth(true)
      setToken(res.accessToken)
    }
  }
  const [items, setItems] = useState([])
  const [page, setPage] = useState('edit')

  useEffect(() => {
    const getShop = () => {
      fetch('/api/shop', {
        method: 'POST',
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify({op: 'all'})
      })
      .then((res) => res.json())
      .then((data) => setItems(data.rows))
    }

    getShop()

  },[]);
  
  return (
    <div id="dashboardDiv">
        {token ? <>
          <div>
            <NavLink to='/dashboard/edit' onClick={()=>{setPage('edit')}}
              style={({ isActive }) => isActive ? {textDecoration: "underline"} : {undefined} } 
              className='routeLink rl'>Edit</NavLink>
            <NavLink to='/dashboard/add' onClick={()=>{setPage('new')}}
              style={({ isActive }) => isActive ? {textDecoration: "underline"} : {undefined} } 
              className='routeLink rl'>Add</NavLink>
          </div>

        {page === 'edit' ? 
          <div>
            <h2>Inventory</h2>
            <div>
              {items ? items.map((item: SkuInfo) => 
              <EditItem item={item} key={item.sku}/>) 
              : <p>"loading"</p>}
            </div>
          </div>

        : page === 'new' ?
          <div>
            <h2>Add Item</h2>
            <NewItem/>
          </div>
            
        : null}
        </>
        : <div style={{display:'flex', flexDirection:'column', width: '25%', alignItems:'center', margin:'auto'}}>
            Admin Dashboard
            <input type='password' name='adminPass' value={pass} onChange={onInput}/>
            <button onClick={signIn}>Sign In</button>
          </div>}
      </div>
  )
}

export default Dashboard;