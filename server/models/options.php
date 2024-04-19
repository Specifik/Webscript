<?php
class Options{
    public $optionsID;
    public $startTime;
    public $endTime;
    public $comment;
    public $taken;
    public $username;
    public $fk_appointmentID;

    function __construct($optionsID, $startTime, $endTime, $comment, $taken, $username, $fk_appointmentID)
    {
        $this->optionsID = $optionsID;
        $this->startTime = $startTime;
        $this->endTime = $endTime;
        $this->comment = $comment;
        $this->taken = $taken;
        $this->username = $username;
        $this->fk_appointmentID = $fk_appointmentID;
    }
}