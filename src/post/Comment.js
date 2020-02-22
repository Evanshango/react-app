import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import {comment, uncomment} from "./apiPost";
import DefaultProfile from "../images/avatar.png";

class Comment extends Component {
    state = {text: '', error: ''};

    handleChange = event => {
        this.setState({error: ''});
        this.setState({text: event.target.value})
    };

    isValid = () => {
        const {text} = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({error: 'Comment should not be empty or more than 150 characters'});
            return false
        }
        return true;
    };

    addComment = e => {
        e.preventDefault();
        if (!isAuthenticated()) {
            this.setState({error: 'Please sign in to proceed'});
            this.setState({text: ''});
            return false;
        }
        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;

            comment(userId, token, postId, {text: this.state.text}).then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.setState({text: ''});
                    //dispatch fresh list of comments to current component
                    this.props.updateComments(data.comments)
                }
            })
        }
    };

    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                //dispatch fresh list of comments to current component
                this.props.updateComments(data.comments)
            }
        })
    };

    deleteConfirmed = (comment) => {
        let answer = window.confirm('Are you sure you want to delete your comment?');
        if (answer) {
            this.deleteComment(comment)
        }
    };

    render() {
        const {comments} = this.props;
        const {error} = this.state;
        return (
            <div>
                <h5 className='mt-5 mb-3'>Comments</h5>
                <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                    {error}
                </div>
                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input type="text" onChange={this.handleChange} className='form-control'
                               value={this.state.text} placeholder='Leave a Comment...'/>
                        <button className="btn btn-sm btn-success btn-raised mt-2">Post</button>
                    </div>
                </form>
                <div className="col-md-12">
                    <h5 className="text-primary mb-3">{comments.length} Comments</h5>
                    <hr/>
                    {comments.map((comment, i) => (
                        <div key={i}>
                            <div>
                                <Link to={`/users/${comment.postedBy._id}`}>
                                    <img className='float-left mr-2' height='40px' width='40px'
                                         style={{borderRadius: '50%', border: '1px solid black'}}
                                         src={`${process.env.REACT_APP_BASE_URL}/user/photo/${comment.postedBy._id}`}
                                         alt={comment.postedBy.name}
                                         onError={i => i.target.src = `${DefaultProfile}`}/>
                                </Link>
                                <span>{comment.text}</span>
                                <br/>
                                <p className='font-italic mark'>
                                    <Link to={`/users/${comment.postedBy._id}`}>{comment.postedBy.name}{' '}</Link>
                                    {' '}{new Date(comment.created).toDateString()}
                                    <span>
                                         {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (
                                             <>
                                                 <span onClick={() => this.deleteConfirmed(comment)}
                                                       className="text-danger float-right"
                                                       style={{cursor: 'pointer', color: '#fff'}}>Remove
                                                 </span>
                                             </>
                                         )}
                                    </span>
                                </p>
                                <hr/>
                            </div>
                        </div>)
                    )}
                </div>
            </div>
        );
    }
}

export default Comment;
