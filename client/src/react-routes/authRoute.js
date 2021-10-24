import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getStorage } from '../config';

export const AuthRoute = ({ auth, component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => {
        var logged = getStorage(); // Lấy ra json web token
        console.log(logged);
        return logged === null ? <Component {...props} /> : <Redirect to='/home' />;
    }} />
)