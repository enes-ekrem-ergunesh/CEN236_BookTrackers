<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/AuthorDao.class.php';

class AuthorService extends BaseService{

  public function __construct(){
    parent::__construct(new AuthorDao());
  }
}
?>
