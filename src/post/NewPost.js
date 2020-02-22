import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {createPost} from "./apiPost";
import {Redirect} from "react-router-dom";

class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', body: '', photo: '', error: '', fileSize: 0, user: {},
            loading: false, redirectToProfile: false}
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({user: isAuthenticated().user})
    }

    createPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Image</label>
                <input onChange={this.handleChange('photo')} type="file" accept='image/*'
                       className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={this.handleChange('title')} type="text"
                       className="form-control"
                       value={title}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea onChange={this.handleChange('body')}
                       className="form-control"
                       value={body}/>
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Create Post
            </button>
        </form>
    );

    handleChange = inputText => event => {
        this.setState({error: ''});
        let value = inputText === 'photo' ? event.target.files[0] : event.target.value;
        if (value != null) {
            const fileSize = inputText === 'photo' ? event.target.files[0].size : 0;
            this.postData.set(inputText, value);
            this.setState({[inputText]: value, fileSize})
        } else {
            this.setState({error: 'No file selected'})
        }
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            createPost(userId, token, this.postData).then(data => {
                if (data.error) this.setState({error: data.error});
                else {
                    this.setState({loading: false, title: '', body: '', photo: '', redirectToProfile: true});
                }
            })
        }
    };

    isValid = () => {
        const {title, body, fileSize} = this.state;
        if (title.length === 0 || body.length === 0) {
            this.setState({error: 'All fields are required'});
            return false
        }
        if (fileSize > 200000) {
            this.setState({error: 'File size should be less than 200Kb', loading: false});
            return false
        }
        return true;
    };

    render() {
        const {title, body, user, error, loading, redirectToProfile} = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/users/${user._id}`}/>
        }
        return (
            <div className='container'>
                <h4 className='mt-4'>Create Post</h4>
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
                            <div className="card-body">
                                {this.createPostForm(title, body)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewPost;
