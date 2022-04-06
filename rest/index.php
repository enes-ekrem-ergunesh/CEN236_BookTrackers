<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dao/UserDao.class.php';
require_once 'dao/BookDao.class.php';
require_once '../vendor/autoload.php';

Flight::register('bookDao', 'BookDao');

// CRUD operations for users entity

/**
* List all books
*/
Flight::route('GET /books', function(){
  $books = Flight::bookDao()->get_all();
  Flight::json($books);
});

/**
* print individual book
*/
Flight::route('GET /books/@id', function($id){
  $book = Flight::bookDao()->get_by_id($id);
  Flight::json($book);
});

/**
* add book
*/
Flight::route('POST /books', function(){
  $request = Flight::request();
  $data = $request->data->getData();
  Flight::bookDao()->add($data['title'],$data['num_pages'], $data['author_id'], $data['publication'],
            $data['language'], $data['source'], $data['release_date']);
});

/**
* delete book
*/
Flight::route('DELETE /books/@id', function($id){
  Flight::bookDao()->delete($id);
  Flight::json(["message" => "deleted"]);
});






Flight::route('/', function(){
    echo 'hello world!';
});

Flight::start();

?>
