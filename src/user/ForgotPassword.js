import React, {Component} from "react";
import {forgotPassword} from "../auth";

class ForgotPassword extends Component {
    state = {email: '', message: '', error: ''};

    forgotPassword = e => {
        e.preventDefault();
        this.setState({message: '', error: ''});
        forgotPassword(this.state.email).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({error: data.error});
            } else {
                console.log(data.message);
                this.setState({message: data.message});
            }
        });
    };

    render() {
        const {message, error} = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-md-7">
                        <div className="card mt-5 mb-5">
                            <div className="card-header text-center" style={{color: 'green'}}>
                                <b>ASK FOR PASSWORD RESET IN</b>
                            </div>
                            <div className="card-body">
                                {message && (<span className="alert-warning">{message}</span>)}
                                {error && (<span className="alert-warning">{error}</span>)}
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Your email address"
                                               value={this.state.email} name="email"
                                               onChange={e => this.setState({email: e.target.value, message: '', error: ''})}
                                               autoFocus/>
                                    </div>
                                    <button
                                        onClick={this.forgotPassword}
                                        className="btn btn-sm btn-raised btn-success">Send Password Rest Link
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;
