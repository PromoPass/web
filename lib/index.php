<?php
    require "vendor/autoload.php";
    require_once "../connnection.php";
    $app = new \Slim\Slim();
    $app = \Slim\Slim::getInstance();
     
    $app->get("/hello/:name", function($name) {
	echo 'hello, $name';
    });

    // Business Forms
    $app->get("/businesses", "business_id, name", array());
    echoResponse(2, $rows);
    $app->run();
