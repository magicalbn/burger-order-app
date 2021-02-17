import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import * as actionType from '../../store/actions/ActionsIndex'


class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (
            <>
            <Redirect to="/auth"/>
            </>
        );
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        logout: () => dispatch(actionType.logOut())
    }
}

export default connect(null, mapDispatchtoProps)(Logout);