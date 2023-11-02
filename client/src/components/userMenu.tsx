import React from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import useUser from '../hooks/useUser';
import type { UserMenuProps } from '../types';

const UserMenu = ({logOut,isLoggedIn}: UserMenuProps) => { 
  const navigate = useNavigate()
  const LoggedOutMenu = () => {
    return (
    <>
      <Dropdown.Item as="span">
        <NavLink to='/login' className='routeLink rl'>
          Log in</NavLink></Dropdown.Item>
          
      <Dropdown.Item as="span">
        <NavLink to='/signup' className='routeLink rl'>
          Sign up</NavLink></Dropdown.Item>
    </>
  )}
  const LoggedInMenu = () => {
    const { userInfo } = useUser()
    return(
    <>
    <Dropdown.Item onClick={()=>navigate('/cart')}>
        Cart
        </Dropdown.Item>

    <Dropdown.Item as="span" onClick={()=>navigate('/user')}>
        Account
          </Dropdown.Item>

    <Dropdown.Item as="span" onClick={()=>logOut()}>
        Signout</Dropdown.Item>
    </>
  )}
  
  return (
    <DropdownButton title="&#9776;" id="userMenu">
      {isLoggedIn ? <LoggedInMenu/> : <LoggedOutMenu/>}
    </DropdownButton>
  );
}


export default UserMenu;