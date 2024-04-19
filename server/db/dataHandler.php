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

    public function addAppointment($title, $date)
    {
        global $conn;

        $sql = "INSERT INTO appointments (title, date) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $title, $date);
        $stmt->execute();

        return $conn->insert_id;
    }

    public function addOption($startTime, $endTime, $comment, $appointmentID) //TODO
    {
        global $conn;

        $sql = "INSERT INTO options (startTime, endTime, comment, FK_appointmentID) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $startTime, $endTime, $comment, $appointmentID);
        $stmt->execute();

        return $conn->insert_id;
    }

    public function chooseOption($optionID, $username, $comment)
    {
        global $conn;

        $sql = "UPDATE options SET username = ?, comment = ?, expired = 1 WHERE optionsID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $username, $comment, $optionID);
        $stmt->execute();

        // Überprüfen, ob das Update erfolgreich war
        if ($stmt->affected_rows > 0) {
            return "Option chosen successfully.";
        } else {
            return "Failed to choose option.";
        }
    }
}