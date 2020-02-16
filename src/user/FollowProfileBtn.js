import React, {Component} from 'react';
import {follow, unfollow} from "./apiUser";

class FollowProfileBtn extends Component {

    followClick = () => {
        this.props.onButtonClick(follow)
    };

    unfollowClick = () => {
        this.props.onButtonClick(unfollow)
    };

    render() {
        return (
            <div className='d-inline-block text-center mb-4'>
                {!this.props.following ? (
                    <button onClick={this.followClick} className="btn btn-success btn-sm btn-raised mr-5"
                            style={{minWidth: '100px'}}>Follow
                    </button>
                ) : (
                    <button onClick={this.unfollowClick} className="btn btn-warning btn-sm btn-raised"
                            style={{minWidth: '100px'}}>UnFollow</button>)
                }
            </div>
        );
    }
}

export default FollowProfileBtn;
