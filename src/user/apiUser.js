export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
        method: 'GET',
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const remove = (userId, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/delete/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const update = (userId, token, user) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/update/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const updateUser = (user, next) => {
    let newUser = {
        _id: user.user._id,
        email: user.user.email,
        name: user.user.name
    };
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('token')) {
            let auth = JSON.parse(localStorage.getItem('token'));
            auth.user = newUser;
            localStorage.setItem('token', JSON.stringify(auth));
            next()
        }
    }
};

export const follow = (userId, token, followId) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/follow`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, followId})
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const unfollow = (userId, token, unfollowId) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/unfollow`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, unfollowId})
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};
