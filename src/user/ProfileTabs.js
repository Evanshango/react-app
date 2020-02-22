import React, {Component} from 'react';
import DefaultProfile from "../images/avatar.png";
import {Link} from "react-router-dom";

class ProfileTabs extends Component {
    render() {
        const {following, followers, posts} = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="text-primary mb-3">POSTS</h5>
                        <hr/>
                        {posts.map((post, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/posts/${post._id}`}>
                                        <img className='float-left mr-2' height='40px' width='40px'
                                             style={{borderRadius: '50%', border: '1px solid black'}}
                                             src={`${process.env.REACT_APP_BASE_URL}/post/photo/${post._id}?${new Date().getTime()}`}
                                             alt={post.title}
                                             onError={i => i.target.src = `${DefaultProfile}`}/>
                                        <div>
                                            <p className='lead'>{post.title}</p>
                                        </div >
                                    </Link>
                                    <hr/>
                                </div>
                            </div>)
                        )}
                    </div>
                    <div className="col-md-4">
                        <h5 className="text-primary">FOLLOWERS</h5>
                        <hr/>
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/users/${person._id}`}>
                                        <img className='float-left mr-2' height='40px' width='40px'
                                             style={{borderRadius: '50%', border: '1px solid black'}}
                                             src={`${process.env.REACT_APP_BASE_URL}/user/photo/${person._id}`}
                                             alt={person.name}
                                             onError={i => i.target.src = `${DefaultProfile}`}/>
                                        <div>
                                            <p className='lead'>{person.name}</p>
                                        </div>
                                    </Link>
                                    <hr/>
                                </div>
                            </div>)
                        )}
                    </div>
                    <div className="col-md-4">
                        <h5 className="text-primary mb-3">FOLLOWING</h5>
                        <hr/>
                        {following.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/users/${person._id}`}>
                                        <img className='float-left mr-2' height='40px' width='40px'
                                             style={{borderRadius: '50%', border: '1px solid black'}}
                                             src={`${process.env.REACT_APP_BASE_URL}/user/photo/${person._id}`}
                                             alt={person.name}
                                             onError={i => i.target.src = `${DefaultProfile}`}/>
                                        <div>
                                            <p className='lead'>{person.name}</p>
                                        </div>
                                    </Link>
                                    <hr/>
                                </div>
                                {/*<p style={{clear: 'both'}}>{person.about}</p>*/}
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileTabs;
