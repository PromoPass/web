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
        $query = dbGetRows("Business", "WHERE ProviderID = '$ProviderID'"); 
        echo json_encode($query->fetchAll());
    }