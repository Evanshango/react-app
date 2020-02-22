import React, {Component} from "react";
import {resetPassword} from "../auth";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {newPassword: '', message: '', error: ''};
    }

    resetPassword = e => {
        e.preventDefault();
        this.setState({message: '', error: ''});

        resetPassword({
            newPassword: this.state.newPassword,
            resetPasswordLink: this.props.match.params.resetPasswordToken
        }).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({error: data.error});
            } else {
                console.log(data.message);
                this.setState({message: data.message, newPassword: ''});
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
                                <b>RESET YOUR PASSWORD</b>
                            </div>
                            <div className="card-body">
                                {message && (<span className="alert-warning">{message}</span>)}
                                {error && (<span className="alert-warning">{error}</span>)}
                                <form>
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Your new password"
                                               value={this.state.newPassword} name="newPassword"
                                               onChange={e => this.setState({
                                                   newPassword: e.target.value, message: '', error: ''
                                               })} autoFocus/>
                                    </div>
                                    <button onClick={this.resetPassword}
                                            className="btn btn-raised btn-success btn-sm">Reset Password
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

export default ResetPassword;
