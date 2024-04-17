$(document).ready(function () {
    $("#btn_Add").click(function () {
        $.get("../frontend/pages/addAppointment.html", function (data) {
            $("#container").html(data);
        });
    });
});

$(document).ready(function () {
    // Make an AJAX request to fetch appointment data
    $.ajax({
        type: "GET",
        url: "../serviceHandler.php", // Update the URL to point to your PHP file
        cache: false,
        data: { method: "queryAppointment" },
        dataType: "json",
        success: function (response) {
            // Clear the appointmentContainer before adding new data
            $("#appointmentContainer").empty();

            // Iterate through the response array and append appointment data to the container
            response.forEach(function (appointmentArray) {
                var appointment = appointmentArray[0]; // Get the Appointment object from the array

                var appointmentHtml =
                    '<div class="col-sm-2">' + // Add the col class here
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' +
                    appointment.title +
                    "</h5>" +
                    '<h6 class="card-subtitle mb-2 text-muted">' +
                    appointment.date +
                    "</h6>" +
                    '<p class="card-text">Name: ' +
                    appointment.name +
                    "</p>" +
                    '<p class="card-text">ID: ' +
                    appointment.id +
                    "</p>" +
                    '<p class="card-text">Comment: ' +
                    appointment.comment +
                    "</p>" +
                    '<p class="card-text">Start Time: ' +
                    appointment.starttime +
                    "</p>" +
                    '<p class="card-text">End Time: ' +
                    appointment.endtime +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>"; // Close the col div here

                // Append the appointment HTML to the appointmentContainer
                $("#appointmentContainer").append(appointmentHtml);
            });
        },
        error: function (xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        },
    });
});

$(document).ready(function () {
    // Modal anzeigen, wenn auf den Button "New Appointment" geklickt wird
    $("#btn_Add").click(function () {
        $("#addAppointmentModal").modal("show");
    });

    // Formulardaten verarbeiten und an Server senden
    $("#addAppointmentForm").submit(function (event) {
        // Verhindere das Standardverhalten des Formulars (Seite neu laden)
        event.preventDefault();

        // Erfasse die Formulardaten
        var formData = {
            name: $("#name").val(),
            title: $("#title").val(),
            date: $("#date").val(),
            starttime: $("#starttime").val(),
            endtime: $("#endtime").val(),
        };

        // Sende die Formulardaten an den Server
        $.ajax({
            type: "POST",
            url: "../handleAppointment.php", // Passe den Pfad an, wenn nötig
            data: formData,
            dataType: "json",
            success: function (response) {
                // Füge den neuen Termin zur Anzeige hinzu
                var appointmentHtml =
                    '<div class="col-sm-2">' +
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' +
                    formData.title +
                    "</h5>" +
                    '<h6 class="card-subtitle mb-2 text-muted">' +
                    formData.date +
                    "</h6>" +
                    '<p class="card-text">Name: ' +
                    formData.name +
                    "</p>" +
                    '<p class="card-text">ID: ' +
                    response.id +
                    "</p>" +
                    '<p class="card-text">Comment: ' +
                    formData.comment +
                    "</p>" +
                    '<p class="card-text">Start Time: ' +
                    formData.starttime +
                    "</p>" +
                    '<p class="card-text">End Time: ' +
                    formData.endtime +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                $("#appointmentContainer").append(appointmentHtml);

                // Schließe das Modal
                $("#addAppointmentModal").modal("hide");

                // Leere das Formular
                $("#addAppointmentForm")[0].reset();
            },
            error: function (xhr, status, error) {
                console.error("AJAX request failed:", status, error);
                alert("Failed to add appointment. Please try again.");
            },
        });
    });
});
