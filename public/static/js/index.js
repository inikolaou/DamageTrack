let queryString = window.location.search;
if (queryString.includes("reports=all")) {
    try {
        const previous_button = document.getElementById('previous');
        previous_button.href = previous_button.href + "&reports=all";
    }
    catch (err) {

    }
    const pages = document.querySelectorAll('.pages');
    for (let page of pages) {
        page.href = page.href + "&reports=all";
    }
    try {
        const next_button = document.getElementById('next');
        next_button.href = next_button.href + "&reports=all";
    }
    catch (err) {

    }
}

try {
    const all_reports_button = document.getElementById('all-reports');
    const my_reports_button = document.getElementById('my-reports');

    all_reports_button.addEventListener('click', (event) => {
        window.location.href = "/?reports=all";
    });

    my_reports_button.addEventListener('click', (event) => {
        window.location.href = "/";
    });
}
catch (err) {

}