import React, { Component } from 'react';
import Auxiliary from '../Hoc/Auxiliary';
import Toolbar from './Toolbar'
import { connect } from 'react-redux'



class Layout extends Component {

    render() {
        return (
            <Auxiliary>
                <Toolbar isAuthenticated={this.props.isAuthenticated}></Toolbar>
                <main>
                    {this.props.children}
                </main>


            </Auxiliary>
        );
    }
}

const mapStatetoProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStatetoProps)(Layout);