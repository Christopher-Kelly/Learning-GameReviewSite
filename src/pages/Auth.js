import {useContext} from "react";
import {AuthContext} from "../components/AuthContext";
import {Link} from "react-router";

export const Auth = () => {
    const authContext = useContext(AuthContext);
    authContext.isLoggedIn = true;
    return (
        <Link to={"../firstPage"} />
    )
}