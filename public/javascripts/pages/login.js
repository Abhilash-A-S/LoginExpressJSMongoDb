const loginPage = (function () {
    let $email;
    let $loader;
    let $password;
    let $loginPage;
    let $loginButton;
    let $closeButton;
    let $messageBanner;
    let $registerButton;
    let $notificationSection

    const initialize = () => {
        cacheDom();
        bindEvents();
    };
    const cacheDom = () => {
        $loginPage = document.querySelector('#login-page');
        $email = $loginPage.querySelector('#email');
        $loader = document.querySelector('#loader');
        $password = $loginPage.querySelector('#passWord');
        $loginButton = $loginPage.querySelector('#loginButton');
        $registerButton = $loginPage.querySelector('#registerButton');
        $notificationSection = document.querySelector('#notificationSection');
        $messageBanner = $notificationSection.querySelector('#message');
        $closeButton = $notificationSection.querySelector('#closebtn');
    };
    const bindEvents = () => {
        $email.addEventListener('keyup', emailInputChange);
        $password.addEventListener('keyup', passwordInputChange);
        $loginButton.addEventListener('click', loginButtonClick);

        $registerButton.addEventListener('click', () => {
            window.location.href = '/register';
        });
        $closeButton.addEventListener('click', () => {
            $notificationSection.classList.add('hide');
        });
    };
    const emailInputChange = () => {
        if (validateEmail($email.value)) {
            $email.nextElementSibling.classList.add('hide');
        } else {
            $email.nextElementSibling.classList.remove('hide');
            const errorMsg = $email.value ? 'Enter a valid Email' : 'Enter email Id';
            $email.nextElementSibling.innerHTML = errorMsg;
        }
    }
    const passwordInputChange = () => {
        if ($password.value) {
            $password.nextElementSibling.classList.add('hide');
        } else {
            $password.nextElementSibling.classList.remove('hide');
            $password.nextElementSibling.innerHTML = 'Enter password';
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const loginButtonClick = () => {
        if ($email.value && $password.value) {
            $loader.classList.remove('hide');
            axios.post('/login', {
                email: $email.value,
                password: $password.value
            }).then((result) => {
                $loader.classList.add('hide')
                if (result?.data?.loginFailure) {
                    $notificationSection.classList.remove('hide');
                    $messageBanner.innerHTML = result.data.failureMessage;
                } else {
                    window.location.replace(result.request.responseURL);
                }
            }).catch((err) => {
                console.error(err);
            });
        } else {
            emailInputChange();
            passwordInputChange();
        }
    }
    return {
        initialize: initialize
    }
})();