<?php
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input")); 
    $data = (array) $data;
        
    if($data['BusinessID']){
        $BusinessID = $data['BusinessID'];
        unset($data[$BusinessID]);
        dbRowUpdate("Business", $data, "Where BusinessID = $BusinessID");
        
    }
    else {
        dbRowInsert("Business", $data); 
    }
