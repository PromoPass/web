<?php
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input")); 
    $data = (array) $data;
        
    if(isset($data['BusinessID'])){ // $data[0] should always be the BusinessID.
        $BusinessID = $data['BusinessID'];
        unset($data['BusinessID']);
        dbRowUpdate("Business", $data, "WHERE BusinessID = $BusinessID");
    }
    else {
        dbRowInsert("Business", $data); 
    }
