<?php
class Appointment {
    public $appointmentID;
    public $title;
    public $date;
    public $expiry_date;
    public $location;
    public $description;


    function __construct($appointmentID, $title, $date, $expiry_date, $location, $description) {
        $this->appointmentID = $appointmentID;
        $this->title = $title;
        $this->date = $date;
        $this->expiry_date = $expiry_date;
        $this->location = $location;
        $this->description = $description;
    }
}
