const valid = (name, email, password, cf_password) => {
    if(!name || !email || !password)
    return 'Please complete all fields.'

    if(!validateEmail(email))
    return 'This email is not valid.'

    if(password.length < 6)
    return 'The password must include at least six characters.'

    if(password !== cf_password)
    return 'The confirmed password did not match.'
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid