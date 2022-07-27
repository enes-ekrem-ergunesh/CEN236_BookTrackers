<?php
require_once __DIR__.'/BaseDao.class.php';

class AuthorDao extends BaseDao{

  /**
  * constructor of dao class
  */
  public function __construct(){
    parent::__construct("authors");
  }

  public function get_public_author($id){
    $query = "SELECT a.* FROM authors a 
    INNER JOIN users u ON a.user_id = u.id 
    WHERE u.admin = 1 AND a.id = :id";
    
    return $this->query($query, ['id' => $id]);
  }

}

?>
