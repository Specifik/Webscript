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

    var currentDate = new Date(); // Get the current date

    appointments.forEach(function (appointment) {
        var card = $("<div>").addClass("accordion-item");
        var header = $("<h2>").addClass("accordion-header").appendTo(card);
        var button = $("<button>")
        .addClass("accordion-button d-flex justify-content-between")
            .attr({
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": "#collapse-" + appointment.appointmentID,
                "aria-expanded": "false",
                "aria-controls": "collapse-" + appointment.appointmentID,
            })
            .html("<div class='title'><strong>" + appointment.title + "</strong></div><div class='date'>Date: " + appointment.date + "</div><div class='expiry-date'>Expiry Date: " + appointment.expiry_date 
            + "</div><div class='location'>Location: " + appointment.location + "</div>")
            .appendTo(header);
        var collapseDiv = $("<div>")
            .addClass("accordion-collapse collapse")
            .attr({
                id: "collapse-" + appointment.appointmentID,
                "aria-labelledby": "heading-" + appointment.appointmentID,
            })
            .appendTo(card);

        var body = $("<div>").addClass("accordion-body").appendTo(collapseDiv);
        var descriptionP = $("<p>").html("<strong>Description: </strong>" + appointment.description); // Create a <p> element for the description
        body.append(descriptionP); // Add the description to the body

        var optionsDiv = $("<div>").appendTo(body); // Add a new div for the options

        // Parse the expiry_date manually
        var expiryDateParts = appointment.expiry_date.split(".");
        var expiryDate = new Date(expiryDateParts[2], expiryDateParts[1] - 1, expiryDateParts[0]);
        expiryDate.setHours(23, 59, 59, 999); // Set the time to the end of the day

        // Check if the appointment is expired
        var isExpired = expiryDate < currentDate;

        if (isExpired) {
            descriptionP.html("<strong style='color: red;'>This Appointment has expired!</strong>"); // Display "This Appointment has expired!" if the appointment is expired
        } else {
            descriptionP.html("<strong>Description: </strong>" + appointment.description); // Display the description if the appointment is not expired
        }

        // Hinzufügen eines Klickereignisses für das Aufklappen des Akkordeons
        button.click(function () {
            // Schließen aller anderen geöffneten Akkordeons
            $(".accordion-collapse").collapse("hide");
            loadOptions(appointment.appointmentID, optionsDiv, isExpired); // Übergabe des body-Elements
        });

        accordion.append(card);
    });
}

