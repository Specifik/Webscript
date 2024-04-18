<?php
class Options{
    public $oppid;
    public $starttime;
    public $endtime;
    public $comment;
    public $expired;
    public $username;
    public $fk_appid;

    function __construct($oppid, $startTime, $endTime, $comment, $expired, $username, $fk_appid)
    {
        $this->oppid = $oppid;
        $this->starttime = $startTime;
        $this->endtime = $endTime;
        $this->comment = $comment;
        $this->expired = $expired;
        $this->username = $username;
        $this->fk_appid = $fk_appid;
    }
}