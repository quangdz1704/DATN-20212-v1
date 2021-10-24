import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { auth } = this.props;
        // if(Object.entries(auth.user).length > 0){
        //     if (!auth.user.company)
        //         // return <SystemHome />
        //         return <>Homesuper</>
        //     else {
        //         // return <SuperHome />
        //         return <>Quang</>
        //     }
        // } else return <Introduction/>
        return <div className="box box-body">
            This is Home! Please change me!
        </div>
    }
}

function mapState(state) {
    const { auth } = state;
    return { auth };
}

const connectedHome = connect(mapState, null)(withTranslate(Home));
export { connectedHome as Home };

