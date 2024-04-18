<?php
class Options{
    public $optionsID;
    public $startTime;
    public $endTime;
    public $comment;
    public $expired;
    public $username;
    public $fk_appointmentID;

    function __construct($optionsID, $startTime, $endTime, $comment, $expired, $username, $fk_appointmentID)
    {
        $this->optionsID = $optionsID;
        $this->startTime = $startTime;
        $this->endTime = $endTime;
        $this->comment = $comment;
        $this->expired = $expired;
        $this->username = $username;
        $this->fk_appointmentID = $fk_appointmentID;
    }
}