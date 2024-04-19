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
            case "queryOptions":
                $res = $this->dh->queryOptions($param);
                break;
            case "addAppointment": //TODO
                $title = $param['title'];
                $date = $param['date'];
                $res = $this->dh->addAppointment($title, $date);
                break;
            case "addOption":   //TODO
                $startTime = $param['startTime'];
                $endTime = $param['endTime'];
                $comment = $param['comment'];
                $appointmentID = $param['appointmentID'];
                $res = $this->dh->addOption($startTime, $endTime, $comment, $appointmentID);
                break;
            case "chooseOption":
                $optionID = $param['optionID'];
                $username = $param['username'];
                $comment = $param['comment'];
                $res = $this->dh->chooseOption($optionID, $username, $comment);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
