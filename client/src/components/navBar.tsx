import { Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";

type NavProps = {
  isLoggedIn: boolean,
  signOut: ()=>void,
  itemCount?: number
};

const NavBar = ({isLoggedIn ,signOut, itemCount}: NavProps) => {
  const activeStyle = {
    textDecoration: "underline"
  };
  const nonActiveStyle = {
    textDecoration: "none"
  };
  const signOutStyle = {
    border: 'none',
    margin: '0',
    backgroundColor: 'white'
  };
  
  const isActiveStyle = ({ isActive }: {isActive:boolean}) => 
    isActive ? activeStyle : nonActiveStyle;
  
  const userLinks = isLoggedIn ? 
      <NavLink to='/cart' style={isActiveStyle} className='routeLink rl'>
          Cart 
          {itemCount ? <Badge pill bg="secondary" id='cartBadge'>{itemCount}</Badge> : null }
          </NavLink>
    : <NavLink to='/login' style={isActiveStyle} 
        className='routeLink rl'>Login / Signup</NavLink>    
  

  return (
    
    <div className='navBar'>

      <NavLink to='/shop' style={isActiveStyle } 
      className='routeLink rl'>Shop</NavLink>

      <NavLink to='/contact' style={isActiveStyle } 
      className='routeLink rl'>Contact</NavLink>
      
      <NavLink to='/cart' style={isActiveStyle} className='routeLink rl'>
        Cart 
        {itemCount ? <Badge pill bg="secondary" id='cartBadge'>{itemCount}</Badge> : null }
      </NavLink>


    </div>
  );
}


export default NavBar;



