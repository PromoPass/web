<?php
	require 'vendor/autoload.php';
	include 'connection.php';


	$app = new \Slim\Slim();

    $response = $app->response();
    $response->header('Access-Control-Allow-Origin', '*');
    //$response->header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 
    $app->get('/', function() {
        echo "Welcome to Promo<i>Pass</i>'s BACK END. :)";
    });

	$app->get('/hello/:name', function($name) {
		echo "Hello, $name";
	});
    
    // URL                                
    // /api/v1/provider                                           # returns list of all providers
    // /api/v1/provider/id/:ProviderID                            # returns the provider with the specified id
    // /api/v1/consumer/device/id/:DeviceID/id                    # returns the consumer id with the specified device id
    // /api/v1/business                                           # returns list of all businesses 
    // /api/v1/business/names                                     # returns list of all business names
    // /api/v1/business/id/:BusinessID/names                      # returns the business name with the specified business id
    // /api/v1/business/id/:BusinessID/types                      # returns the business types with the specified business id
    // /api/v1/ad/						  # returns list of all ads (TODO: need to delete this)
    // /api/v1/business/consumer/id/:ConsumerID/receivedAds/id    # returns the list of business ids with the specified consumer's id for received ads

    $app->group('/api', function() use($app) {
        // Version group
        $app->group('/v1', function() use($app) {
            
           // Provider group
           $app->group('/provider', function() use($app) {
               $app->get('/', 'getProviders');
               $app->get('/id/:ProviderID', 'getProvider');
               //$app->get('consumer/id/:ConsumerID/receivedAds/id', 'getReceivedAds');
               
               $app->post('/provider', 'addProvider');
           });

           // Consumer group
           $app->group('/consumer', function() use($app) {
               $app->get('/device/id/:DeviceID/id', 'getConsumerIDByDevice');
               
           });
            
           // Business group
           $app->group('/business', function() use($app) {
               $app->get('/', 'getBusinesses');
               $app->get('/names', 'getBusinessNames');
               $app->get('/id/:BusinessID/name', 'getBusinessName');
               $app->get('/id/:BusinessID', 'getBusiness');
               $app->get('/id/:BusinessID/types', 'getBusinessTypes');
           });
          
           $app->group('/ad', function() use($app) {
               $app->get('/', 'getAds');
           });
            
        });
        
    });


	$app->run();
    
   function getProviders() {
       $sql = "SELECT ProviderID, FirstName, LastName, Email
               FROM Provider";
       $tableName = "Providers";
       dbGetRecords($tableName, $sql);    
   }

   function getProvider($ProviderID) {
       $sql = "SELECT ProviderID, FirstName, LastName, Email
               From Provider
               WHERE ProviderID = ?";
       $tableName = "Provider";
       dbGetRecords($tableName, $sql, [$ProviderID]);
   }

   function addProvider() {
        $app = Slim::getInstance();
        $request = $app->request();
        $provider = json_decode($request->getBody());
        $sql = "INSERT INTO Provider (ProviderID, FirstName, LastName, Email)
                VALUES (?, ?, ?, ?)";
        dbAddRecords($sql, [ $provider->ProviderID,
                             $provider->FirstName,
                             $provider->LastName,
                             $provider->Email ]); 
       
    }


   function getConsumerIDByDevice($DeviceID) {
       $sql = "SELECT ConsumerID
               FROM Consumer
               WHERE DeviceID = ?";
       $tableName = "Consumer";
       dbGetRecords($tableName, $sql, [$DeviceID]);
   }

   function getBusinesses() {
       $sql = "SELECT BusinessID, Name, ProviderID, EIN, GimbalID
               FROM Business";
       $tableName = "Business";
       dbGetRecords($tableName, $sql);
   }

   function getBusinessNames() {
       $sql = "SELECT Name
               FROM Business";
       $tableName = "BusinessNames";
       dbGetRecords($tableName, $sql);
   }

   function getBusinessName($BusinessID) {
       $sql = "Select Name
               From Business
               WHERE BusinessID = ?";
       $tableName = "BusinessName";
       dbGetRecords($tableName, $sql, [$BusinessID]);
   }

   function getBusiness($BusinessID) {
       $sql = "SELECT BusinessID, Name, ProviderID, EIN, GimbalID
               FROM Business
               WHERE BusinessID = ?";
       $tableName = "Business";
       dbGetRecords($tableName, $sql, [$BusinessID]);
   }

   function getBusinessTypes($BusinessID) {
       $sql = "SELECT Type
               FROM BusinessType
               WHERE BusinessID = ?";
       $tableName = "BusinessType";
       dbGetRecords($tableName, $sql, [$BusinessID]);
   }
   
   	function getBusinessID($GimbalID) {
		   $sql = "SELECT BusinessID
				   FROM Business
				   WHERE GimbalID = ?";
		   $tableName = "Business";
		   dbGetRecords($tableName, $sql, [$GimbalID]);
	   }
