import React, {Component} from 'react';

class SinglePost extends Component {
    render() {
        return (
            <div>
                {this.props.match.params.postId}
            </div>
        );
    }
}

export default SinglePost;
