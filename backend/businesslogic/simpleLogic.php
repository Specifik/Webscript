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
            case "queryAppointment":
                $res = $this->dh->queryAppointment();
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
