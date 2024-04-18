<?php
class Appointment {
    public $appointmentID;
    public $title;
    public $date;


    function __construct($appointmentID, $title, $date) {
        $this->appointmentID = $appointmentID;
        $this->title = $title;
        $this->date = $date;

    }
}
