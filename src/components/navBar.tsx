import { Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { convertCompilerOptionsFromJson } from "typescript";

type NavProps = {
  isLoggedIn: boolean,
  signOut: ()=>void,
  itemCount?: number
};

const NavBar = ({isLoggedIn ,signOut, itemCount}: NavProps) => {
  const activeStyle = {
    // textDecoration: "underline",
    backgroundColor: 'white',
    color: 'black',
    padding: '0 1em',
    borderRadius: '.75em',
    boxShadow: "0 2px 20px 3px rgba(0, 0, 0, 0.253)",
  };
  const nonActiveStyle = {
    textDecoration: "none"
  };
  
  const isActiveStyle = ({ isActive }: {isActive:boolean}) => 
    isActive ? activeStyle : nonActiveStyle;
  

  return (
    <div className='navDiv'>
      <div className='navBar'>

        <NavLink to='./shop' style={isActiveStyle } 
        className='routeLink rl'>Shop</NavLink>

        <NavLink to='./about' style={isActiveStyle } 
        className='routeLink rl'>About</NavLink>

        <NavLink to='./contact' style={isActiveStyle } 
        className='routeLink rl'>Contact</NavLink>
        
        <NavLink to='./cart' style={isActiveStyle} className='routeLink rl'>
          Cart 
          {itemCount ? <Badge pill bg="secondary" id='cartBadge'>{itemCount}</Badge> : null }
        </NavLink>


      </div>
          <hr style={{width: '80%', margin: 'auto'}}/> 
    </div>
  );
}


export default NavBar;



