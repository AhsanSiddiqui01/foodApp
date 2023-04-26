<?php
$servername = "fdb30.awardspace.net";
$username   = "4251691_ecommerce";
$password   = "WPmUlYH29*HT{cT4";
$dbname     = "4251691_ecommerce";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>