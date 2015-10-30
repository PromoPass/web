<?php
// all database functions (create, read, update, delete) jk there are no delete functions
// emphasis on returning JSON stuff
include('connection.php');


// this is used strictly for user signUp!

function pp_addUser($arr_values)
{
    global $db;
    $statement = $db->prepare("INSERT INTO `promopass`.`Provider` (`ProviderID`, `FirstName`, `MiddleInitial`, `LastName`, `Email`) VALUES (?, ?, ?, ?, ?)");
    $statement->execute($arr_values);
}

//pp_addUser(array('1111', 'amy', 'b', 'lassy', 'test23@gmail.com'));

