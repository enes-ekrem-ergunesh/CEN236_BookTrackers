<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dao/UserDao.class.php';
require_once 'dao/BookDao.class.php';
require_once '../vendor/autoload.php';

// CRUD operations for users entity

/**
 * List all users
 */
 Flight::route('GET /user', function(){
   $dao = new UserDao();
   $users = $dao->get_all();
   Flight::json($users);
 });

  /**
   * print individual user
   */
   Flight::route('GET /user/@id', function($id){
     $dao = new UserDao();
     $user = $dao->get_by_id($id);
     Flight::json($user);
   });


 /**
  * List all books
  */
  Flight::route('GET /book', function(){
    $dao = new BookDao();
    $books = $dao->get_all();
    Flight::json($books);
  });

   /**
    * print individual book
    */
    Flight::route('GET /book/@id', function($id){
      $dao = new BookDao();
      $book = $dao->get_by_id($id);
      Flight::json($book);
    });



Flight::route('/', function(){
    echo 'hello world!';
});

Flight::start();

?>
