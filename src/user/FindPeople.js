import React, {Component} from 'react';
import {findPeople, follow} from "./apiUser";
import DefaultProfile from '../images/avatar.png'
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";

class FindPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: '',
            open: false,
            followMessage: ''
        }
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({users: data})
            }
        })
    }

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        follow(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({error: data.error})
            } else {
                let toFollow = this.state.users;
                toFollow.splice(i, 1);//take the clicked user and remove it from the state
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name}`
                })
            }
        })
    };

    renderUsers = (users) => (
        <div className='row mt-3'>
            {users.map((user, i) => (
                <div className="col-md-3 col-sm-3 mb-3" key={i}>
                    <div className="card">
                        <img className="card-img-top" src={`${process.env.REACT_APP_BASE_URL}/user/photo/${user._id}`}
                             alt={user.name} onError={i => i.target.src = `${DefaultProfile}`}
                             style={{width: '100%', height: '15vw', objectFit: 'cover'}}/>
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">
                                {user.email}
                            </p>
                            <Link to={`/users/${user._id}`} className="btn btn-raised btn-sm btn-primary"
                                  style={{minWidth: '80px'}}>View
                            </Link>
                            <button onClick={() => this.clickFollow(user, i)}
                                    className="btn btn-raised btn-sm btn-info float-right"
                                    style={{minWidth: '80px'}}>Follow
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const {users, open, followMessage} = this.state;
        return (
            <div className='container'>
                <h4 className='mt-5 mb-3'>Find People</h4>
                {open && (
                    <div className='alert alert-success'>{open && (<p>{followMessage}</p>)}</div>
                )}
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;
