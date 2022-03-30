<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../vendor/autoload.php';


Flight::route('GET /test', function(){
  echo 'TEST!';
});

Flight::route('/@name', function($name){
    echo 'require ', $name;
});

Flight::start();

?>
