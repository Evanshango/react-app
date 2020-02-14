import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import {read} from "./apiUser";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            redirectToSignIn: false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({redirectToSignIn: true})
            } else {
                this.setState({user: data})
            }
        })
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    render() {
        const {redirectToSignIn, user} = this.state;
        if (redirectToSignIn) return <Redirect to='/signin'/>;
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <p>Hello {isAuthenticated().user.name}</p>
                        <p>Email: {isAuthenticated().user.email}</p>
                        <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                    </div>
                    <div className="col-md-6">
                        {isAuthenticated().user && isAuthenticated().user._id === user._id && (
                            <div className="d-inline-block mt-3">
                                <Link
                                    className='btn btn-raised btn-sm btn-success mr-3' to={`/user/edit/${user._id}`}>
                                    Edit Profile
                                </Link>
                                <button className="btn btn-raised btn-danger btn-sm">Delete Profile</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
