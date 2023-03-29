let group = 1;
const emailField = document.getElementById("loginEmail");
const passwordField = document.getElementById("loginPassword");
const passwordIcon = document.getElementById("eye");
const signUpEmailField = document.getElementById("signUpEmail");
const signUpPasswordField = document.getElementById("signUpPassword");
const signUpPasswordIcon = document.getElementById("signUpEye");
const signUpFirstName = document.getElementById("signUpFirstName");
const signUpLastName = document.getElementById("signUpLastName");
const signUpPhone = document.getElementById("signUpPhone");
const signUpCity = document.getElementById("signUpCity");
const signUpLink = document.getElementById("signUpLink");
const loginLink = document.getElementById("loginLink");
const loginButton = document.getElementById("loginButton");
const signUpNext = document.getElementById("signUpNext");
const signUpBack = document.getElementById("signUpBack");

signUpNext.addEventListener("click", function (event) {
    let formFalse = false;
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
    const formItems = document.querySelectorAll('#group' + group + ' input');
    for (item of formItems) {
        if (!item.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            formFalse = true;
        }
    }

    if (!formFalse) {
        forms[1].classList.remove('was-validated');
        signUpNext.disabled = false;
        if (group < 3) {
            group++;
            let idGroup = 'group' + group;
            let idPrevGroup = 'group' + (group - 1);
            let groupDiv = document.getElementById(idGroup);
            let prevGroupDiv = document.getElementById(idPrevGroup);
            groupDiv.style.display = '';
            prevGroupDiv.style.display = 'none';

            let currentCircle = document.getElementById(group);
            let prevCircle = document.getElementById(group - 1);
            prevCircle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
          </svg>`;
            parentElement = currentCircle.parentElement;

            signUpBack.disabled = false;

            currentCircle.style.backgroundColor = '#385170';
            prevCircle.style.backgroundColor = 'green';

            if (group === 3) {
                signUpNext.innerHTML = 'SIGNUP';
            }

        }

        else if (group === 3) {
            signUpNext.type = "submit";
            forms[1].submit();
        }
    }
    else {
        let currentCircle = document.getElementById(group);
        currentCircle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>`;
        currentCircle.style.backgroundColor = 'red';
        forms[1].classList.add('was-validated');
    }

});

signUpBack.addEventListener("click", function (event) {

    if (group > 1) {
        group--;
        let idGroup = 'group' + group;
        let idPrevGroup = 'group' + (group + 1);
        let groupDiv = document.getElementById(idGroup);
        let prevGroupDiv = document.getElementById(idPrevGroup);
        groupDiv.style.display = '';
        prevGroupDiv.style.display = 'none';

        let currentCircle = document.getElementById(group);
        let prevCircle = document.getElementById(group + 1);
        parentElement = currentCircle.parentElement;

        signUpNext.innerHTML = 'Next';

        currentCircle.style.backgroundColor = '#007bff';
        prevCircle.style.backgroundColor = 'gray';
    }

    if (group === 1) {
        signUpBack.disabled = true;
    }

});

loginButton.addEventListener("click", function (event) {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
    if (!forms[0].checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        forms[0].classList.add('was-validated');
    }
    else {
        forms[0].submit();
    }
})

emailField.addEventListener("focus", function (event) {
    let emoji = emailField.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16"><path d = "M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/></svg>'
});

emailField.addEventListener("blur", function (event) {
    let emoji = emailField.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" /></svg>'
});

passwordField.addEventListener("focus", function (event) {
    let emoji = passwordField.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>'
});

passwordField.addEventListener("blur", function (event) {
    let emoji = passwordField.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"> <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /> </svg>'
});

signUpEmailField.addEventListener("focus", function (event) {
    let emoji = signUpEmailField.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16"><path d = "M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/></svg>'
});

signUpEmailField.addEventListener("blur", function (event) {
    let emoji = signUpEmailField.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" /></svg>'
});

signUpPasswordField.addEventListener("focus", function (event) {
    let emoji = signUpPasswordField.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>'
});

signUpPasswordField.addEventListener("blur", function (event) {
    let emoji = signUpPasswordField.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"> <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /> </svg>'
});

signUpFirstName.addEventListener("focus", function (event) {
    let emoji = signUpFirstName.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/> </svg>'
});

signUpFirstName.addEventListener("blur", function (event) {
    let emoji = signUpFirstName.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"> <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/> </svg>'
});

signUpLastName.addEventListener("focus", function (event) {
    let emoji = signUpLastName.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/> </svg>'
});

signUpLastName.addEventListener("blur", function (event) {
    let emoji = signUpLastName.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"> <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/> </svg>'
});

signUpPhone.addEventListener("focus", function (event) {
    let emoji = signUpPhone.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/> </svg>'
});

signUpPhone.addEventListener("blur", function (event) {
    let emoji = signUpPhone.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16"> <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/> </svg>'
});

signUpCity.addEventListener("focus", function (event) {
    let emoji = signUpCity.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16"> <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/> <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/> </svg>'
});

signUpCity.addEventListener("blur", function (event) {
    let emoji = signUpCity.parentElement.parentElement.firstElementChild;
    emoji.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"> <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/> </svg>'
});

signUpLink.addEventListener("click", function (event) {
    let signUpForm = document.getElementById("signUp");
    let loginForm = document.getElementById("login");
    loginForm.style.display = "none";
    signUpForm.style.display = "block";
});

loginLink.addEventListener("click", function (event) {
    let signUpForm = document.getElementById("signUp");
    let loginForm = document.getElementById("login");
    loginForm.style.display = "block";
    signUpForm.style.display = "none";
});

passwordIcon.addEventListener("click", function () {
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                        </svg>`;
    }
    else if (passwordField.type === 'text') {
        passwordField.type = 'password';
        passwordIcon.innerHTML = `<img src="eye-slash.svg">`;
    }
});

signUpPasswordIcon.addEventListener("click", function () {
    if (signUpPasswordField.type === 'password') {
        signUpPasswordField.type = 'text';
        signUpPasswordIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                        </svg>`;
    }
    else if (signUpPasswordField.type === 'text') {
        signUpPasswordField.type = 'password';
        signUpPasswordIcon.innerHTML = `<img src="eye-slash.svg">`;
    }
});