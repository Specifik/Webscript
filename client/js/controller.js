// client/js/controller.js

$(document).ready(function () {
    loaddata(); // Lade die Termine beim Seitenladen
});

function loaddata() {
    $.ajax({
        type: "GET",
        url: "../../server/serviceHandler.php",
        cache: false,
        data: { method: "queryAppointments" },
        dataType: "json",
        success: function (response) {
            displayAppointments(response);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function displayAppointments(appointments) {
    var accordion = $("#accordion");
    accordion.empty();

    appointments.forEach(function (appointment) {
        var card = $("<div>").addClass("accordion-item");
        var header = $("<h2>").addClass("accordion-header").appendTo(card);
        var button = $("<button>")
            .addClass("accordion-button")
            .attr({
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": "#collapse-" + appointment.appointmentID,
                "aria-expanded": "false",
                "aria-controls": "collapse-" + appointment.appointmentID,
            })
            .text(appointment.title + " - Date: " + appointment.date)
            .appendTo(header);

        var collapseDiv = $("<div>")
            .addClass("accordion-collapse collapse")
            .attr({
                id: "collapse-" + appointment.appointmentID,
                "aria-labelledby": "heading-" + appointment.appointmentID,
            })
            .appendTo(card);

        var body = $("<div>").addClass("accordion-body").appendTo(collapseDiv);

        // Hinzufügen eines Klickereignisses für das Aufklappen des Akkordeons
        button.click(function () {
            // Schließen aller anderen geöffneten Akkordeons
            $(".accordion-collapse").collapse("hide");
            loadOptions(appointment.appointmentID, body); // Übergabe des body-Elements
        });

        accordion.append(card);
    });
}

function loadOptions(appointmentId, bodyElement) {
    $.ajax({
        type: "GET",
        url: "../../server/serviceHandler.php",
        cache: false,
        data: { method: "queryOptions", param: appointmentId },
        dataType: "json",
        success: function (response) {
            displayOptions(response, bodyElement); // Übergabe des body-Elements
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function displayOptions(options, bodyElement) {
    bodyElement.empty(); // Leeren des body-Elements, um die vorherigen Optionen zu entfernen

    // Label und Input für den Namen
    var nameLabel = $("<label>").text("Name:");
    var nameInput = $("<input>")
        .attr("type", "text")
        .attr("name", "name")
        .addClass("form-control")
        .appendTo(nameLabel);
    nameLabel.appendTo(bodyElement);

    // Abstand zwischen Name und Kommentar
    $("<br>").appendTo(bodyElement);

    // Label und Input für den Kommentar
    var commentLabel = $("<label>").text("Comment:");
    var commentInput = $("<input>")
        .attr("type", "text")
        .attr("name", "comment")
        .addClass("form-control")
        .appendTo(commentLabel);
    commentLabel.appendTo(bodyElement);

    options.forEach(function (option) {
        var optionDiv = $("<div>").addClass("option");

        // Startzeit und Endzeit in einer Zeile
        var timeDiv = $("<div>").addClass("time-div");
        $("<span>")
            .text("Start Time: " + option.startTime)
            .appendTo(timeDiv);
        $("<span>")
            .text(" | End Time: " + option.endTime)
            .appendTo(timeDiv);
        timeDiv.appendTo(optionDiv);

        // Abstand zwischen Endzeit und Radiobutton
        $("<span>").text(" ").appendTo(optionDiv);

        // Radiobutton
        var radioDiv = $("<div>").addClass("form-check form-check-inline");
        var radioInput = $("<input>")
            .addClass("form-check-input")
            .attr("type", "radio")
            .attr("name", "selectedOption")
            .val(option.optionsID);
        radioInput.appendTo(radioDiv);
        $("<label>").addClass("form-check-label").text("").appendTo(radioDiv); // Leerzeichen als Text hinzufügen
        radioDiv.appendTo(timeDiv);

        optionDiv.appendTo(bodyElement); // Anhängen der Optionen an das body-Element des entsprechenden Akkordeons
    });

    // Submit-Button
    var submitButton = $("<button>")
        .addClass("btn btn-primary mt-3")
        .text("Submit")
        .appendTo(bodyElement);
}
