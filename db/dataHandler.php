<?php
include("db.php");
include("./models/appointment.php");
class DataHandler
{
    public function queryAppointment()
    {
        $res =  $this->getDemoData();
        return $res;
    }
    private static function getDemoData()
    {

        global $conn;

        $result = mysqli_query($conn, "SELECT * FROM appointments");

        $demodata = [];


        while ($row = mysqli_fetch_assoc($result)) {
            $demodata[] = new Appointment($row['appID'], $row['name'], $row['title'], 
            $row['date'], $row['comment'], $row['starttime'], $row['endtime']);
        }


        return $demodata;
    }
}
