<?php

require 'connect.php';

$name=mysqli_real_escape_string($db, $_POST['name']);
$email=mysqli_real_escape_string($db, $_POST['email']);

$sql = "SELECT * FROM `users` WHERE `email`=\"$email\"";
if (!$result = $db->query($sql)){
  $message = array ("status"=>"fail","description"=>"User couldn't be registered", "error"=>$db->error);
  echo json_encode($message);
  die();
}

if (isset($_POST['fbid'])){
  $fbid=mysqli_real_escape_string($db,$_POST['fbid']);

  if ($result->num_rows == 0){
    $insert_sql = "INSERT INTO `users` (name, email, fbid) VALUES(\"$name\",\"$email\",\"$fbid\")";
    if (!$insert_result = $db->query($insert_sql)){
      $message = array ("status"=>"fail","description"=>"User couldn't be registered", 'error'=>$db->error);
      echo json_encode($message);
      die();
    }
  }else if($row=$result->fetch_assoc()) {

    $fbid_indb=$row['fbid'];
    if (is_null($fbid_indb)){
      $update_sql = "UPDATE `users` SET fbid=\"$fbid\" WHERE `email`=\"$email\"";
      if (!$update_result = $db->query($update_sql)){
        $message = array ("status"=>"fail","description"=>"User couldn't be registered", 'error'=>$db->error);
        echo json_encode($message);
        die();
      }
    }

    if (isset($_POST['college'])){
      $college=mysqli_real_escape_string($db,$_POST['college']);
      $rollno=mysqli_real_escape_string($db,$_POST['rollno']);

      $update_sql = "UPDATE `users` SET `college`=\"$college\",`rollno`=\"$rollno\" WHERE `email`=\"$email\"";
      if (!$update_result = $db->query($update_sql)){
        $message = array ("status"=>"fail","description"=>"User couldn't be registered", 'error'=>$db->error);
        echo json_encode($message);
        die();
      }
    }
  }

  if (!$result = $db->query($sql)){
    $error = array('error'=>$db->error);
    echo json_encode($error);
    die();
  }

  while ($row=$result->fetch_assoc()){
    $fbid_indb=$row['fbid'];
    if ($fbid_indb == $fbid){

      $college=$row['college'];
      if (is_null($college)){
        $message = array ("status" =>"success" , "description"=>"Get College Details");
        echo json_encode($message);
        die();
      }

      $userid=$row['userid'];
      $name=$row['name'];
      $rollno=$row['rollno'];
      $email=$row['email'];

      session_start();
      $_SESSION['userid']=$userid;
      $_SESSION['name']=$name;
      $_SESSION['college']=$college;
      $_SESSION['rollno']=$rollno;
      $_SESSION['email']=$email;

      $message = array ("status" =>"success" , "description"=>"User Registered. Logged In");
      echo json_encode($message);
    }else {
      $message = array ("status"=>"fail" , "description"=>"User already registered. Wrong Email fbid Combination ");
      echo json_encode($message);
    }
  }

}

if (isset($_POST['password'])){
  $password=mysqli_real_escape_string($db, $_POST['password']);
  $college=mysqli_real_escape_string($db, $_POST['college']);
  $rollno=mysqli_real_escape_string($db,$_POST['rollno']);

  if ($result->num_rows ==0){
    $insert_sql = "INSERT INTO `users` (name, college, email, password, rollno) VALUES(\"$name\",\"$college\",\"$email\",\"$password\",\"$rollno\")";
    if (!$insert_result = $db->query($insert_sql)){
      $message = array ("status"=>"fail","description"=>"User couldn't be registered", 'error'=>$db->error);
      echo json_encode($message);
      die();
    }
  }
  if (!$result = $db->query($sql)){
    echo $db->error;
    $error = array('error'=>$db->error);
    echo json_encode($error);
    die();
  }
  while ($row=$result->fetch_assoc()){
    $password_indb=$row['password'];

    if ($password_indb == $password){
      $userid=$row['userid'];
      $name=$row['name'];
      $college=$row['college'];
      $rollno=$row['rollno'];
      $email=$row['email'];

      session_start();
      $_SESSION['userid']=$userid;
      $_SESSION['name']=$name;
      $_SESSION['college']=$college;
      $_SESSION['rollno']=$rollno;
      $_SESSION['email']=$email;

      $message = array ("status" =>"success" , "description"=>"User already registered. Logged In");
      echo json_encode($message);
    }else {
      $message = array ("status"=>"fail" , "description"=>"User already registered. Wrong Email Password Combination ");
      echo json_encode($message);
    }
  }
}

?>
