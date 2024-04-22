$(document).ready(function () {
    loaddata();
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

    var currentDate = new Date();

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
            .html(
                "<div class='title'><strong>" +
                    appointment.title +
                    "</strong></div><div class='date'>Date: " +
                    appointment.date +
                    "</div><div class='expiry-date'>Expiry Date: " +
                    appointment.expiry_date +
                    "</div><div class='location'>Location: " +
                    appointment.location +
                    "</div>"
            )
            .appendTo(header);
        var collapseDiv = $("<div>")
            .addClass("accordion-collapse collapse")
            .attr({
                id: "collapse-" + appointment.appointmentID,
                "aria-labelledby": "heading-" + appointment.appointmentID,
            })
            .appendTo(card);

        var body = $("<div>").addClass("accordion-body").appendTo(collapseDiv);
        var descriptionP = $("<p>").html(
            "<strong>Description: </strong>" + appointment.description
        );
        body.append(descriptionP);

        var optionsDiv = $("<div>").appendTo(body);

        var expiryDateParts = appointment.expiry_date.split(".");
        var expiryDate = new Date(
            expiryDateParts[2],
            expiryDateParts[1] - 1,
            expiryDateParts[0]
        );
        expiryDate.setHours(23, 59, 59, 999);

        var isExpired = expiryDate < currentDate;

        if (isExpired) {
            descriptionP.html(
                "<strong style='color: red;'>This Appointment has expired!</strong>"
            );
        } else {
            descriptionP.html(
                "<strong>Description: </strong>" + appointment.description
            );
        }
        button.click(function () {
            $(".accordion-collapse").collapse("hide");
            loadOptions(appointment.appointmentID, optionsDiv, isExpired);
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
            displayOptions(response, bodyElement, isExpired);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function displayOptions(options, bodyElement, isExpired) {
    bodyElement.empty();

    options.forEach(function (option) {
        var optionDiv = $("<div>").addClass("option");
        var timeDiv = $("<div>").addClass("time-div");
        $("<span>")
            .text("Start Time: " + option.startTime)
            .appendTo(timeDiv);
        $("<span>")
            .text(" | End Time: " + option.endTime)
            .appendTo(timeDiv);
        timeDiv.appendTo(optionDiv);

        if (option.username) {
            $("<span>")
                .text("Selected by: " + option.username)
                .appendTo(optionDiv);
            if (option.comment) {
                $("<span>")
                    .text(" | Comment: " + option.comment)
                    .appendTo(optionDiv);
            }
        } else {
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
                .appendTo(radioDiv);
            radioDiv.appendTo(optionDiv);
        }
        $("<hr>").appendTo(optionDiv);
        optionDiv.appendTo(bodyElement);
    });

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
        $("<br>").appendTo(bodyElement);

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

        var dateObj = new Date(date);
        var expiryDateObj = new Date(expiry_date);

        if (expiryDateObj >= dateObj) {
            alert("The expiry date must be before the normal date.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "../../server/serviceHandler.php",
            cache: false,
            data: {
                method: "addAppointment",
                param: JSON.stringify({
                    title: title,
                    date: date,
                    expiry_date: expiry_date,
                    location: location,
                    description: description,
                }),
            },
            dataType: "json",
            success: function (response) {
                $("#addAppointmentModal").modal("hide");
                loaddata();
                $("#title").val("");
                $("#date").val("");
                $("#expiry_date").val("");
                $("#location").val("");
                $("#description").val("");
                $("#addOptionModal").modal("show");
                currentAppointmentID = response.appointmentID;
            },
            error: function (error) {
                console.log("AJAX request failed", error);
            },
        });
    });

    var optionCount = 0;
    $(document).on("submit", "#addOptionForm", function (event) {
        event.preventDefault(); // verhindert das Reload der Seite durch den Form

        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();

        if (!startTime || !endTime) {
            alert("Please fill in both the start time and end time.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "../../server/serviceHandler.php",
            cache: false,
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
                if (response === "Option added successfully") {
                    $("#startTime").val("");
                    $("#endTime").val("");
                    var optionsPreview = $("#optionsPreview");
                    var currentContent = optionsPreview.val();
                    optionCount += 1;
                    optionsPreview.val(
                        currentContent +
                            "\n" +
                            "Option " +
                            optionCount +
                            ": Start Time: " +
                            startTime +
                            ", End Time: " +
                            endTime
                    );
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
    $(document).on("click", "#doneButton", function () {
        if (optionCount === 0) {
            alert("Please add at least one option before pressing 'Done'.");
        } else {
            $("#optionsPreview").val("");
            optionCount = 0;
            $("#addOptionModal").modal("hide");
            $("#doneButton").hide();
        }
    });
});

// Button Verhalten bei Option Auswahl
$(document).ready(function () {
    loaddata();
    $("#accordion").on("click", ".btn-primary", function () {
        var bodyElement = $(this)
            .closest(".accordion-item")
            .find(".accordion-body");
        var selectedOption = bodyElement
            .find("input[name='selectedOption']:checked")
            .val();
        var userName = bodyElement.find("input[name='name']").val();
        var userComment = bodyElement.find("input[name='comment']").val();

        if (!selectedOption) {
            alert("Please select an option.");
            return;
        }

        if (!userName) {
            alert("Please enter your name.");
            return;
        }
        chooseOption(selectedOption, userName, userComment);
    });
});

function chooseOption(optionID, userName, userComment) {
    $.ajax({
        type: "POST",
        url: "../../server/serviceHandler.php",
        cache: false,
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
            alert("Appointment successfully choosen!");
            location.reload();
        },
        error: function (error) {
            console.log(error);
            alert("Failed to choose Option. Please try again.");
        },
    });
}
