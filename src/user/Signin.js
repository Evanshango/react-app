import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {signin, authenticateUser} from "../auth";

class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', error: '', redirectToReferer: false, loading: false}
    }

    handleChange = (inputText) => event => {
        this.setState({error: ''});
        this.setState({[inputText]: event.target.value})
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        const {email, password} = this.state;
        const user = {email, password};
        signin(user).then(data => {
            if (data.error) {
                this.setState({error: data.error, loading: false});
            } else {
                authenticateUser(data, () => {
                    this.setState({redirectToReferer: true})
                });
            }
        });
    };

    signInForm = (email, password) => (
        <form>
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
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit
            </button>
        </form>
    );

    render() {
        const {email, password, error, redirectToReferer, loading} = this.state;

        if (redirectToReferer) {
            return <Redirect to='/'/>
        }

        return (
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-md-7">
                        <div className="card mt-5 mb-5">
                            <div className="card-header text-center" style={{color: 'green'}}>
                                <b>SIGN IN</b>
                            </div>
                            <div className="card-body">
                                <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                                    {error}
                                </div>
                                {loading ? (
                                    <div className='jumbotron text-center'>
                                        <h6>Loading...</h6>
                                    </div>) : ('')}
                                {this.signInForm(email, password)}
                                <p>
                                    <Link to="/forgot-password" className="btn btn-sm btn-danger">
                                        {" "}
                                        Forgot Password
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;

