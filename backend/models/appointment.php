<?php

class Appointment {
    public $id;
    public $name;
    public $title;
    public $date;
    public $comment;
    public $starttime;
    public $endtime;

    function __construct($id, $nm, $ttl, $dt, $cm, $stm, $etm) {
        $this->id = $id;
        $this->name = $nm;
        $this->title = $ttl;
        $this->date = $dt;
        $this->comment = $cm;
        $this->starttime = $stm;
        $this->endtime = $etm;
      }
}
