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
        $provider_id =  User::current()->user_id;
        $q = "SELECT BusinessID, Name, EIN, GimbalID FROM Business WHERE ProviderID = :provider_id";
        $query = $db->prepare($q);
        $execute = $query->execute(array(
        ':provider_id' => $provider_id 
        ));
        echo json_encode($query->fetchAll()); 
    }