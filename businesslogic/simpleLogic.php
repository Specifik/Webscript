<?php
include("db/dataHandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {
            case "queryPersons":
                $res = $this->dh->queryAppointment();
                break;
            case "queryPersonById":
                $res = $this->dh->queryAppointmentById($param);
                break;
            case "queryPersonByName":
                $res = $this->dh->queryAppointmentByName($param);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
