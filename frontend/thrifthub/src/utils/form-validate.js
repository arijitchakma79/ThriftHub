const usernameValidate = {
    required: {
        value: true,
        message: 'Username is required'
    },

    minLength: {
        value: 6,
        message: 'Username must be at least 6 characters'
    },

    pattern :{
        value: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
        message: 'Username must be alphanumeric'
    },
};


const emailValidate = {
    required: {
        value: true,
        message: 'Email is required'
    },
    
    pattern : {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
    },
};

const passwordValidate = {
    required: {
        value: true,
        message: 'Password is required'
    },

    minLength: {
        value: 8,
        message: 'Password must be at least 8 characters'
    },

}

export { usernameValidate, emailValidate, passwordValidate };