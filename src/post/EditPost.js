import React, {Component} from 'react';

class EditPost extends Component {
    render() {
        return (
            <div>
                <h4>Edit Post</h4>
                {this.props.match.params.postId}
            </div>
        );
    }
}

export default EditPost;
