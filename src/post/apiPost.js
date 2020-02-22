export const createPost = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/posts/new/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: post
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const listPosts = () => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
        method: 'GET',
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const singlePost = (postId) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/post/${postId}`, {
        method: 'GET',
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const postsByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/posts/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content_type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const removePost = (postId, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/post/delete/${postId}`, {
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

export const updatePost = (postId, token, post) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/post/update/${postId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: post
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const likePost = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/post/like`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const unlikePost = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/post/unlike`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const comment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/post/comment`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId, comment})
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const uncomment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/post/uncomment`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId, comment})
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};
