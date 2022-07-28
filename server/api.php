<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods:POST,GET,PUT,DELETE');
header('Access-Control-Allow-Headers: content-type or other');
header('Content-Type: application/json');

$servername = "localhost";
$username = "cyrus";
$password = "Cyrus123##";
$dbname = "hkbooking_octobercmstest";

$conn = new mysqli ($servername, $username, $password ,$dbname);

if ($conn-> connect_errno){
    die("connection failed:" . $conn->connect_errno);
}


$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    //====get address=====
    case "GET":
        $Store_Data = "SELECT * from milk_tea_store ";
        $trp = mysqli_query($conn, $Store_Data);
        $rows = array();
        while($r = mysqli_fetch_assoc($trp)) { $rows[] = $r; }
        print json_encode($rows);
        break;
    //====add new address====
    case "POST":
        $sql = "INSERT INTO metamask_address (addr) VALUES ('".$_POST['address']."')";
        if(mysqli_query($conn,$sql)) {
            $data = array("data" => "Data added succeessfully");
            echo json_encode($data);
        } else {
            $data = array("data" => "Error: " . $sql. "<br>" . $conn->error);
            echo json_encode($data);
        }
}


die();
?>