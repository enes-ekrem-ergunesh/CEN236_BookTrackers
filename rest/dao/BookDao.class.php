<?php

class BookDao{

  private $conn;

  /**
  * constructor of dao class
  */
  public function __construct(){
    $servername = "localhost";
    $username = "root";
    $password = "memduh2PRD";
    $schema = "book_trackers";
    // $servername = "sql.freedb.tech";
    // $username = "freedb_enesekremergunesh";
    // $password = "Swm7JT\$BjpQ2eTR";
    // $schema = "freedb_cen236_booktrackers";
    $this->conn = new PDO("mysql:host=$servername;dbname=$schema", $username, $password);
    // set the PDO error mode to exception
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Check connection

      echo "Connected successfully!\n";

  }

  /**
  * Method used to read all book objects from database
  */
  public function get_all(){
    $stmt = $this->conn->prepare("SELECT * FROM books");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

    /**
    * Method used to read individual book objects from database
    */
    public function get_by_id($id){
      $stmt = $this->conn->prepare("SELECT * FROM books WHERE id = :id");
      $stmt->execute(['id' => $id]);
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      return @reset($result);
    }

  /**
  * Method used to add book to the database
  */
  public function add($book){
    $stmt = $this->conn->prepare(
      "INSERT INTO books(title, num_pages, author_id, publication, language, source, release_date)
      VALUES (:title, :num_pages, :author_id, :publication, :language, :source, :release_date)");
    $stmt->execute($book);
    $book['id'] = $this->conn->lastInsertId();
    return $book;
  }

  /**
  * Delete user record from the database
  */
  public function delete($id){
    $stmt = $this->conn->prepare("DELETE FROM books WHERE id=:id");
    $stmt->bindParam(':id', $id); // SQL injection prevention
    $stmt->execute();
  }

  /**
  * Update user record
  */
  public function update($user_id, $username, $email, $password, $first_name, $last_name, $avatar_id){
    $stmt = $this->conn->prepare("UPDATE users SET username=:username, email=:email, password=:password, first_name=:first_name, last_name=:last_name, avatar_id=:avatar_id WHERE user_id=:user_id");
    $stmt->execute(['user_id' => $user_id, 'username' => $username, 'email' => $email, 'password' => $password, 'first_name' => $first_name, 'last_name' => $last_name, 'avatar_id' => $avatar_id]);
  }

}

?>
