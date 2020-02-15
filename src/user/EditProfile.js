import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {read, update} from "./apiUser";
import {Redirect} from "react-router-dom";

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            email: '',
            password: '',
            redirectToProfile: false,
            error: ''
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({redirectToProfile: true})
            } else {
                this.setState({id: data._id, name: data.name, email: data.email, error: ''})
            }
        });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    signUpForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange('name')} type="text"
                       className="form-control"
                       value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange('email')} type="email"
                       className="form-control"
                       value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange('password')} type="password"
                       className="form-control"
                       value={password}/>
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update
            </button>
        </form>
    );

    handleChange = (inputText) => event => {
        this.setState({error: ''});
        this.setState({[inputText]: event.target.value})
    };

    clickSubmit = event => {
        event.preventDefault();
        if (this.isValid()){
            const {name, email, password} = this.state;
            const user = {
                name, email, password: password || undefined
            };
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            update(userId, token, user).then(data => {
                if (data.error) this.setState({error: data.error});
                else this.setState({
                    redirectToProfile: true
                })
            })
        }
    };

    isValid = () => {
        const{name, email, password} = this.state;
        if (name.length === 0){
            this.setState({error: 'Name cannot be empty'});
            return false
        }
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            this.setState({error: 'Invalid email address'});
            return false
        }
        if (password.length >= 1 && password.length <=5){
            this.setState({error: 'Password too short'});
            return false
        }
        return true;
    };

    render() {
        const {id, name, email, password, redirectToProfile, error} = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/users/${id}`}/>
        }

        return (
            <div className='container'>
                <h4 className='mt-4'>Edit Profile</h4>
                <div className="row justify-content-center">
                    <div className="col-md-7 col-sm-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                                    {error}
                                </div>
                                {this.signUpForm(name, email, password)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProfile;
