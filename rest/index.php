<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dao/ProjectDao.class.php';
require_once '../vendor/autoload.php';

// CRUD operations for users entity

/**
 * List all users
 */
 Flight::route('/users', function(){
   $dao = new ProjectDao();
   $users = $dao->get_all();
   Flight::json($users);
 });


Flight::route('/', function(){
    echo 'hello world!';
});

Flight::start();

?>
