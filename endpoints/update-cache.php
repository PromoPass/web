<?php
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input"));
    
    $session_token = $data->session_token;
    $is_live_token = $data->is_live_token;
    

    $q = "";
    if($is_live_token) {
        $user_id = $data->user_id;
        $q = "INSERT INTO UserCache (session_token, user_id) 
          VALUES (:session_token, :user_id)
          ON DUPLICATE KEY UPDATE user_id = :user_id";
       
    } else { // remove from database
        $q = "DELETE FROM UserCache
              WHERE session_token = :session_token";
        echo "deleting...";
        echo $q;
    }
    $query = $db->prepare($q);

    if($is_live_token) {
        $query->bindParam(':user_id', $user_id);
    }
    $query->bindParam(':session_token', $session_token);
    
    $query->execute();