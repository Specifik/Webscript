<?php
include("./models/appointment.php");
include("./models/options.php");
class DataHandler
{
    public function queryAppointments()
    {
        $res =  $this->getDemoData();
        return $res;
    }

    public function queryAllAppointments($id)
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
            array_push($result, array(
                "name" => $val[0]->title,
                "closingTime" => $val[0]->closingTime,
                "expired" => $val[0]->availability
            ));
        }
        return $result;
    }

    private static function getDemoData()
    {
        $demodata = [
            [new Appointment(1, "Termin 1", "21.10.2025", "available")],
            [new Appointment(2, "Termin 2", "22.10.2025", "available")],
            [new Appointment(3, "Termin 3", "23.10.2025", "available")],
        ];
        return $demodata;
    }

    private static function getOptionData()
    {
        $demodata = [
            [new Options(1, "21.10.2025", "10:00", "11:00", 1)],
            [new Options(2, "21.10.2025", "12:00", "13:00", 1)],
            [new Options(3, "22.10.2025", "14:00", "15:00", 2)],
        ];
        return $demodata;
    }
}
