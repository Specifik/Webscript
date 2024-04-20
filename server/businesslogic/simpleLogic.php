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
        $param = json_decode($param, true);

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
            case "addAppointment":
                $title = $param['title'];
                $date = $param['date'];
                $expiry_date = $param['expiry_date'];
                $res = $this->dh->addAppointment($title, $date, $expiry_date);
                break;
            case "addOption":
                $startTime = $param['startTime'];
                $endTime = $param['endTime'];
                $FK_appointmentID = $param['FK_appointmentID'];
                $res = $this->dh->addOption($startTime, $endTime, $FK_appointmentID);
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
