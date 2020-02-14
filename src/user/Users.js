import React, {Component} from 'react';
import {list} from "./apiUser";

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

    render() {
        const {users} = this.state;
        return (
            <div className='container'>
                <div className="card mt-3">
                    <div className="card-body">
                        {users.map((user, i) => (
                            <div key={i}>
                                <p>{user.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;
