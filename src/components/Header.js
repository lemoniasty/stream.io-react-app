import React from 'react';
import {Link} from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Stream.io
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    All Streams
                </Link>
                {/* Step 3 - Add GoogleAuth element to the header component. */}
                <GoogleAuth/>
            </div>
        </div>
    );
};

export default Header;