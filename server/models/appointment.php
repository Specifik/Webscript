<?php
class Appointment {
    public $id;
    public $title;
    public $closingTime;
    public $availability;

    function __construct($id, $title, $closingTime, $availability) {
        $this->id = $id;
        $this->title = $title;
        $this->closingTime = $closingTime;
        $this->availability = $availability;
    }
}
?>
