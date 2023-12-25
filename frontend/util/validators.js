export function validatePassword(password) {
    //Current policy is just min 8 characters
    return password.length >= 8;
}

export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function validateName(name) {
    return name.length > 0;
}