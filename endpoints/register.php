<?php
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input"));
    $provider_id = $data->user_id;
    $email = $data->email;
    echo json_encode($provider_id); 
    
    $q = "INSERT INTO Provider (ProviderID, Email) 
          VALUES (:provider_id, :email)
          ON DUPLICATE KEY UPDATE 
              Email = :email
          ";
    $query = $db->prepare($q);
    $query->bindParam(':provider_id', $provider_id);
    $query->bindParam(':email', $email);
    $query->execute();