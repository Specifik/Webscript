<?php
include("../models/appointment.php");
include("../db/dataHandler.php");

// Überprüfe, ob das Formular gesendet wurde
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Erfasse die Formulardaten
    $name = $_POST["name"];
    // Erfasse weitere Formulardaten und führe Validierung durch

    // Erstelle ein neues Terminobjekt
    $newAppointment = new Appointment(
        null, // ID (kannst du null lassen, wenn diese automatisch generiert wird)
        $_POST["name"], // Name des Termins aus dem Formular
        $_POST["title"], // Titel des Termins aus dem Formular
        $_POST["date"], // Datum des Termins aus dem Formular
        $_POST["comment"], // Kommentar des Termins aus dem Formular
        $_POST["starttime"], // Startzeit des Termins aus dem Formular
        $_POST["endtime"] // Endzeit des Termins aus dem Formular
    );

    // Füge das neue Terminobjekt zum $demodata Array hinzu
    $dataHandler = new DataHandler();
    $demodata = $dataHandler->queryAppointment();
    $demodata[] = [$newAppointment];

    // Speichere das aktualisierte $demodata Array (optional, abhängig von deinem Anwendungsfall)

    // Optional: Weiterleitung oder Benachrichtigung über den Erfolg des Hinzufügens
}
