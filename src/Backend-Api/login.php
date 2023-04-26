<?php
session_start();
include_once 'connection.php';

if (isset($_GET['name']) && isset($_GET['password']))
{

$name = $_GET["name"];
$pass = $_GET["password"];

$query = "select id,name,password,apcontrol from users where name='".$name."' and password='".$pass."'";

$result = mysqli_query($conn,$query);
$row    = mysqli_fetch_array($result);
if($row)   
{
      $id        = $row['id'];
      $name      = $row['name'];
      $pass      = $row['password'];
      $apcontrol = $row['apcontrol'];
    
    function genrateString($len = 15) {
        $string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $stringLength = strlen($string);
        $key = '';
        for ($i = 0; $i < $len; $i++) {
            $key .= $string[rand(0, $stringLength - 1)];
        }
        return $key;
    }
    
    $_SESSION = genrateString(15);
    
    $status  = true;
    $message = 'Login Successfull';
    echo json_encode(array('status'=>$status,'message'=>$message,
             'id' => $id,'name' => $name,'password' => $pass,
             'apcontrol' => $apcontrol,'access_token'=>$_SESSION));
}

else 
{
    $status  = false;
    $message = 'No user found';
    echo json_encode(array('status'=>$status,'message'=>$message));
}
}
?>