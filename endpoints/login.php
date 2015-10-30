<?php
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $password = $data->password;

    $userInfo = $db->query("SELECT Email from Provider WHERE Email='$email' AND Password='$password'");
    $userInfo = $userInfo->fetchAll();
    
    echo json_encode($userInfo);
?>