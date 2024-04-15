<?php
include_once("../models/appointment.php");
include_once("../db/dataHandler.php");

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capture the form data
    $name = $_POST["name"];
    // Capture more form data and perform validation

    // Create a new Appointment object
    $newAppointment = new Appointment(
        null, // ID (can be null if it's auto-generated)
        $_POST["name"], // Name of the appointment from the form
        $_POST["title"], // Title of the appointment from the form
        $_POST["date"], // Date of the appointment from the form
        isset($_POST["comment"]) ? $_POST["comment"] : "", // Comment of the appointment from the form
        isset($_POST["starttime"]) ? $_POST["starttime"] : "", // Start time of the appointment from the form
        isset($_POST["endtime"]) ? $_POST["endtime"] : "" // End time of the appointment from the form
    );

    // Add the new Appointment object to the $demodata array
    $dataHandler = new DataHandler();
    $demodata = $dataHandler->queryAppointment();
    $demodata[] = [$newAppointment];

    // Save the updated $demodata array (optional, depending on your use case)

    // Optional: Redirect or notify about the success of the addition
}
