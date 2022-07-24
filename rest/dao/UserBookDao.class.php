<?php
require_once __DIR__.'/BaseDao.class.php';

class UserBookDao extends BaseDao{

  /**
  * constructor of dao class
  */
  public function __construct(){
    parent::__construct("userBooks");
  }

  public function add_userbook_to_shelf($user_id, $book_id){
    $query = " INSERT INTO userbooks(user_id, book_id) VALUES (:user_id, :book_id) ";
    
    $this->query_unique($query, ['user_id' => $user_id, 'book_id' => $book_id]);
  }


}

?>
