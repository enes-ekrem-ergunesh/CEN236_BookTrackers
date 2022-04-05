<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dao/UserDao.class.php';
require_once 'dao/BookDao.class.php';
require_once '../vendor/autoload.php';

// CRUD operations for users entity

/**
* List all books
*/
Flight::route('GET /books', function(){
  $dao = new BookDao();
  $books = $dao->get_all();
  Flight::json($books);
});

/**
* print individual book
*/
Flight::route('GET /books/@id', function($id){
  $dao = new BookDao();
  $book = $dao->get_by_id($id);
  Flight::json($book);
});

/**
* add book
*/
Flight::route('POST /books', function(){
  $dao = new BookDao();
  $request = Flight::request();
  $data = $request->data->getData();
  $dao->add($data['title'],$data['num_pages'], $data['author_id'], $data['publication'],
            $data['language'], $data['source'], $data['release_date']);
});






Flight::route('/', function(){
    echo 'hello world!';
});

Flight::start();

?>
