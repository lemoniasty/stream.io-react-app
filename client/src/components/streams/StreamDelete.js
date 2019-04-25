import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Modal from '../Modal';
import history from '../../history';
import {fetchStream, deleteStream} from "../../actions";

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    // Prepare fragment used by Modal component.
    renderAction() {
        // React Fragments is a JSX looking element that is going to allow us
        // to return multiple elements in a single variable. When it gets
        // rendered onto the screen it doesn't produce any HTML.
        const {id} = this.props.match.params;

        return (
            <>
                <button
                    className="ui button negative"
                    onClick={() => this.props.deleteStream(id)}
                >
                    Delete
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </>
        );
    };

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?';
        }

        return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
    }

    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderAction()}
                onDismiss={() => history.push('/')}
            />
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(
    mapStateToProps,
    {fetchStream, deleteStream}
)(StreamDelete);