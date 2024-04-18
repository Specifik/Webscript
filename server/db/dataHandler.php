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
    
    public function queryOptions($id)
    {
        return $this->getOptionData($id);
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

    private function getOptionData($appointmentID)
    {
        global $conn;

        $sql = "SELECT * FROM options WHERE FK_appointmentID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $appointmentID);
        $stmt->execute();
        $result = $stmt->get_result();
        $demodata = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $demodata[] = new Options($row["optionsID"], $row["startTime"], $row["endTime"], $row["comment"], $row["expired"], $row["username"], $row["FK_appointmentID"]);
            }
        }
        return $demodata;
    }
}