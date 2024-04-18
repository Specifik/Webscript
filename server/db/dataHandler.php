<?php
include 'db.php';
include("./models/appointment.php");
include("./models/options.php");

class DataHandler
{
    public function queryAppointments()
    {
        return $this->getAppointments();
    }

    public function queryAllAppointments($id)
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
            array_push($result, array(
                "name" => $val->title,
            ));
        }
        return $result;
    }

    private function getAppointments()
    {
        global $conn;

        $sql = "SELECT * FROM appointments";
        $result = $conn->query($sql);
        $demodata = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $date = new DateTime($row["date"]);
                $formattedDate = $date->format('d.m.Y');
                $demodata[] = new Appointment($row["appointmentID"], $row["title"], $formattedDate);
            }
        }   

        return $demodata;
    }

    private function getOptionData()
    {
        $demodata = [
            [new Options(1, "10:00", "11:00", "testcomment1", "available", "testusername1", 1)],
            [new Options(2, "12:00", "13:00", "testcomment2", "available", "testusername2",1)],
            [new Options(3, "14:00", "15:00", "testcomment3", "available", "testusername3",2)],
        ];
        return $demodata;
    }
}