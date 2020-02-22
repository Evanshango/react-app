export const signup = (user) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
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

export const signin = (user) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/signin`, {
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

export const authenticateUser = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("token", JSON.stringify(data));
        next()
    }
};

export const signout = (next) => {
    if (typeof window != 'undefined') localStorage.removeItem('token');
    next();
    return fetch(`${process.env.REACT_APP_BASE_URL}/signout`, {
        method: 'GET'
    }).then(response => {
        console.log('signout', response);
        return response.json()
    }).catch(err => console.log(err));
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('token')) {
        return JSON.parse(localStorage.getItem('token'))
    } else {
        return false;
    }
};

export const forgotPassword = email => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/forgot-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({email})
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/reset-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetInfo)
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};
