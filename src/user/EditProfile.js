import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {read, update} from "./apiUser";
import {Redirect} from "react-router-dom";
import DefaultProfile from '../images/avatar.png'

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            email: '',
            password: '',
            redirectToProfile: false,
            error: '',
            fileSize: 0,
            loading: false
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
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    signUpForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input onChange={this.handleChange('photo')} type="file" accept='image/*'
                       className="form-control"/>
            </div>
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

    handleChange = inputText => event => {
        this.setState({error: ''});
        let value = inputText === 'photo' ? event.target.files[0] : event.target.value;
        if (value != null) {
            const fileSize = inputText === 'photo' ? event.target.files[0].size : 0;
            this.userData.set(inputText, value);
            this.setState({[inputText]: value, fileSize})
        } else {
            this.setState({error: 'No file selected'})
        }
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            update(userId, token, this.userData).then(data => {
                if (data.error) this.setState({error: data.error});
                else this.setState({
                    redirectToProfile: true
                })
            })
        }
    };

    isValid = () => {
        const {name, email, password, fileSize} = this.state;
        if (fileSize > 100000) {
            this.setState({error: 'File size should be less than 100Kb', loading: false});
            return false
        }
        if (name.length === 0) {
            this.setState({error: 'Name cannot be empty'});
            return false
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({error: 'Invalid email address'});
            return false
        }
        if (password.length >= 1 && password.length <= 5) {
            this.setState({error: 'Password too short'});
            return false
        }
        return true;
    };

    render() {
        const {id, name, email, password, redirectToProfile, error, loading} = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/users/${id}`}/>
        }

        const photoUrl = id ? `${process.env.REACT_APP_BASE_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile;

        return (
            <div className='container'>
                <h4 className='mt-4'>Edit Profile</h4>
                <div className="row justify-content-center">
                    <div className="col-md-7 col-sm-5">
                        <div className="card">
                            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                                {error}
                            </div>
                            {loading ? (
                                <div className='jumbotron text-center'>
                                    <h6>Loading...</h6>
                                </div>) : ('')}

                            <div>
                                <img className="card-img-top" src={photoUrl} alt={name}
                                     onError={i => i.target.src = `${DefaultProfile}`}
                                     style={{width: '100%', height: '15vw', objectFit: 'cover'}}/>
                            </div>

                            <div className="card-body">
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
