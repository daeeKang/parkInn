import React from "react";
import "./Login.css";
import LoginHeader from './LoginHeader';
import About from './About';
import MainLanding from './MainLanding';
import CoreFeatures from "./CoreFeatures";
import Products from './Products';
import Arrow from './arrow_up.svg';
import ScrollUpButton from "react-scroll-up-button";
import { useAuth0 } from '../../react-auth0-spa';
import config from '../../auth_config.json';


export default props => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { isAuthenticated, loginWithRedirect, logout, getTokenSilently } = useAuth0();
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };


    return (
      <div>
        <ScrollUpButton
          ShowAtPosition={220}
          ContainerClassName="scroll-styles"
          TransitionClassName="scroll-transition"
        >
          <img src={Arrow} height="80px" width="80px" alt="to-top" />
        </ScrollUpButton>
        <LoginHeader />
        <MainLanding />
        <About />
        <CoreFeatures />
        {/* <Products /> */}

        {/* original login page */}
        {/* <div className="login-page">
          {!isAuthenticated && ( <button onClick={() => loginWithRedirect({
                redirect_uri: `${config.address}/dash`
          })}>Log in</button>)}
        </div> */}
      </div>
    );
}
