// Step 2
//  Let's define GoogleAuth component, which will be responsible for
//  authentication via Google OAuth API.
import React from 'react';

class GoogleAuth extends React.Component {

    state = {isSignedIn: null};

    componentDidMount() {
        // Step 4
        //  Load necessary libraries via Google API library.
        window.gapi.load('client:auth', () => {
            // Client library has been downloaded successfully.
            // Let's init the OAuth client library.
            window.gapi.client.init({
                clientId: 'x05462335496-06cufvmndf9ohjsugm7db1apnav1pkm7.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // After successfully initialization of gAPI auth client.
                // So let's get instance of GoogleAuth class.
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});

                // Setup event listener for listening auth status changes.
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // Callback function invoked every time when auth status will change.
    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
    };

    onSignIn = () => {
        this.auth.signIn();
    };

    onSighOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn === true) {
            return (
                <button onClick={this.onSighOut} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignIn} className="ui red google button">
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

export default GoogleAuth;