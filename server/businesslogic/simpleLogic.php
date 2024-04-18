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
            case "queryAppointments":
                $res = $this->dh->queryAppointments();
                break;
            case "queryAllAppointments":
                $res = $this->dh->queryAllAppointments($param);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
