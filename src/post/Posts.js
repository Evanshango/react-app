import React, {Component} from 'react';
import {listPosts} from "./apiPost";
import DefaultPost from '../images/default.jpg'
import {Link} from "react-router-dom";

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        listPosts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({posts: data})
            }
        })
    }

    renderPosts = posts => {
        return (
            <div className='row mt-3'>
                {posts.map((post, i) => {
                    const posterId = post.postedBy ? `/users/${post.postedBy._id}` : '';
                    const posterName = post.postedBy ? post.postedBy.name : ' Anonymous';

                    return (
                        <div className="col-md-4 col-sm-4 mb-3" key={i}>
                            <div className="card" style={{minHeight: '30vw'}}>
                                <img className="card-img-top"
                                     src={`${process.env.REACT_APP_BASE_URL}/post/photo/${post._id}`}
                                     alt={post.title} onError={i => i.target.src = `${DefaultPost}`}
                                     style={{width: '100%', height: '15vw', objectFit: 'cover'}}/>
                                <div className="card-body">
                                    <b style={{fontSize: '22px'}}>{post.title}</b>
                                    <p className="card-text">{post.body.substring(0, 100)}</p>
                                    <br/>
                                    <p className=' mark'>
                                        By <Link className='font-italic' to={posterId}>{posterName}{' '}</Link>
                                    </p>
                                    <p className='font-italic' style={{color: 'red'}}>
                                        {new Date(post.created).toDateString()}
                                    </p>
                                    <div className="col text-right">
                                        <Link to={`/posts/${post._id}`} className="btn btn-raised btn-sm btn-success">
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    };

    render() {
        const {posts} = this.state;
        return (
            <div className='container'>
                <h4 className='mt-5 mb-3'>{!posts.length ? 'Loading...' : "Recent Posts"}</h4>
                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts;
