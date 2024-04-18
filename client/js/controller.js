$(document).ready(function () {
    loaddata(); // Lade die Termine beim Seitenladen
});

function loaddata() {
    $.ajax({
        type: "GET",
        url: "../../server/serviceHandler.php",
        cache: false,
        data: { method: "queryAppointments" }, // Verwende die Methode "queryAppointments" zum Abrufen aller Termine
        dataType: "json",
        success: function (response) {
            displayAppointments(response);
        },
        error: (error) => {
        
            console.log(error);
        }
    });
}

function displayAppointments(appointments) {
    var appointmentList = $("#appointmentList");
    appointmentList.empty();
    appointments.forEach(function (appointment) {
            var listItem = $("<li>").text(
                appointment.title +
                    " - Date: " +
                    appointment.date
            );
            listItem.data("id", appointment.appointmentID); // Speichere die Termin-ID im Data-Attribut des Listenelements
            listItem.click(function () {
                loadOptions($(this).data("id")); // Lade die Optionen beim Klicken auf das Listenelement
            });
            appointmentList.append(listItem);
    });
}

function loadOptions(appointmentId) {
    $.ajax({
        type: "GET",
        url: "../../server/serviceHandler.php",
        cache: false,
        data: { method: "queryAllOptions", param: appointmentId }, // Verwende die Methode "queryAllOptions" zum Abrufen aller Optionen fuer den angeklickten Termin
        dataType: "json",
        success: function (response) {
            displayOptions(response);
        },
        error: () => {
            console.log("Error");
        }
    });
}
function displayOptions(options) {
    var optionsList = $("#optionsList");
    optionsList.empty();
    options.forEach(function (option) {
        var listItem = $("<li>").text(
            "Option ID: " + option.optionsID +
            ", Start Time: " + option.startTime +
            ", End Time: " + option.endTime +
            ", Comment: " + option.comment +
            ", Expired: " + option.expired +
            ", Username: " + option.username +
            ", Appointment ID: " + option.fk_appointmentID
        );
        optionsList.append(listItem);
    });
}