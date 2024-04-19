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

        // Überprüfen, ob die Option bereits ausgewählt wurde
        if (option.username) {
            // Wenn ja, den Namen anzeigen
            $("<span>")
                .text("Selected by: " + option.username)
                .appendTo(optionDiv);
        } else {
            // Wenn nicht, den Radiobutton anzeigen
            var radioDiv = $("<div>").addClass(
                "form-check form-check-inline custom-radio"
            );
            var radioInput = $("<input>")
                .addClass("form-check-input")
                .attr("type", "radio")
                .attr("name", "selectedOption")
                .val(option.optionsID);
            radioInput.appendTo(radioDiv);
            $("<label>")
                .addClass("form-check-label")
                .text("")
                .appendTo(radioDiv); // Leerzeichen als Text hinzufügen
            radioDiv.appendTo(optionDiv);
        }

        optionDiv.appendTo(bodyElement); // Anhängen der Optionen an das body-Element des entsprechenden Akkordeons
    });

    // Submit-Button
    var submitButton = $("<button>")
        .addClass("btn btn-primary mt-3")
        .text("Submit")
        .appendTo(bodyElement);
}

//TODO
$(document).ready(function () {
    $("#addAppointmentButton").click(function () {
        console.log("Add Appointment button clicked");
        $("#addAppointmentForm").show();
    });

    $("#addAppointmentForm").submit(function (event) {
        console.log("Add Appointment form submitted");
        event.preventDefault();

        var title = $("#title").val();
        var date = $("#date").val();

        console.log("Sending AJAX request", title, date);

        $.ajax({
            type: "POST",
            url: "../../server/serviceHandler.php",
            data: { method: "addAppointment", title: title, date: date },
            dataType: "json",
            success: function (response) {
                console.log("AJAX request successful", response);
                $("#addAppointmentForm").hide();
                loaddata();
            },
            error: function (error) {
                console.log("AJAX request failed", error);
            },
        });
    });
});

//TODO
$("#addOptionForm").submit(function (event) {
    event.preventDefault();

    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var comment = $("#comment").val();

    $.ajax({
        type: "POST",
        url: "../../server/serviceHandler.php",
        data: {
            method: "addOption",
            startTime: startTime,
            endTime: endTime,
            comment: comment,
            appointmentID: currentAppointmentID,
        },
        dataType: "json",
        success: function (response) {
            $("#addOptionForm").hide();
            loadOptions(currentAppointmentID);
        },
        error: function (error) {
            console.log(error);
        },
    });
});

$(document).ready(function () {
    loaddata();

    // Klickereignis für den Submit-Button
    $("#accordion").on("click", ".btn-primary", function () {
        var bodyElement = $(this)
            .closest(".accordion-item")
            .find(".accordion-body");
        var selectedOption = bodyElement
            .find("input[name='selectedOption']:checked")
            .val();
        var userName = bodyElement.find("input[name='name']").val();
        var userComment = bodyElement.find("input[name='comment']").val();

        // Wenn keine Option ausgewählt wurde
        if (!selectedOption) {
            alert("Please select an option.");
            return; // Beenden Sie die Funktion, um zu verhindern, dass das Formular abgesendet wird
        }

        // Wenn der Benutzername nicht eingegeben wurde
        if (!userName) {
            alert("Please enter your name.");
            return; // Beenden Sie die Funktion, um zu verhindern, dass das Formular abgesendet wird
        }

        // Daten an den Server senden
        chooseOption(selectedOption, userName, userComment);
    });
});

function chooseOption(optionID, userName, userComment) {
    $.ajax({
        type: "POST",
        url: "../../server/serviceHandler.php",
        data: {
            method: "chooseOption",
            param: {
                optionID: optionID,
                username: userName,
                comment: userComment,
            },
        },
        dataType: "json",
        success: function (response) {
            // Erfolgreiche Antwort verarbeiten
            alert("Appointment successfully choosen!");
            // Seite neu laden
            location.reload();
        },
        error: function (error) {
            console.log(error);
            alert("Failed to choose Option. Please try again.");
        },
    });
}
