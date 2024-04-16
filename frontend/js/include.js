$(document).ready(function () {
    // Navbar einfügen
    $("#navbar").load("../frontend/inc/navbar.html");

    // Get the value of the "page" parameter from the URL
    const page = new URLSearchParams(window.location.search).get("page");

    // Load specific pages corresponding to the "page" parameter

    var pages = {
        home: "../frontend/pages/home.html",
        addAppointment: "../frontend/pages/addAppointment.html",
    };

    if (page === null) {
        window.location = "index.html?page=home";
    } else {
        var pagePath = pages[page] || "../frontend/pages/404.html";
        $("#content").load(pagePath);
    }
});
