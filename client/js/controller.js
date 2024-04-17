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
        url: "../serviceHandler.php",
        cache: false,
        data: { method: "queryAppointment" },
        dataType: "json",
        success: function (response) {
            response.forEach(function (appointmentArray) {
                var appointment = appointmentArray[0];
                var appointmentHtml =
                    '<div class="accordion-item">' +
                    '<h2 class="accordion-header" id="heading' +
                    appointment.id +
                    '">' +
                    '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' +
                    appointment.id +
                    '" aria-expanded="true" aria-controls="collapse' +
                    appointment.id +
                    '">' +
                    appointment.title +
                    " - (" +
                    appointment.date +
                    ") for: " +
                    appointment.name +
                    "</button>" +
                    "</h2>" +
                    '<div id="collapse' +
                    appointment.id +
                    '" class="accordion-collapse collapse" aria-labelledby="heading' +
                    appointment.id +
                    '" data-bs-parent="#appointmentContainer">' +
                    '<div class="accordion-body">' +
                    "<p><strong>Comment:</strong> " +
                    appointment.comment +
                    "</p>" +
                    "<p><strong>Start Time:</strong> " +
                    appointment.starttime +
                    "</p>" +
                    "<p><strong>End Time:</strong> " +
                    appointment.endtime +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
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