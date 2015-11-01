<?php
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input")); 
    $business_id = $data->business_id; 
    $name = $data->name;
    $provider_id = $data->provider_id;
    $ein = $data->ein;
    $gimbal_id = $data->gimbal_id;

    $q = "INSERT INTO Business (Name, ProviderID, EIN, GimbalID) VALUES (:name, :provider_id, :ein, :gimbal_id)
            ON DUPLICATE KEY UPDATE
            Name=:name, EIN=:ein, GimbalID=:gimbal_id";
    $query = $db->prepare($q);

    $execute = $query->execute(array(
        ":business_id"    => $business_id,
        ":name"        => $name,
        ":provider_id"   => $provider_id,
        ":ein"        => $ein,
        ":gimbal_id"     => $gimbal_id
    ) ); 
