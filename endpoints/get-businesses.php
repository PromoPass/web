<?php
    include("../connection.php");
	use \UserApp\Widget\User;
	require("../app_init.php");    
    $ProviderID =  User::current()->user_id;
    
    //$query = dbQuery("SELECT `BusinessID`, `Name`, `EIN`, `GimbalID` FROM `Business` WHERE ProviderID = $ProviderID"); 
    $query = dbQuery("SELECT BusinessID, Name, EIN, GimbalID from Business where ProviderID = '$ProviderID'");
    echo json_encode($query->fetchAll());
    