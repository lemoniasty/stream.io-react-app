import React from 'react';
import flv from 'flv.js';
import {connect} from "react-redux";
import {fetchStream} from "../../actions";

class StreamShow extends React.Component {

    constructor(props) {
        super(props);

        // Refs provide a way to access DOM nodes or React elements created in
        // the render method.
        // Refs system helps us to modify a child element outside of the
        // typical dataflow. The child to be modified could be an instance of a
        // React component, or it could be a DOM element.
        // Fev good use cases of refs:
        //  * Managing focus, text selection or media playback.
        //  * Triggering animations
        //  * Integrating with third-party DOM libraries.
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        // Destroy player instance.
        this.player.destroy();
    }

    // We have to be sure that we have video component will be attached after
    // downloading data about a selected stream (video element must be present
    // on the screen).
    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }

        // Setup flv.js.
        const {id} = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        // Attach media element by using videoRef ref.
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const {title, description} = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%'}} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(
    mapStateToProps,
    {fetchStream}
)(StreamShow);