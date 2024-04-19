<?php
class Appointment {
    public $appointmentID;
    public $title;
    public $date;
    public $expiry_date;


    function __construct($appointmentID, $title, $date, $expiry_date) {
        $this->appointmentID = $appointmentID;
        $this->title = $title;
        $this->date = $date;
        $this->expiry_date = $expiry_date;

    }
}
