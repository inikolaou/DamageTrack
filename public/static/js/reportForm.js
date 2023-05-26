let detailsSection = document.querySelector("#details-section");
let locationSection = document.querySelector("#location-section");
let nextBtn = document.querySelector("#next-btn");
let submitBtn = document.querySelector("#submit-btn");
let backBtn = document.querySelector("#back-btn");
let locationLabel = document.querySelector("#location");

nextBtn.addEventListener("click", () => {
    let formFalse = false;
    const form = document.querySelector('.needs-validation');
    const formItems = document.querySelectorAll("#details-section input, #details-section textarea, #details-section input[type=file]");

    for (item of formItems) {
        if (item.type === 'file') {
            if (!isValidImageURL(item.value)) {
                event.preventDefault();
                event.stopPropagation();
                formFalse = true;
                item.classList.add('is-invalid');
            }
            else {
                item.classList.remove('is-invalid');
            }
        }
        else if (item.id === 'other-category') {
            if (categorySelect.value === 'other' && !item.value) {
                event.preventDefault();
                event.stopPropagation();
                formFalse = true;
                item.classList.add('is-invalid');
            }
            else {
                item.classList.remove('is-invalid');
            }
        }
        else {
            if (!item.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                formFalse = true;
                item.classList.add('is-invalid');
            }
            else {
                item.classList.remove('is-invalid');
            }
        }
    }

    if (!formFalse) {
        detailsSection.classList.add("d-none");
        locationSection.classList.remove("d-none");
        locationLabel.style.backgroundColor = "#385170";
        form.classList.remove('was-validated');
    }
    else {
        form.classList.add('was-validated');
    }
});


function isValidImageURL(url) {
    const pattern = /\.(jpeg|jpg|gif|png)$/;
    return pattern.test(url);
}


submitBtn.addEventListener("click", () => {

    let formFalse = false;
    const form = document.querySelector('.needs-validation');
    const formItems = document.querySelectorAll("#location-section" + " input")

    for (item of formItems) {
        if (!item.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            formFalse = true;
        }
    }

    if (!formFalse) {
        detailsSection.classList.remove("d-none");
        locationSection.classList.add("d-none");
        form.classList.remove('was-validated');
    }
    else {
        form.classList.add('was-validated');
    }
});

backBtn.addEventListener("click", () => {
    detailsSection.classList.remove("d-none");
    locationSection.classList.add("d-none");
    locationLabel.style.backgroundColor = "lightgray";
});


let categorySelect = document.querySelector("#category");
let othercategorySelect = document.querySelector("#other-category")

categorySelect.addEventListener("change", () => {
    if (categorySelect.value === "other") {
        othercategorySelect.classList.remove("d-none");
        othercategorySelect.setAttribute("required", "required");
    } else {
        othercategorySelect.classList.add("d-none");
        othercategorySelect.removeAttribute("required");
    }
});