<?php
session_start();
include_once 'connection.php';
   
      $xFoodName = "";
       if (isset($_GET["name"]))
    {
        $xFoodName = $_GET["name"];
    }  
    $xFoodName=trim($xFoodName);
   $json_response = array();  
    
   if (strlen($xFoodName) > 0 || strlen($xFoodName) !== "") 
    {
    $qresult ="select id,name,shop,price,description,image from foodList where name like CONCAT('%','".$xFoodName."','%') order by id desc ";   
        
$result = mysqli_query($conn,$qresult);

        while($row0 = mysqli_fetch_array($result,MYSQLI_ASSOC))
        {
                $row1 =$row0["id"];
                $row2 =$row0["name"];
                $row3 =$row0["shop"];
                $row4 =$row0["price"];
                $row5 =$row0["description"];
                $row6 =$row0["image"];
                $rowD = ['id' => $row1,'name' => $row2,'shop' => $row3,'price' => $row4,'description'=>$row5,'image'=>$row6];
                array_push($json_response,$rowD);
        }
        
     $data=array("foodList"=>$json_response);
     echo json_encode($data);
   }
  

	
?>