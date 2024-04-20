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
                $demodata[] = new Appointment($row["appointmentID"], $row["title"], $formattedDate, $row["expiry_date"], $row["location"], $row["description"]);
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
                $demodata[] = new Options($row["optionsID"], $row["startTime"], $row["endTime"], $row["comment"], $row["taken"], $row["username"], $row["FK_appointmentID"]);
            }
        }
        return $demodata;
    }

    public function addAppointment($title, $date, $expiry_date, $location, $description)
    {
        global $conn;

        $sql = "INSERT INTO appointments (title, date, expiry_date, location, description) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $title, $date, $expiry_date, $location, $description);
        $stmt->execute();

        // Get the ID of the newly inserted appointment
        $appointmentID = $conn->insert_id;

        // Return the appointmentID in the response
        return array("appointmentID" => $appointmentID);
    }

    public function addOption($startTime, $endTime, $FK_appointmentID)
    {
        global $conn;

        // Überprüfen, ob eine Option mit der gleichen Start- und Endzeit bereits vorhanden ist
        $sqlCheck = "SELECT * FROM options WHERE startTime = ? AND endTime = ? AND FK_appointmentID = ?";
        $stmtCheck = $conn->prepare($sqlCheck);
        $stmtCheck->bind_param("ssi", $startTime, $endTime, $FK_appointmentID);
        $stmtCheck->execute();
        $resultCheck = $stmtCheck->get_result();

        if ($resultCheck->num_rows > 0) {
            // Option mit dieser Kombination von Start- und Endzeit existiert bereits
            return "Option is already available";
        }

        // Wenn nicht vorhanden, füge die Option ein
        $sql = "INSERT INTO options (startTime, endTime, FK_appointmentID) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $startTime, $endTime, $FK_appointmentID);
        $stmt->execute();

        return "Option added successfully";
    }


    public function chooseOption($optionID, $username, $comment)
    {
        global $conn;

        $sql = "UPDATE options SET username = ?, comment = ?, taken = 1 WHERE optionsID = ?";
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