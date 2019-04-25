import React from 'react';
import ReactDOM from 'react-dom';

// Step 1
//  Define component Modal, which will be reusable Modal component which will
//  use a React Portals functionality.
const Modal = props => {
    // When we use a portal, we need to return Portal instead JSX element.
    return ReactDOM.createPortal(
        <div
            className="ui dimmer modals visible active"
            onClick={props.onDismiss}
        >
            <div
                className="ui standard modal visible active"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;