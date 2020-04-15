import React from "react";
import "./Login.css";
import { useAuth0 } from '../../react-auth0-spa';


export default props => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { isAuthenticated, loginWithRedirect, logout, getTokenSilently } = useAuth0();
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };


    return (
      <div className="login-page">
        {!isAuthenticated && ( <button onClick={() => loginWithRedirect({
              redirect_uri: 'http://localhost:3000/dash'
        })}>Log in</button>)}
      </div>
    );
}
