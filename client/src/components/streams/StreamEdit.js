import _ from 'lodash';
import React from 'react';
import {connect} from "react-redux";
import {editStream, fetchStream} from "../../actions";
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                {/*
                    A very special prop used by Redux-Form. We passing
                    object with keys which corresponds with the name of
                    the form Field components.
                */}
                <StreamForm
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit}/>
            </div>
        );
    }

}

// With React-Router, each component needs to be designed to work in
// isolation (fetch its own data!).
const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(
    mapStateToProps,
    {fetchStream, editStream}
)(StreamEdit);