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
            $demodata[] = new Appointment($row['appID'], $row['name'], 
            $row['title'], $row['date'], $row['comment'], $row['starttime'], $row['endtime']);
        }

        $demodata = [
            [new Appointment(1, "Raphi", "Termin", "01.01.2025", "nigga", "08:00", "17:00")],
            [new Appointment(2, "No", "ABC", "01.01.1000", "kurd", "06:15", "12:00")]
        ];
        return $demodata;
    }
}
