export const LOGIN = {
    email: {
        required: 'Email is required',
        email: 'Email is invalid'
    },
    password: {
        required: 'Password is required',
        minlength: 'Password must be atleast 5 characters long'
    }
};

export const SIGNUP = {
    name: {
        required: 'Name is required'
    },
    email: {
        required: 'Email is required',
        email: 'Email is invalid'
    },
    password: {
        required: 'Password is required',
        minlength: 'Password must be atleast 5 characters long'
    }
};

export const FORGOT_PASSWORD = {
    email: {
        required: 'Email is required',
        email: 'Email is invalid'
    }
};

export const CREATE_TODO = {
    name: {
        required: 'Name is required'
    }
};
