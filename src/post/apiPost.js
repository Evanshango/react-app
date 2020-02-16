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