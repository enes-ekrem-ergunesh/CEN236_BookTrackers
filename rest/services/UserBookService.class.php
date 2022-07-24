<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/UserBookDao.class.php';

class UserBookService extends BaseService{

  public function __construct(){
    parent::__construct(new UserBookDao());
  }
  
  public function add_userbook_to_shelf($user, $book_id){

    return $this->dao->add_userbook_to_shelf($user['id'], $book_id);
  }

}
?>
