<?php
include("./models/appointment.php");
include("./models/options.php");
class DataHandler
{
    public function queryAppointments()
    {
        $res =  $this->getAppointments();
        return $res;
    }

    public function queryAllAppointments($id)
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
            array_push($result, array(
                "name" => $val[0]->title,
            ));
        }
        return $result;
    }

    private static function getAppointments()
    {
        $demodata = [
            [new Appointment(1, "Termin 1", "21.10.2025")],
            [new Appointment(2, "Termin 2", "22.10.2025")],
            [new Appointment(3, "Termin 3", "23.10.2025")],
        ];
        return $demodata;
    }

    private static function getOptionData()
    {
        $demodata = [
            [new Options(1, "10:00", "11:00", "testcomment1", "available", "testusername1", 1)],
            [new Options(2, "12:00", "13:00", "testcomment2", "available", "testusername2",1)],
            [new Options(3, "14:00", "15:00", "testcomment3", "available", "testusername3",2)],
        ];
        return $demodata;
    }
}
