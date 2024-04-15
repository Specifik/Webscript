document.getElementById('addAppointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var title = document.getElementById('title').value;
    var date = document.getElementById('date').value;
    var startTime = document.getElementById('time').value;
    var endTime = document.getElementById('duration').value;

    var appointment = {
        name: name,
        type: title,
        date: date,
        startTime: startTime,
        endTime: endTime
    };

    addAppointment(appointment);
});

function addAppointment(appointment) {
    fetch('../db/dataHandler.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}