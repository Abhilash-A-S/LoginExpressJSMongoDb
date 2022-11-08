const registerPage = (function () {
    let $email;
    let $address;
    let $lastName;
    let $password;
    let $firstName;
    let $phoneNumber;
    let $registerPage;
    let $registerButton;
    let $confirmPassword;

    const initialize = () => {
        cacheDom();
        bindEvents();
    }
    const cacheDom = () => {
        $registerPage = document.querySelector('#register-page');
        $email = $registerPage.querySelector('#email');
        $address = $registerPage.querySelector('#address');
        $lastName = $registerPage.querySelector('#lastName');
        $password = $registerPage.querySelector('#password');
        $firstName = $registerPage.querySelector('#firstName');
        $phoneNumber = $registerPage.querySelector('#phoneNumber');
        $registerButton = $registerPage.querySelector('#registerButton');
        $confirmPassword = $registerPage.querySelector('#confirmPassword');
    }
    const bindEvents = () => {
        $email.addEventListener('keyup', emailInputChange);
        $address.addEventListener('keyup', inputValueChanges.bind(this, 'Address'));
        $lastName.addEventListener('keyup', inputValueChanges.bind(this, 'Last Name'));
        $password.addEventListener('keyup', inputValueChanges.bind(this, 'Password'));
        $firstName.addEventListener('keyup', inputValueChanges.bind(this, 'First Name'));
        $phoneNumber.addEventListener('keyup', inputValueChanges.bind(this, 'Phone Number'));
        $confirmPassword.addEventListener('keyup', inputValueChanges.bind(this, 'Confirm Password'));
        $registerButton.addEventListener('click', submitRegistration);
    }
    const inputValueChanges = (fieldName) => {
        switch (fieldName) {
            case 'First Name':
                $firstName.nextElementSibling.classList.add('hide');
                if (!$firstName.value) {
                    $firstName.nextElementSibling.innerHTML = 'Please enter First name';
                    $firstName.nextElementSibling.classList.remove('hide');
                }
                break;
            case 'Last Name':
                $lastName.nextElementSibling.classList.add('hide');
                if (!$lastName.value) {
                    $lastName.nextElementSibling.innerHTML = 'Please enter Last name';
                    $lastName.nextElementSibling.classList.remove('hide');
                }
                break;
            case 'Phone Number':
                $phoneNumber.nextElementSibling.classList.add('hide');
                if (!$phoneNumber.value) {
                    $phoneNumber.nextElementSibling.innerHTML = 'Please enter Phone number';
                    $phoneNumber.nextElementSibling.classList.remove('hide');
                }
                break;
            case 'Address':
                $address.nextElementSibling.classList.add('hide');
                if (!$address.value) {
                    $address.nextElementSibling.innerHTML = 'Please enter Address';
                    $address.nextElementSibling.classList.remove('hide');
                }
                break;
            case 'Password':
                const passwordErrorText = validatePassword($password.value);
                $password.nextElementSibling.classList.add('hide');
                if (passwordErrorText) {
                    $password.nextElementSibling.innerHTML = passwordErrorText;
                    $password.nextElementSibling.classList.remove('hide');
                }
                break;
            case 'Confirm Password':
                if ($confirmPassword.value !== $password.value) {
                    $confirmPassword.nextElementSibling.classList.remove('hide');
                    $confirmPassword.nextElementSibling.innerHTML = `Passwords do not match`;
                } else {
                    $confirmPassword.nextElementSibling.classList.add('hide');
                }
                break;
        }
    }
    const emailInputChange = () => {
        if (validateEmail($email.value)) {
            $email.nextElementSibling.classList.add('hide');
        } else {
            $email.nextElementSibling.classList.remove('hide');
            const errorMsg = $email.value ? 'Enter a valid Email' : 'Enter email Id';
            $email.nextElementSibling.innerHTML = errorMsg;
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validatePassword = (password = '') => {
        if (password.length < 8) {
            return 'Your password must be at least 8 characters.';
        }
        if (password.search(/[a-z]/i) < 0) {
            return 'Your password must contain at least one letter.';
        }
        if (password.search(/[0-9]/) < 0) {
            return 'Your password must contain at least one digit.';
        }
    }
    const submitRegistration = () => {
        validateInput().then(async (valid) => {
            if (valid) {
                const isExistEmail = await checkEmailExistance();
                if (!isExistEmail) {
                    axios.post('/insertUser', {
                        email: $email.value,
                        password: $password.value,
                        lastName: $lastName.value,
                        firstName: $firstName.value,
                        address: $phoneNumber.value,
                        phoneNumber: $phoneNumber.value,
                    }).then((result) => {
                        if (result.data) {
                            window.location.replace(`${window.location.origin}/login`);
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                } else {
                    $email.nextElementSibling.classList.remove('hide');
                    $email.nextElementSibling.innerHTML = isExistUser.message;
                }
            }
        });
    }
    const validateInput = () => {
        return new Promise((resolve) => {
            const inputs = document.querySelectorAll('input');
            const textArea = document.querySelector('textarea');
            const inputList = [...inputs, ...[textArea]];
            let isValid = true;
            inputList.forEach((input) => {
                if (isValid && !input.value) {
                    input.value = false;
                }
                if (input.name === 'Email') {
                    emailInputChange();
                } else {
                    inputValueChanges(input.name);
                }
            });
            resolve(isValid);
        });
    }
    const checkEmailExistance = () => {
        return new Promise((resolve) => {
            axios.get(`/getObject?email=${$email.value}`).then((result) => {
                if (result.data.length) {
                    resolve({ message: 'This email is alreday used.' });
                } else {
                    resolve(false);
                }
            }).catch((err) => {
                console.error(err);
            })
        });
    }
    return {
        initialize: initialize
    }
})();
