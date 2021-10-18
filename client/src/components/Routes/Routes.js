import React, {useContext} from 'react'
import { BrowserRouter as Redirect, Switch, Route } from "react-router-dom";

import LoginForm  from '../LoginForm/LoginForm.jsx';
import Form from '../Form/Form.jsx';
import AuthApi from '../../AuthApi.js';


const Routes = () => {
    const Auth = useContext(AuthApi);
    return (
        <Switch>
            <Route path='/login' component={LoginForm}/>
            <ProtectedRoute path='/form' auth={Auth.auth} component={Form}/>
        </Switch>
    )
}

const ProtectedRoute = ({auth, component: Component, ...rest}) => {
    return(
        <Route 
        {...rest}
        render={() => auth ? (
            <Component/>
        ): 
            (
                <Redirect to="/login" />
            )
        }
        />
    )
}

export default Routes