/*
   function getReceivedAds($ConsumderID) {
       $sql = "SELECT BusinessID
               FROM ReceivedAd
               WHERE ConsumerID = $ConsumerID
                   AND IsCleared = 0
                   AND IsSaved = 0
               Group by BusinessID
   }
*/
   function getAds() {
       $sql = "SELECT AdID, TemplateID, IsCurrent, Title, BusinessID, CreateDate
               FROM Ad";
       $tableName = "Ad";
       dbGetRecords($tableName, $sql);
   }
   
   	function getCurrentAd($BusinessID) {
		   $sql = "SELECT AdID
				   FROM Ad
				   WHERE BusinessID = ?
				   and IsCurrent = 1";
		   $tableName = "Ad";
		   dbGetRecords($tableName, $sql, [$BusinessID]);
	   }
	   
	function insertReceivedAd() {
			$app = Slim::getInstance();
			$request = $app->request();
			$provider = json_decode($request->getBody());
		    $sql = "INSERT INTO ReceivedAd (AdID, ConsumerID, BusinessID)
				   VALUES (?, ?, ?)";
		   $tableName = "ReceivedAd";
		   dbAddRecords($sql, [ $provider->AdID,
								$provider->ConsumerID,
								$provider->BusinessID]);
	   }	   

	function getReceivedAdsNotClearedOrSaved($ConsumerID) {
		   $sql = "SELECT ReceivedAdID, AdID, BusinessID, ReceivedDate
				   FROM ReceivedAd
				   WHERE ConsumerID = ?
				   AND IsCleared = 0
				   AND IsSaved = 0";
		   $tableName = "ReceivedAd";
		   dbGetRecords($tableName, $sql, [$ConsumerID]);	   
	   }
	   
	   
	function clearReceivedAd($ReceivedAdID) {	//check this
			$sql = "UPDATE ReceivedAd
					SET IsCleared = 1
					WHERE ReceivedAdID = ?";
		   $tableName = "ReceivedAd";
		   dbGetRecords($tableName, $sql, [$ReceivedAdID]);
	   }
	   
	function getAdInformation($ReceivedAdID) {
		   $sql = "SELECT AdID, BusinessID 
				   FROM ReceivedAd
				   WHERE ReceivedAdID = ?";
		   $tableName = "ReceivedAd";
		   dbGetRecords($tableName, $sql, [$ReceivedAdID]);
	   }	

	function getAdTitle($AdID) {
		   $sql = "SELECT Title
				   FROM Ad
				   WHERE AdID = ?";
		   $tableName = "Ad";
		   dbGetRecords($tableName, $sql, [$AdID]);
	   }	   
	   
	   
	function getAdWriting($AdID) {
		   $sql = "SELECT Writing
				   FROM Writing
				   WHERE AdID = ?";
		   $tableName = "Writing";
		   dbGetRecords($tableName, $sql, [$AdID]);
	   }	   	   

	function getProviderID($Email) {
		   $sql = "SELECT ProviderID
				   FROM Provider
				   WHERE Email = ?";
		   $tableName = "Provider";
		   dbGetRecords($tableName, $sql, [$Email]);
	   }

	function getBusinessIDfromProviderID($ProviderID) {
		   $sql = "SELECT BusinessID
				   FROM Business
				   WHERE ProviderID = ?";
		   $tableName = "Business";
		   dbGetRecords($tableName, $sql, [$ProviderID]);
	   }	   

	function setAdNotCurrent($BusinessID) { //see if works for update
		   $sql = "UPDATE Ad 
				   SET IsCurrent = 0
				   WHERE BusinessID = ?
				   AND IsCurrent = 1";
		   $tableName = "Ad";
		   dbAddRecords($sql, [$BusinessID]);	
	   }	   
	
	function addProviderEmail(){
	    $app = Slim::getInstance();
        $request = $app->request();
        $provider = json_decode($request->getBody());
        $sql = "INSERT INTO Provider (Email)
                VALUES (?)";
        dbAddRecords($sql, [ $provider->Email ]); 
	}
	
	function addBusinessInfo(){
	    $app = Slim::getInstance();
        $request = $app->request();
        $provider = json_decode($request->getBody());
        $sql = "INSERT INTO Business (Name, ProviderID, GimbalID)
                VALUES (?, ?, ?)";
        dbAddRecords($sql, [ $provider->Name,
                             $provider->ProviderID,
                             $provider->GimbalID ]); 
    }	
	
   function addAdTitle() {
        $app = Slim::getInstance();
        $request = $app->request();
        $provider = json_decode($request->getBody());
        $sql = "INSERT INTO Ad (BusinessID, Title)
                VALUES (?, ?)";
        dbAddRecords($sql, [ $provider->BusinessID,
                             $provider->Title ]); 
    }	
	
   function addAdWriting() {
        $app = Slim::getInstance();
        $request = $app->request();
        $provider = json_decode($request->getBody());
        $sql = "INSERT INTO Writing (AdID, Writing)
                VALUES (?, ?)";
        dbAddRecords($sql, [ $provider->AdID,
                             $provider->Writing ]); 
    }	
	
		   
   function dbGetRecords($tableName, $sql, $a_bind_params = []){
       global $db;
       $query = $db->prepare($sql);
       if(!empty($a_bind_params)) {
           $query->execute($a_bind_params);
       } else {
           $query->execute();
       }
       $results = $query->fetchAll(PDO::FETCH_OBJ);
       echo '{ ' . '"$tableName": ' . json_encode($results, JSON_PRETTY_PRINT) . ' }';
  }

   function dbAddRecords($sql, $a_bind_params = []) {
       global $db;
       $query = $db->prepare($sql);
       $query->execute($a_bind_params);
       echo json_encode($db->lastInsertId());
   }
