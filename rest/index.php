<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../vendor/autoload.php';


Flight::route('GET /todos', function(){
  echo 'testttstsj';
});

//
// Flight::route('GET /items', function(){
//     echo 'hello test!';
// });

Flight::route('/@name', function($name){
    echo 'require ', $name;
});

// Flight::route('/indtestex.php', function(){
//     echo 'hello index.php!';
// });

Flight::start();

?>
