let detailsSection = document.querySelector("#details-section");
let locationSection = document.querySelector("#location-section");
let nextBtn = document.querySelector("#next-btn");
let submitBtn = document.querySelector("#submit-btn");
let backBtn = document.querySelector("#back-btn");
let locationLabel = document.querySelector("#location");

nextBtn.addEventListener("click", () => {

    let formFalse = false;
    const form = document.querySelector('.needs-validation');
    const formItems = document.querySelectorAll("#details-section" + " input")

    for (item of formItems) {
        if (!item.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            formFalse = true;
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


    // if (category.value && description.value && photo.value) {
    //     detailsSection.classList.add("d-none");
    //     locationSection.classList.remove("d-none");
    //     locationLabel.style.backgroundColor = "#33cccc";
    // }
    // else {
    //  alert("Please fill in all required fields");
    // }
});

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
    } else {
        othercategorySelect.classList.add("d-none");
    }
});