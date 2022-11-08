const homePage = (function () {
    let $logoutButton;

    const initialize = () => {
        cacheDom();
        bindEvents();
    };
    const cacheDom = () => {
        $logoutButton = document.querySelector('#logOutButton');
    };
    const bindEvents = () => {
        $logoutButton.addEventListener('click', logOutHomePage);
    };
    const logOutHomePage = () => {
        axios.get('/logout').then((result) => {
            window.location.replace(result.request.responseURL);
        }).catch((err) => {
            console.error(err);
        });
    }
    return {
        initialize: initialize
    }
})();