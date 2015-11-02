<?php
    include("../connection.php");
	use \UserApp\Widget\User;
	require("../app_init.php");    

    if(isset($_COOKIE["ua_session_token"])){
		$token = $_COOKIE["ua_session_token"];

		try{
			$valid_token = User::loginWithToken($token);
		}catch(\UserApp\Exceptions\ServiceException $exception){
			$valid_token = false;
		}
	}

	if(!$valid_token){
		echo "Invalid token";
	}else{
        $ProviderID =  User::current()->user_id;
        $query = dbGetRows("Business", "Select BusinessID, Name, EIN, GimbalID FROM Business WHERE ProviderID = $ProviderID");
        echo json_encode($query->fetchAll());
        /*
        $ProviderID =  User::current()->user_id;
        $q = "SELECT BusinessID, Name, EIN, GimbalID FROM Business WHERE ProviderID = :ProviderID";
        $query = $db->prepare($q);
        $execute = $query->execute(array(
        ':ProviderID' => $ProviderID
        ));
        echo json_encode($query->fetchAll()); 
        */
    }