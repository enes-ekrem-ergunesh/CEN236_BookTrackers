<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dao/UsersDao.class.php';
require_once 'dao/BooksDao.class.php';
require_once '../vendor/autoload.php';

// CRUD operations for users entity

/**
 * List all users
 */
 Flight::route('/user', function(){
   $dao = new UsersDao();
   $users = $dao->get_all();
   Flight::json($users);
 });

 /**
  * List all books
  */
  Flight::route('/books', function(){
    $dao = new BooksDao();
    $books = $dao->get_all();
    Flight::json($books);
  });



Flight::route('/', function(){
    echo 'hello world!';
});

Flight::start();

?>
