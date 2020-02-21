import React, {Component} from 'react';
import {likePost, removePost, singlePost, unlikePost} from "./apiPost";
import DefaultPost from "../images/default.jpg";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";

class SinglePost extends Component {
    state = {
        post: '', redirectToHome: false, like: false, likes: 0, redirectToSignIn: false
    };

    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        return likes.indexOf(userId) !== -1;
    };

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({post: data, likes: data.likes.length, like: this.checkLike(data.likes)})
            }
        })
    };

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        removePost(postId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToHome: true})
            }
        })
    };

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete this post?');
        if (answer) {
            this.deletePost()
        }
    };

    likeToggle = () => {
        if (!isAuthenticated()){
            this.setState({redirectToSignIn: true});
            return false
        }
        let callApi = this.state.like ? unlikePost : likePost;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;
        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                })
            }
        })
    };

    renderPost = post => {
        const posterId = post.postedBy ? `/users/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : ' Anonymous';
        const {like, likes} = this.state;
        return (
            <div className="card" style={{minHeight: '30vw'}}>
                <img className="card-img-top"
                     src={`${process.env.REACT_APP_BASE_URL}/post/photo/${this.state.post._id}`}
                     alt={post.title} onError={i => i.target.src = `${DefaultPost}`}
                     style={{width: '100%', height: '25vw', objectFit: 'cover'}}/>
                <div className="card-body">
                    {like ? (<h6 onClick={this.likeToggle} className='mb-3 text-success'><i
                        className="fa fa-thumbs-up text-success bg-dark"
                        style={{padding: '10px', borderRadius: '50%'}}/>{' '}{likes} Likes</h6>) : (
                        <h6 onClick={this.likeToggle} className='mb-3 text-warning'><i
                            className="fa fa-thumbs-up text-warning bg-dark"
                            style={{padding: '10px', borderRadius: '50%'}}/>{' '}{likes} Likes</h6>
                    )}
                    <p className="card-text">{post.body}</p>
                    <br/>
                    <p className='font-italic mark'>
                        Posted by <Link to={posterId}>{posterName}{' '}</Link>on{' '}
                        {new Date(post.created).toDateString()}
                    </p>
                    <div className="d-inline-block">
                        <Link to={'/'} className="btn btn-raised btn-sm btn-success mr-5">Back to Posts </Link>
                        {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                            <>
                                <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-sm btn-info mr-5">Update
                                    Post</Link>
                                <button onClick={this.deleteConfirmed} className="btn btn-raised btn-sm btn-danger">
                                    Delete Post
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    };

    render() {
        const {post, redirectToHome, redirectToSignIn} = this.state;
        if (redirectToHome) {
            return <Redirect to={'/'}/>
        } else if (redirectToSignIn) {
            return <Redirect to={'/signin'}/>
        }
        return (
            <div className='container'>
                <h4 className='display-2 mt-5'>{post.title}</h4>
                {!post ? (
                    <div className='jumbotron text-center'>
                        <h6>Loading...</h6>
                    </div>) : (this.renderPost(post))}
            </div>
        );
    }
}

export default SinglePost;
