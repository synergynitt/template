<?php
require 'functions.php';
require 'connect.php';
require 'events.php';
 ?>
<!doctype html>
<html>
<head>
  <title>Synergy 2016</title>
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
  <script src="js/jquery.min.js"></script>
  <link rel="stylesheet" href="materialize/css/materialize.min.css">
  <script src="materialize/js/materialize.min.js"></script>

  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/admin.css">
  <link rel="stylesheet" href="css/slider.css">
  <link rel="stylesheet" href="css/notebook.css" type="text/css" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>


<body>

  <?php
  $loggedin = 0;
  if (isset($_POST['username']) && isset($_POST['password'])){
    if ($_POST['username']=="Synergy" && $_POST['password']=="Synergy@16"){
      $loggedin=1;
    }
  }
  if ($loggedin == 1){
    ?>
    <section class="eventregistrationlist">
      <?php
      foreach ($events as $event => $eventName) {
        $sqlSelectEvent= "SELECT * FROM `events` WHERE `$event`='1' ";
        $selectEventResult = executeQuery($db,$sqlSelectEvent);
        if ($selectEventResult->num_rows>0){
          ?>
          <div class="header"> <?php echo $eventName ?> (Total Registrations:<?php echo $selectEventResult->num_rows ?>)</div>
          <table class="striped highlight">
            <thead>
              <tr>
                <th>Group ID</th>
                <th>Group Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              <?php
              while($groupRegisteredForEvent = $selectEventResult->fetch_assoc()){
                $groupid= $groupRegisteredForEvent['groupid'];
                $sqlSelectGroup = "SELECT * FROM `groups` WHERE `groupid` =\"$groupid\"";
                $selectGroupResult = executeQuery($db, $sqlSelectGroup);
                $group = $selectGroupResult->fetch_assoc();
                $groupName = $group['groupname'];
                $sqlSelectGroupMembers = "SELECT * FROM `usergroup` WHERE `groupid`=\"$groupid\"";
                $selectGroupMembersResult = executeQuery($db, $sqlSelectGroupMembers);
                $groupMembers="";
                if ($selectGroupMembersResult->num_rows>0){
                  while ($groupMember = $selectGroupMembersResult->fetch_assoc()){
                    $userid=$groupMember['userid'];
                    $sqlSelectUser = "SELECT * FROM `users` WHERE  `userid`=\"$userid\"";
                    $selectUserResult = executeQuery($db, $sqlSelectUser);
                    $username = $selectUserResult->fetch_assoc();
                    $username = $username['name'];
                    $groupMembers .= $username . ", ";
                  }
                }
                ?>
                <tr>
                  <td><?php echo $groupid ?></td>
                  <td><?php echo $groupName ?></td>
                  <td><?php $groupMembers = trim($groupMembers, ", "); echo $groupMembers ?></td>
                </tr>
                <?php
              }
            }
            ?>
          </tbody>
        </table>
        <?php
      }
      ?>
    </section>
    <div class="divider"></div>
    <section class="CARegistrationList">
      <?php
      $sqlCARegistration = "SELECT * FROM `ambassadors`";
      $CARegistrationResult = executeQuery($db, $sqlCARegistration);
      ?>
      <div class="header">Campus Ambassodors (Total Registration: <?php echo $CARegistrationResult->num_rows ?>)</div>
      <table class="striped highlight">
        <thead>
          <th>Name</th>
          <th>College</th>
          <th>FB Name</th>
          <th>Email</th>
          <th>Phone</th>
        </thead>
        <tbody>
        <?php
        while($row=$CARegistrationResult->fetch_assoc()){
          $name = $row['name'];
          $college = $row['college'];
          $fbname = $row['fbname'];
          $email = $row['email'];
          $phone = $row['phone'];
          ?>
          <tr>
            <td><?php echo $name ?></td>
            <td><?php echo $college ?></td>
            <td><?php echo $fbname ?></td>
            <td><?php echo $email ?></td>
            <td><?php echo $phone ?></td>
          </tr>
          <?php
        }
         ?>
        </tbody>
      </table>
      <?php
      ?>
    </section>
    <div class="divider"></div>
    <section class="accomodationregistrationlist">
      <?php
      $sqlAccomodationRegistration = "SELECT * FROM `accomodation`";
      $accomodationRegistrationResult = executeQuery($db, $sqlAccomodationRegistration);
      ?>
      <div class="header">Accomodation (Total Registration: <?php echo $accomodationRegistrationResult->num_rows ?>)</div>
      <table class="striped highlight">
        <thead>
          <th>User ID</th>
          <th>Name</th>
          <th>Rollno</th>
          <th>College</th>
          <th>Email</th>
          <th>Phone</th>
        </thead>
        <tbody>
        <?php
        while($row=$accomodationRegistrationResult->fetch_assoc()){
          $userid = $row['userid'];
          $name = $row['name'];
          $college = $row['college'];
          $rollno = $row['rollno'];
          $email = $row['email'];
          $phone = $row['phone'];
          ?>
          <tr>
            <td><?php echo $userid ?></td>
            <td><?php echo $name ?></td>
            <td><?php echo $rollno ?></td>
            <td><?php echo $college ?></td>
            <td><?php echo $email ?></td>
            <td><?php echo $phone ?></td>
          </tr>
          <?php
        }
         ?>
        </tbody>
      </table>
      <?php
      ?>
    </section>
    <?php
  }else {
    ?>
    <section id="adminloginform" class="adminloginform">
      <div class="valign-wrapper fullheight ">
        <div class="valign center-align fullwidth">
          <div class="row">
            <div class="col s12 l4 m4 offset-m4 offset-l4">
              <form action="admin.php" method="post">
                <div class="row">
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="username" name="username" type="text" class="validate">
                      <label for="username">Admin Username</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="password" name="password" type="password" class="validate">
                      <label for="password">Password</label>
                    </div>
                  </div>
                  <div class="row">
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                      <i class="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <?php
  }
  ?>
</body>
</html>
