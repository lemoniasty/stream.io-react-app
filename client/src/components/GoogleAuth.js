import React from 'react';
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth', () => {
            // Client library has been downloaded successfully.
            // Let's init the OAuth client library.
            window.gapi.client.init({
                clientId: '805462335496-06cufvmndf9ohjsugm7db1apnav1pkm7.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // After successfully initialization of gAPI auth client.
                // So let's get instance of GoogleAuth class.
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());

                // Setup event listener for listening auth status changes.
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // Callback function invoked every time when auth status will change.
    onAuthChange = (isSignedIn) => {
        (isSignedIn)
            // During the sign-in process, pass Google ID to the reducer.
            ? this.props.signIn(this.auth.currentUser.get().getId())
            : this.props.signOut();
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSighOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn === true) {
            return (
                <button onClick={this.onSighOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    };

}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(
    mapStateToProps,
    {signIn, signOut}
)(GoogleAuth);