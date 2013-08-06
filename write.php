<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); 
header("Cache-Control: no-store, no-cache, must-revalidate"); 
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$num_checker = "no.m";
$check = fopen($num_checker, 'r');
$numch = fread($check,filesize($num_checker));
$newimg = $numch+1;

define('UPLOAD_DIR', 'camera-images/');
	$img = $_POST["image"];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = UPLOAD_DIR . $newimg . '.png';
	$success = file_put_contents($file, $data);

$remember = fopen($num_checker, 'w') or die('Cannot open file:  '.$num_checker);
fwrite($remember, $numch+1);
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Sticky Footer Navbar Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="sticky-footer-navbar.css" rel="stylesheet">

    <style>
    body {
    	padding:90px 22px 40px 22px;
    }
    div.bill {
    	margin-top:50px;
    }
    .submit {
    	position:fixed;
    	bottom:15px;right:15px;
    }
    #camimg {
      width:320px;
      height:240px;
      margin:auto;
    }
    </style>
  </head>

  <body>

    <!-- Wrap all page content here -->
    <div id="wrap">

      <!-- Fixed navbar -->
      <div class="navbar navbar-fixed-top">
        <div class="container">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Which MPs Are <span style="color:red">Evil?</span></a>
          <div class="nav-collapse collapse">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="camera.html">Camera</a></li>
              <li><a href="#contact">Contact</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li class="divider"></li>
                  <li class="nav-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>

<div id="camimg">
<img class="img-thumbnail" width="640" height="480" src="camera-images/<?php echo $numch+1; ?>.png" />
</div>

    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
  </body>
</html>
