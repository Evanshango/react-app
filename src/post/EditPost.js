import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {singlePost, updatePost} from "./apiPost";
import {Redirect} from "react-router-dom";
import DefaultPost from "../images/default.jpg";

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '', title: '', body: '', redirectToProfile: false, error: '', fileSize: 0, loading: false
        }
    }

    init = postId => {
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({redirectToProfile: true})
            } else {
                this.setState({id: data._id, title: data.title, body: data.body, error: ''})
            }
        });
    };

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    }

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
            const postId = this.state.id;
            const token = isAuthenticated().token;
            updatePost(postId, token, this.postData).then(data => {
                if (data.error) this.setState({error: data.error});
                else {
                    this.setState({loading: false, title: '', body: '', photo: '', redirectToProfile: true});
                }
            })
        }
    };

    editPostForm = (title, body) => (
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
                <textarea onChange={this.handleChange('body')} className="form-control" value={body}/>
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update Post
            </button>
        </form>
    );

    render() {
        const {title, body, redirectToProfile, id, error, loading} = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/users/${isAuthenticated().user._id}`}/>
        }
        const photoUrl = id ? `${process.env.REACT_APP_BASE_URL}/post/photo/${id}?${new Date().getTime()}` : DefaultPost;
        return (
            <div className='container'>
                <h4 className='mt-4'>{title}</h4>
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
                            <img className="card-img-top" src={photoUrl} alt={title}
                                 onError={i => i.target.src = `${DefaultPost}`}
                                 style={{width: '100%', height: '15vw', objectFit: 'cover'}}/>
                            <div className="card-body">
                                {this.editPostForm(title, body)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditPost;