function loadOptions(appointmentId, bodyElement, isExpired) {

    $.ajax({
        type: "GET",
        url: "../../server/serviceHandler.php",
        cache: false,
        data: { method: "queryOptions", param: appointmentId },
        dataType: "json",
        success: function (response) {
            displayOptions(response, bodyElement, isExpired); // Übergabe des body-Elements
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function displayOptions(options, bodyElement, isExpired) {
    bodyElement.empty(); // Leeren des body-Elements, um die vorherigen Optionen zu entfernen

    options.forEach(function (option) {
        var optionDiv = $("<div>").addClass("option");

        // Startzeit und Endzeit
        var timeDiv = $("<div>").addClass("time-div");
        $("<span>")
            .text("Start Time: " + option.startTime)
            .appendTo(timeDiv);
        $("<span>")
            .text(" | End Time: " + option.endTime)
            .appendTo(timeDiv);
        timeDiv.appendTo(optionDiv);

        // Überprüfen, ob die Option bereits ausgewählt wurde
        if (option.username) {
            // Wenn ja, den Namen und den Kommentar anzeigen
            $("<span>")
                .text("Selected by: " + option.username)
                .appendTo(optionDiv);
        if(option.comment) {
            $("<span>")
                .text(" | Comment: " + option.comment)
                .appendTo(optionDiv);
            }
        } else {
            // Wenn nicht, den Radiobutton anzeigen
            var radioDiv = $("<div>").addClass("select-option");
            var radioInput = $("<input>")
                .addClass("form-check-input")
                .attr("type", "radio")
                .attr("name", "selectedOption")
                .val(option.optionsID);
            if (isExpired) {
                radioInput.attr("disabled", "disabled");
            }
            radioInput.appendTo(radioDiv);
            $("<label>")
                .addClass("form-check-label")
                .text("Select")
                .appendTo(radioDiv); // Label für den Radiobutton hinzufügen
            radioDiv.appendTo(optionDiv);
        }

        // Trennzeichen zwischen den Optionen hinzufügen
        $("<hr>").appendTo(optionDiv);

        optionDiv.appendTo(bodyElement); // Anhängen der Optionen an das body-Element des entsprechenden Akkordeons

    });

        // Only display the input for name and comment if the appointment is not expired
    if (!isExpired) {
        $("<label>").text("Name:").appendTo(bodyElement);
        $("<input>")
            .attr("type", "text")
            .attr("name", "name")
            .addClass("form-control")
            .appendTo(bodyElement);
        $("<label>").text("Comment:").appendTo(bodyElement);
        $("<input>")
            .attr("type", "text")
            .attr("name", "comment")
            .addClass("form-control")
            .appendTo(bodyElement);

    // Abstand zwischen Kommentar und Submit-Button
    $("<br>").appendTo(bodyElement);

    // Submit-Button
    var submitButton = $("<button>")
        .addClass("btn btn-primary")
        .text("Submit")
        .appendTo(bodyElement);
    }
}

$(document).ready(function () {
    loaddata();

    $("#addAppointmentButton").click(function () {
        $("#addAppointmentModal").modal("show");

    });

    $("#addAppointmentForm").submit(function (event) {
        event.preventDefault();

        var title = $("#title").val();
        var date = $("#date").val();
        var expiry_date = $("#expiry_date").val();
        var location = $("#location").val();
        var description = $("#description").val();

        // Convert the date and expiry_date to Date objects for comparison
        var dateObj = new Date(date);
        var expiryDateObj = new Date(expiry_date);

        // Check if the expiry date is before the normal date
        if (expiryDateObj >= dateObj) {
            alert("The expiry date must be before the normal date.");
            return; // Exit the function to prevent the form from being submitted
        }

        $.ajax({
            type: "POST",
            url: "../../server/serviceHandler.php",
            data: {
                method: "addAppointment",
                param: JSON.stringify({ title: title, date: date, expiry_date: expiry_date, location: location, description: description }),
            },
            dataType: "json",
            success: function (response) {
                $("#addAppointmentModal").modal("hide");
                loaddata();

                // Reset the title and date inputs
                $("#title").val("");
                $("#date").val("");
                $("#expiry_date").val("");
                $("#location").val("");
                $("#description").val("");

                // Show the addOptionForm in a modal
                $("#addOptionModal").modal("show");
                currentAppointmentID = response.appointmentID;
            },
            error: function (error) {
                console.log("AJAX request failed", error);
            },
        });
    });


    var optionCount = 0; 
    $(document).on('submit', '#addOptionForm', function(event) {
        event.preventDefault();

        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();

        if (!startTime || !endTime) {
            alert("Please fill in both the start time and end time.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "../../server/serviceHandler.php",
            data: {
                method: "addOption",
                param: JSON.stringify({
                    startTime: startTime,
                    endTime: endTime,
                    FK_appointmentID: currentAppointmentID,
                }),
            },
            dataType: "json",
            success: function (response) { 
                // Check if the option was successfully added
            if (response === "Option added successfully") {
                    // Clear input fields for next option
                    $("#startTime").val('');
                    $("#endTime").val('');

                    // Update optionsPreview textarea
                    var optionsPreview = $("#optionsPreview");
                    var currentContent = optionsPreview.val();
                    optionCount += 1;
                    optionsPreview.val(currentContent + "\n" + "Option " + optionCount + ": Start Time: " + startTime + ", End Time: " + endTime);
                } 
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
    

    // Handler for "Done" button to submit all options
    $(document).on('click', '#doneButton', function() {
        // Check if at least one option has been added
        if (optionCount === 0) {
            alert("Please add at least one option before pressing 'Done'.");
        } else {
            $("#optionsPreview").val('');
            optionCount = 0;
            // Hide the addOptionForm modal
            $("#addOptionModal").modal("hide");
            // Hide the Done button
            $("#doneButton").hide();
        }
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
            param: JSON.stringify({
                optionID: optionID,
                username: userName,
                comment: userComment,
            }),
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
