<?php
class Appointment {
    public $appid;
    public $title;
    public $date;


    function __construct($appid, $title, $date) {
        $this->appid = $appid;
        $this->title = $title;
        $this->date = $date;

    }
}