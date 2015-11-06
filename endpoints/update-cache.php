<?php
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input"));
    $user_id = $data->user_id;
    $session_token = $data->session_token;
    $is_live_token = $data->is_live_token;
    //echo json_encode($provider_id); 
    $q = "";
    if($is_live_token) {
        $q = "INSERT INTO UserCache (user_id, session_token) 
          VALUES (':user_id', ':session_token')
          ";
    } else {
        $q = "";
    }
    $query = $db->prepare($q);
    $query->bindParam(':user_id', $user_id);
    $query->bindParam(':session_token', $session_token);
    $query->execute();
