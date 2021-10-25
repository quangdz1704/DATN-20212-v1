import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getStorage } from '../config';

const checkURL = (urlName, linkArr) => {
    var result = false;
    if(linkArr !== undefined){
        linkArr.forEach(link => {
            if(link.url === urlName){
                result = true;
            }
        });
    }

    return result;
}

const PrivateRoute = ({ auth, isLoading, arrPage, pageName, link, component: Component, layout: Layout, ...rest }) => {
    // const {password2AlreadyExists} = auth;
    
    return <Route {...rest} render={props => {
        var logged = getStorage();
        console.log('logged', logged);
        // if(password2AlreadyExists)
        //     return <Redirect to='/answer-auth-questions'/>
        // else
        if (logged !== null) {
            // if(auth.calledAPI !== CallApiStatus.FINISHED)
            //     return <Layout></Layout>
            
            // if(link !== '/' && checkURL(link, auth.links) !== true){
            //     return <Redirect to='/home'/>
            // } 
            return <Layout arrPage={ arrPage } pageName={ pageName } isLoading={ isLoading }><Component {...props}/></Layout>
        }else{
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
    }} />
}

export { PrivateRoute };

