import React, {Component} from 'react';
import {list} from "./apiUser";
import DefaultProfile from '../images/avatar.png'
import {Link} from "react-router-dom";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({users: data})
            }
        })
    }

    renderUsers = (users) => (
        <div className='row mt-3'>
            {users.map((user, i) => (
                <div className="card col-md-3 col-sm3 mr-3 mb-3" key={i}>
                    <img className="card-img-top" src={DefaultProfile} alt={user.name}
                         style={{width: '100%', height: '13vw', objectFit: 'cover'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">
                            {user.email}
                        </p>
                        <div className="col text-center">
                            <Link to={`/users/${user._id}`} className="btn btn-raised btn-sm btn-primary">View
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const {users} = this.state;
        return (
            <div className='container'>
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;
