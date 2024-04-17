$(document).ready(function() {
    $('#btn_Add').click(function() {
        $.get('../frontend/pages/addAppointment.html', function(data) {
            $('#container').html(data);
        });
    });
});

$(document).ready(function () {
    // Make an AJAX request to fetch appointment data
    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",  // Update the URL to point to your PHP file
        cache: false,
        data: { method: "queryAppointment" },
        dataType: "json",
        success: function (response) {
            // Clear the appointmentContainer before adding new data
            $("#appointmentContainer").empty();

            // Iterate through the response array and append appointment data to the container
            response.forEach(function (appointmentArray) {
                var appointment = appointmentArray[0];  // Get the Appointment object from the array

                var appointmentHtml = '<div class="col-sm-2">' +  // Add the col class here
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + appointment.title + '</h5>' +
                    '<h6 class="card-subtitle mb-2 text-muted">' + appointment.date + '</h6>' +
                    '<p class="card-text">Name: ' + appointment.name + '</p>' +
                    '<p class="card-text">ID: ' + appointment.id + '</p>' +
                    '<p class="card-text">Comment: ' + appointment.comment + '</p>' +
                    '<p class="card-text">Start Time: ' + appointment.starttime + '</p>' +
                    '<p class="card-text">End Time: ' + appointment.endtime + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';  // Close the col div here

                // Append the appointment HTML to the appointmentContainer
                $("#appointmentContainer").append(appointmentHtml);
            });
        },
        error: function (xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
});