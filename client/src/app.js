import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { IntlActions } from 'react-redux-multilingual';
import { Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PinnedPanel } from '../src/common-components';
import './app.css';
import { getStorage, setStorage } from './config';
import firebase from './firebase';
import AuthAlert from './modules/alert/components/authAlert';
import ServerDisconnectedAlert from './modules/alert/components/serverDisconnectdAlert';
import { SocketConstants } from './modules/socket/redux/constants';
import Routes from './react-routes/routes';
import store from './redux/store';

const history = createBrowserHistory();

const getFCToken = async () => {
    try{
        let fcToken = getStorage('fcToken');
        if(!fcToken) {
            const messaging = firebase.messaging();
            fcToken = await messaging.getToken({ vapidKey: 'BLXA7GNvA6Nk3sqs8JP9aSRGI_ZyU03e9C9F3Ue7HpnXD4OWzFvdmENmQoNafmtCDazShrjom0rRLQwRpn0b8Vw' });
            console.log("TOken", fcToken);
            setStorage("fcToken", fcToken);
        }

        return fcToken;
    } catch(err){
        console.log(err);
    }
}
// firebase.analytics();
class App extends Component {
    constructor() {
        super();
        this.state = { }
    }

    componentDidMount() {
        getFCToken();
        const lang = localStorage.getItem('lang');
        if(lang !== null){
            switch(lang){
                case 'en':
                case 'vn':
                    store.dispatch(IntlActions.setLocale(lang));
                    break;
                default:
                    localStorage.setItem('lang', 'vn');
                    store.dispatch(IntlActions.setLocale('vn'));
                    break;
            }
        }else{
            localStorage.setItem('lang', 'vn');
            store.dispatch(IntlActions.setLocale('vn'));
        }
        
        const userId = getStorage('userId');
        if(userId){
            const {socket} = store.getState();
            if(!socket.connected) store.dispatch({ type: SocketConstants.CONNECT_SOCKET_IO });                                                                                                     
        }
    }

    render() {
        return (
            <React.Fragment>
                <ServerDisconnectedAlert/>
                <AuthAlert />
                <ToastContainer 
                    // enableMultiContainer={true}
                    // closeOnClick={true}
                    // draggable={false}
                    // containerId={'toast-notification'}
                    // position={toast.POSITION.TOP_RIGHT}
                />
                <Router history={history}>
                    <Routes/>
                </Router>
                <PinnedPanel>
                    {/* <TaskTimesheetLog /> */}
                </PinnedPanel> 
            </React.Fragment>
        );
    }
}

export default App;