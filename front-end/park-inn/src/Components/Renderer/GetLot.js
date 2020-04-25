import React from "react";
import Loading from '../../Components/LoadingPage/Loading';
import { useAuth0 } from "../../react-auth0-spa";

const GetLot = (props) => {
    const { loading, user } = useAuth0();
    let set; 
    
    if (loading || !user) {
        return <Loading />;
    } 
    let name = user.name.givenName;

    return props.children(name);
}

export default GetLot;