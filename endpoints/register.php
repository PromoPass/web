<?php
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input")); 
    $provider_id = $data->user_id;
    $first_name = $data->first_name;
    $middle_initial = $data->properties->MiddleInitial->value;
    $last_name = $data->last_name;
    $email = $data->email;
    //echo json_encode($provider_id); 
    
    $q = "INSERT INTO Provider (ProviderID, FirstName, MiddleInitial, LastName, Email) VALUES (:provider_id, :first_name, :middle_initial, :last_name, :email)
            ON DUPLICATE KEY UPDATE
            FirstName=:first_name, MiddleInitial=:middle_initial, LastName=:last_name, Email=:email";
    $query = $db->prepare($q);
    
    $execute = $query->execute(array(
        ":provider_id"        => $provider_id,
        ":first_name"   => $first_name,
        ":middle_initial"        => $middle_initial,
        ":last_name"        => $last_name,
        ":email"     => $email
    ) );

?>