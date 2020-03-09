import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//redux
import { useSelector } from 'react-redux';


export const ProtectedRoute = ({ component: Component, ...rest }) => {

    const user = useSelector(({ user }) => user.user)

    if (user && user.roleId === 1) {
        return <Route {...rest} render={props => <Component {...props} />} />
    } else {
        return <Redirect to="/" />;
    }
}
