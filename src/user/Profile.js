import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import {read} from "./apiUser";
import DefaultProfile from '../images/avatar.png'
import DeleteUser from "./DeleteUser";

class Profile extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            redirectToSignIn: false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (this._isMounted) {
                if (data.error) {
                    this.setState({redirectToSignIn: true})
                } else {
                    this.setState({user: data})
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
                        <div className="lead mt-4">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id === user._id && (
                            <div className="d-inline-block mt-3">
                                <Link
                                    className='btn btn-raised btn-sm btn-success mr-3' to={`/users/edit/${user._id}`}>
                                    Edit Profile
                                </Link>
                                <DeleteUser userId={user._id}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
