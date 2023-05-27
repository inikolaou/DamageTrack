let queryString = window.location.search;
let searchParams = new URLSearchParams(queryString);
console.log("file loaded")
try {
    const previous_button = document.getElementById('previous');
    
    if (queryString.includes("urgency")) {
        previous_button.href = previous_button.href + "&urgency=" + searchParams.get('urgency');
    }
    else if (queryString.includes('status')) {
        previous_button.href = previous_button.href + "&status=" + searchParams.get('status');
    }
}
catch (err) {

}

const pages = document.querySelectorAll('.pages');
for (let page of pages) {
    
    if (queryString.includes("urgency")) {
        page.href = page.href + "&urgency=" + searchParams.get('urgency');
    }
    if (queryString.includes('status')) {
        page.href = page.href + "&status=" + searchParams.get('status');
    }
    if (queryString.includes("text")) {
        page.href = page.href + "&text=" + searchParams.get('text');
    }
}

const dropdownItems = document.querySelectorAll('.dropdown-item');
for (let item of dropdownItems) {
    
    if (queryString.includes("urgency")) {
        if (!item.href.includes("urgency")) {
            item.href = item.href + "&urgency=" + searchParams.get('urgency');
        }
    }
    if (queryString.includes('status')) {
        if (!item.href.includes("status")) {
            item.href = item.href + "&status=" + searchParams.get('status');
        }
    }
    if (queryString.includes("text")) {
        item.href = item.href + "&text=" + searchParams.get('text');
    }
}

try {
    const next_button = document.getElementById('next');
    
    if (queryString.includes("urgency")) {
        next_button.href = next_button.href + "&urgency=" + searchParams.get('urgency');
    }
    else if (queryString.includes('status')) {
        next_button.href = next_button.href + "&status=" + searchParams.get('status');
    }
}
catch (err) {

}

try {
    const searchButton = document.getElementById("search");
    const text = document.getElementById("searchText");
    searchButton.addEventListener('click', (event) => {
        
        if (queryString.includes("urgency")) {
            window.location.href = "/admin?text=" + text.value + "&urgency=" + searchParams.get('urgency');
        }
        else if (queryString.includes('status')) {
            window.location.href = "/admin?text=" + text.value + "&status=" + searchParams.get('status');
        }
        else {
            window.location.href = "/admin?text=" + text.value
        }
    });
}
catch (err) {

}