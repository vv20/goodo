window.onload = () => {
    const backendLogin = "/login";
    const backendSignup = "/signup";
    const signupHash = "#signup";
    const loginHash = "#login";

    const login_button = document.getElementById("login");
    const signup_button = document.getElementById("signup");
    const submit_form = document.getElementById("submit_form");
    const submit_button = document.getElementById("submit_button");


    const updateFields = () => {
        let logInText = "Log In";
        let signUpText = "Sign Up";
        if (window.location.hash === signupHash) {
            signup_button.classList.add("active");
            login_button.classList.remove("active");
            submit_form.attributes.getNamedItem("action").value = backendSignup;
            submit_button.innerText = signUpText;
        }

        if (window.location.hash === loginHash || !window.location.hash){
            login_button.classList.add("active");
            signup_button.classList.remove("active");
            submit_form.attributes.getNamedItem("action").value = backendLogin;
            submit_button.innerText = logInText;
        }
    };

    updateFields();

    window.onhashchange = updateFields;


};
