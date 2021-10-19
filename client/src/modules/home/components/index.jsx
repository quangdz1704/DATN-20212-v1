import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { Introduction } from '../../intro/components';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { auth } = this.props;
        if(Object.entries(auth.user).length > 0){
            if (!auth.user.company)
                // return <SystemHome />
                return <>Homesuper</>
            else {
                // return <SuperHome />
                return <>Quang</>
            }
        } else return <Introduction/>
    }
}

function mapState(state) {
    const { auth } = state;
    return { auth };
}

const connectedHome = connect(mapState, null)(withTranslate(Home));
export { connectedHome as Home };
