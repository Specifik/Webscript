<?php
include_once("../models/appointment.php");
class DataHandler
{
    public function queryAppointment()
    {
        $res =  $this->getDemoData();
        return $res;
    }
    private static function getDemoData()
    {
        $demodata = [
            [new Appointment(1, "Raphi", "Termin", "01.01.2025", "nigga", "08:00", "17:00")],
            [new Appointment(2, "No", "ABC", "01.01.1000", "kurd", "06:15", "12:00")]
        ];
        return $demodata;
    }

    public function addAppointment($appointment)
        {
            $postdata = file_get_contents("php://input");

            if(isset($postdata) && !empty($postdata)) {
                // Decode the JSON data
                $request = json_decode($postdata);

                // Create a new Appointment object from the request data
                $appointment = new Appointment($request->id, $request->name, $request->type, $request->date, $request->location, $request->startTime, $request->endTime);

                $res = $this->getDemoData();
                array_push($res, $appointment);
                return $res;
        }
    }
    
}
