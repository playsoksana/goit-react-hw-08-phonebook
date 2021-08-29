import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import * as authSelector from '../../redux/authRedux/authSelector';

const PublicRoute = ({ children, props, restricted = false, urlFToRedirect }) => {
    const isLoggedIn = useSelector(authSelector.getIsLoggedIn)
    return <Route {...props}>{isLoggedIn && restricted?<Redirect to={urlFToRedirect}/>:children}</Route>
}

export default PublicRoute;