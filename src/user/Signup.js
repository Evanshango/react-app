import React, {Component} from 'react';

class Signup extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            open: false
        }
    }

    handleChange = (inputText) => event => {
        this.setState({error: ''});
        this.setState({[inputText]: event.target.value})
    };

    clickSubmit = event => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name, email, password
        };
        this.signup(user).then(data => {
            if (data.error) this.setState({error: data.error});
            else this.setState({
                error: '',
                name: '',
                email: '',
                password: '',
                open: true
            })
        })
    };

    signup = (user) => {
        return fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json()
        }).catch(err => console.log(err))
    };

    render() {
        const {name, email, password, error, open} = this.state;
        return (
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-md-7">
                        <div className="card mt-5 mb-5">
                            <div className="card-header text-center" style={{color: 'green'}}>
                                <b>SIGN UP</b>
                            </div>
                            <div className="card-body">
                                <div className="alert alert-primary" style={{display: error ? '' : 'none'}}>
                                    {error}
                                </div>
                                <div className="alert alert-info" style={{display: open ? '' : 'none'}}>
                                    New Account created successfully. Please sign in.
                                </div>
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
                                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit
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

export default Signup;
