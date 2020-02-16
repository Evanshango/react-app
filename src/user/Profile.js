import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import {read} from "./apiUser";
import DefaultProfile from '../images/avatar.png'
import DeleteUser from "./DeleteUser";
import FollowProfileBtn from "./FollowProfileBtn";
import ProfileTabs from "./ProfileTabs";

class Profile extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {following: [], followers: []},
            redirectToSignIn: false,
            following: false,
            error: ''
        }
    }

    //check follow
    checkFollow = user => {
        const token = isAuthenticated();
        return user.followers.find(follower => {
            return follower._id === token.user._id
        })
    };

    clickFollowBtn = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        callApi(userId, token, this.state.user._id).then(data => {
            if (data.error){
                this.setState({error: data.error})
            } else {
                this.setState({user: data, following: !this.state.following})
            }
        })
    };

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (this._isMounted) {
                if (data.error) {
                    this.setState({redirectToSignIn: true})
                } else {
                    let following = this.checkFollow(data);
                    this.setState({user: data, following})
                }
            }
        });
    };

    componentDidMount() {
        this._isMounted = true;
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {redirectToSignIn, user} = this.state;
        if (redirectToSignIn) return <Redirect to='/signin'/>;
        let photoUrl = user._id ? `${process.env.REACT_APP_BASE_URL}/user/photo/${user._id}?${new Date().getTime()}` :
            DefaultProfile;
        return (
            <div className='container'>
                <h4 className='mt-4'>Profile</h4>
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <div className="col-md-6 col-sm-3">
                            <img className="card-img-top img-thumbnail" src={photoUrl} alt={user.name}
                                 onError={i => i.target.src = `${DefaultProfile}`}
                                 style={{width: '100%', height: '15vw', objectFit: 'cover'}}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="lead mt-4 ml-4">
                                <p>Hello {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                            </div>
                            {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                                <div className="d-inline-block mt-3 ml-4 mb-4 text-center">
                                    <Link
                                        className='btn btn-raised btn-sm btn-success mr-5'
                                        to={`/users/edit/${user._id}`}>
                                        Edit Profile
                                    </Link>
                                    <DeleteUser userId={user._id}/>
                                </div>
                            ) : (
                                <FollowProfileBtn following={this.state.following} onButtonClick={this.clickFollowBtn}/>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <hr/>
                        <p className="lead ml-3 mt-3 mb-3">{user.about}</p>
                        <hr/>
                        <ProfileTabs followers={user.followers} following={user.following}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
