<?php
class Options{
    public $id;
    public $date;
    public $starttime;
    public $endtime;
    public $key;

    function __construct($id, $date, $starttime, $endtime, $key)
    {
        $this->id = $id;
        $this->date = $date;
        $this->starttime = $starttime;
        $this->endtime = $endtime;
        $this->key = $key;
    }
}