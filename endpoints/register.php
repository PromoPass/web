<?php 
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input")); 
     
    $firstname = $data->firstname;
    $middleinitial = $data->middleinitial;
    $lastname = $data->lastname;
    $email = $data->email;
    $password = $data->password;

    $q = "INSERT INTO Provider (FirstName, MiddleInitial, LastName, Email, Password) VALUES (:fname, :middleinit, :lname, :email, :password)";
    $query = $db->prepare($q);

    $execute = $query->execute(array(
        ":fname"        => $firstname,
        ":middleinit"   => $middleinitial,
        ":lname"        => $lastname,
        ":email"        => $email,
        ":password"     => $password
    ) );
    
   echo json_encode($email);
?>

